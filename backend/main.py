from web3 import Web3
from dotenv import dotenv_values

config = dotenv_values("../.env")

w3 = Web3(Web3.HTTPProvider(config["ALCHEMY_API_URL"]))

class TX:

    def __init__(self, frm, to, value):
        self.frm = frm
        self.to = to
        self.value = value

    def to_dict(self):
        val = {
            "from": self.frm,
            'to': self.to,
            'value': w3.to_wei(self.value, "ether"),
            "nonce": w3.eth.get_transaction_count(self.frm),
            "gas": 21_000,
            "gasPrice": w3.eth.gas_price
        }
        return val

def send_tx(tx: TX):

    private_key = config["SAMPLE_PRIVATE_KEY"]

    signed_tx = w3.eth.account.sign_transaction(tx.to_dict(), private_key)

    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    print(w3.to_hex(tx_hash))

