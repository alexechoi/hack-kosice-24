import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
word_limit = 40

prompts = {
    1: [
        f"Create a trading tip for a user that has little or no experience in trading. Utilise uncommonly known tips. Make it to contain maximum of {word_limit} words.",
        f"Craft a trading recommendation tailored for novice traders, incorporating lesser-known insights to enhance its effectiveness. Limit of words is {word_limit}.",
        f"Develop a trading suggestion designed specifically for inexperienced traders, integrating lesser-known insights to optimize its impact. Make it to contain maximum of {word_limit} words.",
        f"Write a tip for trading on stock maret for a person that is begginer in trading. Make it clear and easy to understand. Make it to contain maximum of {word_limit} words.",
        f"Suggest some advice for  for trading on stock maret for a person that is not skilled in trading and trading vocabulary. Limit of words is {word_limit}."
        f"Offer guidance for individuals new to stock trading, emphasizing simplicity and caution. Simplify language for accessibility. Limit of words is {word_limit}."
    ],
    2: [
        f"Create a trading tip for a mid-level user. Utilise uncommonly known tips. Make it to contain maximum of {word_limit} words.",
        f"Craft a trading recommendation tailored for moderate traders, incorporating lesser-known insights to enhance its effectiveness. Limit of words is {word_limit}.",
        f"Develop a trading suggestion designed specifically for traders that have some experience but are not experts, integrating lesser-known insights to optimize its impact. Make it to contain maximum of {word_limit} words.",
        f"Write a tip for trading on stock maret for a person that is Intermediate level user trading. Make it clear and easy to understand. Make it to contain maximum of {word_limit} words.",
        f"Suggest some advice for  for trading on stock maret for a person that already has some skills in trading. Limit of words is {word_limit}."
        f"Offer guidance for capable individuals in stock trading. Create answer that is not common. Limit of words is {word_limit}."
    ],
    3: [
        f"Create a trading tip for a experienced user. Utilise uncommonly known tips. Make it to contain maximum of {word_limit} words.",
        f"Craft a trading recommendation tailored for skilled traders, incorporating lesser-known insights to enhance its effectiveness. Limit of words is {word_limit}.",
        f"Develop a trading suggestion designed specifically for traders that have a lot of experience, integrating lesser-known insights to optimize its impact. Make it to contain maximum of {word_limit} words.",
        f"Write a tip for trading on stock maret for a person that is expert level user trading. Make it to contain maximum of {word_limit} words.",
        f"Suggest some advice for  for trading on stock maret for a person that already has a lot of skills in trading. Limit of words is {word_limit}."
        f"Offer guidance for very skilled individuals in stock trading. Create answer that is not common. Limit of words is {word_limit}."
    ]
}


@app.route('/get-tip/<int:level>', methods=['POST'])
def summarize(level):
    data = request.json
    user_message = data.get("message")

    # Construct a prompt that creates a tip
    #prompt_message = f"Create a trading tip for a user that has little or no experience in trading. Utilise uncommonly known tips"
    prompt_message = random.choice(prompts.get(level))
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