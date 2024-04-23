import requests
from datetime import datetime, timedelta

def get_metadata(api_key, symbol):
    today = datetime.now() - timedelta(days=1)
    yesterday = today - timedelta(days=1)

    # Format the dates in the required format (YYYY-MM-DD)
    today_str = today.strftime('%Y-%m-%d')
    yesterday_str = yesterday.strftime('%Y-%m-%d')

    print(yesterday_str)
    print(today_str)

    base_url = f'https://financialmodelingprep.com/api/v3/historical-chart/1hour/{symbol}'
    params = {
        "from": yesterday_str,
        "to": today_str,
        "apikey": api_key
    }
    response = requests.get(base_url, params=params)
    print(response.json())
    return response.json()

def calculate_growth(api_key, symbol):
    data = get_metadata(api_key, symbol)
    sorted_data = sorted(data, key=lambda x: x['date'], reverse=True)[:24]
    latest_price = float(sorted_data[0]['open'])
    opening_prices = [float(item['open']) for item in sorted_data]
    average_opening_price = sum(opening_prices) / len(opening_prices)
    percentage_change = (latest_price - average_opening_price) / average_opening_price * 100
    percentage_change = round(percentage_change, 3)
    return (latest_price, 'grow', percentage_change) if percentage_change > 0 else (latest_price, 'fall', percentage_change)

# Usage
api_key = "" # TODO insert API key
symbol = "AAPL"
print(calculate_growth(api_key, symbol))