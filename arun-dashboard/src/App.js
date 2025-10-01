import React, { useState, useEffect } from 'react';
import './App.css';
import { API_KEY, TEAM_TABLE_ID, BILL_LINE_ITEMS_TABLE_ID, PAYMENT_SYSTEM_TABLE_ID } from './config';

// Helper function to fetch data from Baserow API
const fetchData = async (tableId) => {
  const url = `https://baserow.arisegulf.com/api/database/rows/table/${tableId}/?user_field_names=true`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Token ${API_KEY}`
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
};

// Main App Component
function App() {
  const [summary, setSummary] = useState(null);
  const [workDetails, setWorkDetails] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const teamName = 'Arun'; // We are building this for Arun

        // Fetch all data in parallel
        const [teams, allWorkDetails, allPayments] = await Promise.all([
          fetchData(TEAM_TABLE_ID),
          fetchData(BILL_LINE_ITEMS_TABLE_ID),
          fetchData(PAYMENT_SYSTEM_TABLE_ID)
        ]);

        // Find Arun's data in the Team table
        const arunSummary = teams.find(t => t['Team Name'] === teamName);
        setSummary(arunSummary);

        if (arunSummary) {
          // Filter work details and payments related to Arun
          const arunWorkDetails = allWorkDetails.filter(item => 
            item['Team (from Bill)'] && Array.isArray(item['Team (from Bill)']) && item['Team (from Bill)'].some(lookup => lookup.value === teamName)
          );
          const arunPayments = allPayments.filter(item => item['Team'] && item['Team'].some(t => t.id === arunSummary.id));

          setWorkDetails(arunWorkDetails);
          setPayments(arunPayments);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div className="container"><h1>Loading Arun's Dashboard...</h1></div>;
  }

  if (error) {
    return <div className="container"><h1>Error: {error}</h1><p>Could not fetch data from Baserow. Please check the API key and table IDs.</p></div>;
  }

  return (
    <div className="App">
      <header className="App-header" style={{
        backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.8)), url('/img/arise-banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="header-content">
            <img src="/img/arise-logo.png" alt="Arise Logo" className="header-logo" />
            <h1>Arun's Dashboard</h1>
        </div>
      </header>
      <main className="container">
        {/* Summary Component */}
        <div className="card">
          <h2>Financial Summary</h2>
          {summary ? (
            <div className="summary-grid">
              <div>
                <span className="summary-title">Total Billed</span>
                <span className="summary-value">&#8377; {parseFloat(summary['Total Billed Amount'] || '0').toFixed(2)}</span>
              </div>
              <div>
                <span className="summary-title">Total Paid</span>
                <span className="summary-value">&#8377; {parseFloat(summary['Total Paid'] || '0').toFixed(2)}</span>
              </div>
              <div>
                <span className="summary-title">Remaining Balance</span>
                <span className="summary-value summary-balance">&#8377; {parseFloat(summary['Remaining Balance'] || '0').toFixed(2)}</span>
              </div>
            </div>
          ) : <p>Summary data not found for Arun.</p>}
        </div>

        {/* Work Details Component */}
        <div className="card">
          <h2>Work Details</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Work</th>
                  <th>Claimed Qty</th>
                  <th>Verified Qty</th>
                  <th>Payable Amount</th>
                </tr>
              </thead>
              <tbody>
                {workDetails.length > 0 ? workDetails.map(item => (
                  <tr key={item.id}>
                    <td>{item['Related ODF']?.[0]?.value || 'N/A'}</td>
                    <td>{item['Sub-Tasks']?.[0]?.value || 'N/A'}</td>
                    <td>{item['Vendor Qty']}</td>
                    <td>{item['Verified Qty']}</td>
                    <td>&#8377; {parseFloat(item['Payable Amount'] || '0').toFixed(2)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5">No work details found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History Component */}
        <div className="card">
          <h2>Payment History</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount Paid</th>
                  <th>Method</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? payments.map(item => (
                  <tr key={item.id}>
                    <td>{item['Payment Requiest Date'] ? new Date(item['Payment Requiest Date']).toLocaleDateString() : 'N/A'}</td>
                    <td>&#8377; {parseFloat(item['Amount Paid'] || '0').toFixed(2)}</td>
                    <td>{item['Payment Method']?.value || 'N/A'}</td>
                    <td>{item.Notes || ''}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4">No payment history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>Arise Enterprises | Quality & Commitment, Connected.</p>
      </footer>
    </div>
  );
}

export default App;