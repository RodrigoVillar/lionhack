from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_input', methods=['POST'])
def process_input():
    user_input = request.json['user_input']
    
    # Process the user input here
    response = f"Received input: {user_input}"
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
