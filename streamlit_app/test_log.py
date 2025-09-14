import logging
import time

# Configure logging to be as simple and direct as possible.
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

logging.info("Minimal test script started successfully.")
logging.info("This message proves that logging is working.")
logging.info("Script will now exit.")

# Keep the container running for a few seconds to ensure logs are flushed.
time.sleep(5)
