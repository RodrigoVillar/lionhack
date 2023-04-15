from flask import Flask, request, make_response
from flask_cors import CORS
import json
import logging
import gpt

app = Flask(__name__)
CORS(app)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

sender_address = ""
receiver_address = ""
amount = 0.0

@app.route('/api/messages', methods=['POST'])
def post_message():
    global sender_address, receiver_address, amount
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
    print('/n')

    response = make_response(json.dumps({'success': True}))
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    app.run(port=5001)
    print("Hello Wofld!")
