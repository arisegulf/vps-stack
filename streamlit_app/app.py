import streamlit as st
import requests
import os
import time
from typing import Optional, Dict, Any

# Configure page settings
st.set_page_config(
    page_title="Arise Chat Agent",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for dark theme and responsive design
st.markdown("""
<style>
    /* Dark theme variables */
    :root {
        --bg-color: #0e1117;
        --secondary-bg: #262730;
        --text-color: #fafafa;
        --border-color: #464855;
        --accent-color: #ff6b6b;
    }
    
    /* Main container styling */
    .main .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-width: 100%;
    }
    
    /* Chat message styling */
    .chat-message {
        padding: 1rem;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        border: 1px solid var(--border-color);
        animation: fadeIn 0.3s ease-in;
    }
    
    .user-message {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        margin-left: 2rem;
        color: white;
    }
    
    .assistant-message {
        background: var(--secondary-bg);
        margin-right: 2rem;
        border-left: 4px solid var(--accent-color);
    }
    
    /* Animation keyframes */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
        .user-message, .assistant-message {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
        }
        
        .main .block-container {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
    
    /* Sidebar styling */
    .css-1d391kg {
        background: var(--secondary-bg);
    }
    
    /* Spinner styling */
    .stSpinner {
        color: var(--accent-color);
    }
    
    /* Input box styling */
    .stTextInput > div > div > input {
        background-color: var(--secondary-bg);
        color: var(--text-color);
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
    }
    
    /* Button styling */
    .stButton > button {
        background: linear-gradient(135deg, var(--accent-color) 0%, #ff8e8e 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        transition: transform 0.2s ease;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    }
</style>
""", unsafe_allow_html=True)

def get_api_config() -> tuple[str, Optional[str]]:
    """Get API configuration from environment variables."""
    api_url = os.getenv('FLOWISE_API_URL', 'http://flowise:3000/api/v1/prediction/71638da8-6887-4a41-8adc-c9f33bc041ed')
    api_key = os.getenv('FLOWISE_API_KEY')
    return api_url, api_key

def initialize_session_state():
    """Initialize session state variables."""
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "api_error" not in st.session_state:
        st.session_state.api_error = None

def call_flowise_api(message: str) -> Optional[str]:
    """
    Make API call to Flowise backend.
    
    Args:
        message: User message to send to the API
        
    Returns:
        API response text or None if error occurred
    """
    api_url, api_key = get_api_config()
    
    headers = {
        "Content-Type": "application/json"
    }
    
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    
    payload = {
        "question": message,
        "history": st.session_state.messages[-10:] if len(st.session_state.messages) > 10 else st.session_state.messages
    }
    
    try:
        with st.spinner("🤔 Thinking..."):
            response = requests.post(
                api_url,
                json=payload,
                headers=headers,
                timeout=30
            )
            
        if response.status_code == 200:
            response_data = response.json()
            if isinstance(response_data, dict):
                return response_data.get("text", response_data.get("answer", str(response_data)))
            return str(response_data)
        else:
            st.session_state.api_error = f"API Error: {response.status_code} - {response.text}"
            return None
            
    except requests.exceptions.Timeout:
        st.session_state.api_error = "Request timeout. Please try again."
        return None
    except requests.exceptions.ConnectionError:
        st.session_state.api_error = "Cannot connect to chat service. Please check your connection."
        return None
    except requests.exceptions.RequestException as e:
        st.session_state.api_error = f"Network error: {str(e)}"
        return None
    except Exception as e:
        st.session_state.api_error = f"Unexpected error: {str(e)}"
        return None

def render_message(message: Dict[str, Any], index: int):
    """Render a single chat message."""
    role = message["role"]
    content = message["content"]
    
    if role == "user":
        st.markdown(f"""
        <div class="chat-message user-message">
            <strong>You:</strong><br>
            {content}
        </div>
        """, unsafe_allow_html=True)
    else:
        st.markdown(f"""
        <div class="chat-message assistant-message">
            <strong>🤖 Assistant:</strong><br>
            {content}
        </div>
        """, unsafe_allow_html=True)

def render_sidebar():
    """Render the sidebar with app information and controls."""
    with st.sidebar:
        st.title("🤖 Arise Chat Agent")
        
        st.markdown("---")
        
        with st.expander("ℹ️ About", expanded=False):
            st.markdown("""
            **Arise Chat Agent** is an intelligent conversational AI assistant powered by advanced language models.
            
            **Features:**
            - 💬 Natural conversation
            - 🧠 Context-aware responses  
            - 📱 Mobile-friendly interface
            - 🎨 Modern dark theme
            
            **How to use:**
            Simply type your message in the chat box below and press Enter or click Send.
            """)
        
        st.markdown("---")
        
        # Clear chat history button
        if st.button("🗑️ Clear Chat History", use_container_width=True):
            st.session_state.messages = []
            st.session_state.api_error = None
            st.rerun()
        
        # Display connection status
        st.markdown("---")
        api_url, api_key = get_api_config()
        st.markdown("**Connection Status:**")
        if api_url:
            st.success("✅ API Configured")
        else:
            st.error("❌ API Not Configured")

def render_chat_interface():
    """Render the main chat interface."""
    st.title("🤖 Arise Chat Agent")
    st.markdown("*Your intelligent conversational assistant*")
    
    # Display API error if exists
    if st.session_state.api_error:
        st.error(f"⚠️ {st.session_state.api_error}")
        if st.button("Retry", key="retry_button"):
            st.session_state.api_error = None
            st.rerun()
    
    # Create chat container
    chat_container = st.container()
    
    # Display chat messages
    with chat_container:
        if not st.session_state.messages:
            st.markdown("""
            <div class="chat-message assistant-message">
                <strong>🤖 Assistant:</strong><br>
                Hello! I'm your Arise Chat Agent. How can I help you today?
            </div>
            """, unsafe_allow_html=True)
        else:
            for i, message in enumerate(st.session_state.messages):
                render_message(message, i)
    
    # Chat input
    st.markdown("---")
    
    # Use columns for better mobile layout
    col1, col2 = st.columns([4, 1])
    
    with col1:
        user_input = st.text_input(
            "Type your message...",
            key="user_input",
            placeholder="Ask me anything...",
            label_visibility="collapsed"
        )
    
    with col2:
        send_button = st.button("Send", use_container_width=True, type="primary")
    
    # Handle user input
    if (send_button and user_input) or (user_input and user_input != st.session_state.get("last_input", "")):
        if user_input.strip():
            # Add user message to chat
            st.session_state.messages.append({"role": "user", "content": user_input})
            
            # Get AI response
            response = call_flowise_api(user_input)
            
            if response:
                st.session_state.messages.append({"role": "assistant", "content": response})
                st.session_state.api_error = None
            
            # Store last input to prevent duplicate processing
            st.session_state.last_input = user_input
            
            # Rerun to update the chat
            st.rerun()

def main():
    """Main application function."""
    initialize_session_state()
    render_sidebar()
    render_chat_interface()

if __name__ == "__main__":
    main()
