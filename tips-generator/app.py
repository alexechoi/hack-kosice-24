from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")

@app.route('/get-tip', methods=['POST'])
def summarize():
    data = request.json
    user_message = data.get("message")

    # Construct a prompt that creates a tip
    prompt_message = f"Create a trading tip for a user that has little or no experience in trading. Utilise uncommonly known tips"

    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        },
        json={
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt_message}
            ]
        }
    )
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
