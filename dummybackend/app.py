from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/messages', methods=['POST'])
def handle_message():
    message = request.json['message']
    # Do some processing on the message
    response = {'status': 'success', 'message': f'Received message: {message}'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
