from flask import Flask, request, make_response
from flask_cors import CORS
import json
import logging
import gpt
from main import TX, send_tx
from solanamain import send_solana_transaction

app = Flask(__name__)
CORS(app)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

sender_address = ""
receiver_address = ""
amount = 0.0
test = {}

@app.route('/api/messages', methods=['POST','GET'])
def post_message():
    global sender_address, receiver_address, amount, test
    message = request.get_json().get('message')
    #print(message)
    output = gpt.process_user_command(message)
    #print(output)
    if (output['sender_address'] != None):
        sender_address = output['sender_address']
    if (output['receiver_address'] != None):
        receiver_address = output['receiver_address']
    if (output['amount'] != None):
        amount = output['amount']
    
    print("Sender: " + sender_address)
    print("Receiver: " + receiver_address)
    print("Amount: " + str(amount))
    print('\n')

    if ("ETH" in message):
        if (sender_address != "" and receiver_address != "" and amount != 0):
            tx = TX(sender_address, receiver_address, amount, "ETH")
            test = json.dumps(TX.to_dict(tx))
    
    if ("SOL" in message):
        if (sender_address != "" and receiver_address != "" and amount != 0):
            send_solana_transaction(sender_address, receiver_address, amount)

    if ("AVAX" in message):
        if (sender_address != "" and receiver_address != "" and amount != 0):
            tx = TX(sender_address, receiver_address, amount, "AVAX")
            test = json.dumps(TX.to_dict(tx))
    if ("AGOR" in message):
        if (sender_address != "" and receiver_address != "" and amount != 0):
            tx = TX(sender_address, receiver_address, amount, "AGOR")
            test = json.dumps(TX.to_dict(tx))
    # response = make_response(json.dumps({'success': True}))
    # response.headers['Content-Type'] = 'application/json'
    #print(test)
    return test

if __name__ == '__main__':
    app.run(port=5001)
