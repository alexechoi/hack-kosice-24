from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import requests
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

API_KEY = os.environ.get("API_KEY", "")

def get_metadata(symbol):
    today = datetime.now() - timedelta(days=1)
    yesterday = today - timedelta(days=1)

    # Format the dates in the required format (YYYY-MM-DD)
    today_str = today.strftime('%Y-%m-%d')
    yesterday_str = yesterday.strftime('%Y-%m-%d')

    base_url = f'https://financialmodelingprep.com/api/v3/historical-chart/1hour/{symbol}'
    params = {
        "from": yesterday_str,
        "to": today_str,
        "apikey": API_KEY
    }
    response = requests.get(base_url, params=params)
    return response.json()

def calculate_growth(symbol):
    data = get_metadata(symbol)
    sorted_data = sorted(data, key=lambda x: x['date'], reverse=True)[:24]
    latest_price = float(sorted_data[0]['open'])
    opening_prices = [float(item['open']) for item in sorted_data]
    average_opening_price = sum(opening_prices) / len(opening_prices)
    percentage_change = (latest_price - average_opening_price) / average_opening_price * 100
    percentage_change = round(percentage_change, 3)
    return (latest_price, 'grow', percentage_change) if percentage_change > 0 else (latest_price, 'fall', percentage_change)

@app.route('/get-price', methods=['POST'])
def get_price():
    req_data = request.get_json()
    symbol = req_data['symbol']
    result = calculate_growth(symbol)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)