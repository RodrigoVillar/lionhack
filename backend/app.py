from flask import Flask, request, make_response
from flask_cors import CORS
import json
import logging

app = Flask(__name__)
CORS(app)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/api/messages', methods=['POST'])
def post_message():
    message = request.get_json().get('message')
    print(message)
    response = make_response(json.dumps({'success': True}))
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    app.run(port=5001)
    print("Hello Wofld!")
