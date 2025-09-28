import csv
import os

input_file = "D:\\vps-stack\\Arise _Service_Aug_Details_RK_MAIN.csv"
output_file = "D:\\vps-stack\\Arise_RK_Normalized_Work_Data.csv"

work_type_columns = [
    "ODF First Cable", "ODF Common cable", "Refilling Cable ", "IBD Cable",
    "DUCTING WITH CABLE PULLING", "8F FAT", "16F FAT", "FMS 48F -16F FAT",
    "FDMS 48F", "Extra Splicing", "25mm Flexible", "Angle",
    "6 MTR Pole/ 8 mtr pole", "DOC<150", "DOC>150", "UG"
]

normalized_data = []
header = ["City", "Month", "Site Name", "Work Type", "Quantity", "Total Site Bill"]

# Ensure the input file exists
if not os.path.exists(input_file):
    print(f"Error: The input file '{input_file}' was not found. Please ensure the path is correct.")
else:
    try:
        with open(input_file, 'r', newline='', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            for row in reader:
                # Stop when summary rows start (e.g., "TOTAL BILL" in S/N column or empty S/N)
                # Also handle cases where S/N might be empty or not present in summary rows
                if not row.get('S/N') or row.get('S/N', '').strip().upper() == 'TOTAL BILL':
                    break

                # Extract common fields
                city = row.get('City', '').strip()
                month = row.get('Month', '').strip()
                site_name = row.get('Site Name', '').strip()
                site_total_bill = row.get('Arise', '').strip()

                # Iterate through work type columns
                for work_type in work_type_columns:
                    quantity_str = row.get(work_type, '').strip()
                    if quantity_str and quantity_str.isdigit():
                        quantity = int(quantity_str)
                        if quantity > 0:
                            normalized_data.append({
                                "City": city,
                                "Month": month,
                                "Site Name": site_name,
                                "Work Type": work_type,
                                "Quantity": quantity,
                                "Total Site Bill": site_total_bill
                            })

        with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=header)
            writer.writeheader()
            writer.writerows(normalized_data)

        print(f"Normalized work data for RK TSN has been successfully written to: {output_file}")

    except Exception as e:
        print(f"An error occurred during processing: {e}")
