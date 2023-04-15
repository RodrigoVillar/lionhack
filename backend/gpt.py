import openai
import re
<<<<<<< HEAD
from main import TX, send_tx
=======
>>>>>>> happy-branch
from dotenv import dotenv_values

config = dotenv_values("../.env")

# Replace 'your_api_key' with your actual API key
openai.api_key = config["GPT_API_KEY"]

def extract_info(prompt):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Extract the key information from the following user command: {prompt}",
        temperature=0,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    return response.choices[0].text.strip()

<<<<<<< HEAD
user_command = "I wanna send 0.00001 ETH from 0x9262c5fC4fFa3C756F050cb405c3c18B7aF49CF9 to 0x7f610402ccc4CC1BEbcE9699819200f5f28ED6e3"

# Use ChatGPT API to extract key information
extracted_info = extract_info(user_command)

# Extract Ethereum addresses and amount using regex
address_pattern = re.compile(r'(0x[0-9a-fA-F]{40})')
addresses = [match.group(1) for match in address_pattern.finditer(extracted_info)]

if len(addresses) >= 2:
    receiver_address = addresses[1]
    sender_address = addresses[0]
else:
    print("Failed to extract required addresses.")
    receiver_address = None
    sender_address = None

amount_regex = re.search(r'(\d+(?:\.\d+)?)\s*ETH', extracted_info)

if receiver_address and sender_address and amount_regex:
    amount = float(amount_regex.group(1))
    print(f"Receiver address: {receiver_address}")
    print(f"Sender address: {sender_address}")
    print(f"Amount: {amount} ETH")
    
    tx = TX(sender_address, receiver_address, amount)
    send_tx(tx)

else:
    print("Failed to extract required information.")
=======
def process_user_command(user_command):
    # Declare local variables for sender and receiver addresses
    sender_address = None
    receiver_address = None
    amount = None

    #print(f"Processing user command: {user_command}")

    if (len(user_command) == 42):
        return {'sender_address': user_command, 'receiver_address': None, 'amount': None}

    if (len(user_command) == 44):
        return {'sender_address': user_command, 'receiver_address': None, 'amount': None}
    # Use ChatGPT API to extract key information
    extracted_info = extract_info(user_command)
    # Extract Ethereum addresses and amount using regex
    address_pattern = re.compile(r'(0x[0-9a-fA-F]{40})')
    #if (address_pattern) == None:
     #   address_pattern = re.compile(r'(?:\b(?!0{8})[0-9a-zA-Z]{44}\b)')
    
    addresses = [match.group(1) for match in address_pattern.finditer(extracted_info)]
    if (addresses == []):
        address_pattern = re.compile(r'([1-9A-HJ-NP-Za-km-z]{44})')
        addresses = [match.group(1) for match in address_pattern.finditer(extracted_info)]
    
    if len(addresses) == 1:
      sender_address = None
      receiver_address = addresses[0]
    elif len(addresses) == 2:
        sender_address = addresses[0]
        receiver_address = addresses[1]
    else:
        #print("Failed to extract required addresses.")
        sender_address = None
        receiver_address = None

    amount_regex = re.search(r'(\d+(?:\.\d+)?)\s*ETH', extracted_info)
    if (amount_regex == None):
        amount_regex = re.search(r'(\d+(?:\.\d+)?)\s*SOL', extracted_info)
        if (amount_regex == None):
            amount_regex = re.search(r'(\d+(?:\.\d+)?)\s*AVAX', extracted_info)
            if (amount_regex == None):
                amount_regex = re.search(r'(\d+(?:\.\d+)?)\s*AGOR', extracted_info)
        #print(amount_regex.group(1))

    if receiver_address and amount_regex:
        amount = float(amount_regex.group(1))
        
        #print(f"Sender address: {sender_address}")
        #print(f"Receiver address: {receiver_address}")
        #print(f"Amount: {amount} ETH")
    elif sender_address and amount_regex:
        amount = float(amount_regex.group(1))
        #print(f"Sender address: {sender_address}")
        #print(f"Amount: {amount} ETH")
    #elif sender_address:
        #print(f"Sender address: {sender_address}")
    #else:
        #print("Failed to extract required information.")

    #print("\n")

    #print('/n')

    return {'sender_address': sender_address, 'receiver_address': receiver_address, 'amount': amount}
>>>>>>> happy-branch
