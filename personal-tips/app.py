from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
word_limit = 40

@app.route('/get-personalised-tip', methods=['POST'])
def get_personalised_tip():
    data = request.json
    print(data)
    user = data.get("userProfile")
    history = data.get("history")
    print(history)

    history_short = history[:18*125]

    #25
    #avg 125characters per history record

    prompt_message_0  = f"Based on the personal information about a user of a stock advice app where the experienceLevelNumber is on scale 1 to 3, riskAppetite is on scale 1 to 5, time horizont is on scale  short-term, medium-term, long-term : {user} and his history of transactions made, where the 'buyAction':true means that he bought a share and 'buyAction':false means that he sold an action:{history_short} create personalised advice about investment. Divide it into 5 tips. Represent each of the tips as one string. Result should be a python list consisting of five strings. Do not display order or category of the tip. "
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
                {"role": "user", "content": prompt_message_0},
            ]
        }
    )
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)