from solathon.core.instructions import transfer
from solathon import Client, Transaction, PublicKey, Keypair
from dotenv import dotenv_values

config = dotenv_values("../.env")

def send_solana_transaction(sender_address: str, receiver_address: str, amount):
    client = Client("https://api.devnet.solana.com")

    sender = Keypair.from_private_key(config["SOLANA_PRIVATE_KEY"])
    receiver = PublicKey(receiver_address)

    instruction = transfer(
        from_public_key=sender_address,
        to_public_key=receiver,
        lamports=int(amount * 1000000000)
    )

    transaction = Transaction(instructions=[instruction], signers=[sender])

    result = client.send_transaction(transaction)
    print("Transaction response: ", result)

