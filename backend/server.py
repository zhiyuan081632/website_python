from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)
CORS(app)  # 允许所有跨域请求

@app.route('/api/validate', methods=['POST'])
def handle_request():
    data = request.get_json()
    print(data)
    # message = data['message']

    reply = send_to_gpt(data)
    return jsonify({'reply': reply})


def send_to_gpt(message):
    group_id = "1695541358963615"
    api_key = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiY2hhdDIwMjMwOTI0IiwiU3ViamVjdElEIjoiMTY5NTU0MTM1ODY3NTQyNSIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE2OTU1NDEzNTg5NjM2MTUiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJ6aGl5dWFuMDgxNjMyQGdtYWlsLmNvbSIsIkNyZWF0ZVRpbWUiOiIyMDIzLTA5LTI0IDE1OjQzOjQzIiwiaXNzIjoibWluaW1heCJ9.OjUUS77uXJLYQ3UDfmltq0XvUwJ21Dpm-yqBxaEzz6aF6y_otbTGKvMu_XKu0m0i3ZDGc3kFIE2vOSRoLzMIf6QwfDE4HX5bFMCfbCzCbV_CUpWSV2-AF1Yd2rKWbCYKGkF66hnFwErqw2FyzAO1PXap93qq9Yw9ycJoPP2Vhflz-UlufVLCqcVFXkTl1RT7RKOl7UTM8cLZJt-WfyS2ftLs5DLdfQSQrH11dWvdIkY4J1JwYfPe9a1fwXf3gGyZXEYKbxbf3xAe8P7Dy5aLuQIuFHbURkQvwk_rdbNiwIVqUUWP0HGfrEfjmf3VchAHYcKZDy7RlHXDQVEzXMJG3g"

    url = f'https://api.minimax.chat/v1/text/chatcompletion?GroupId={group_id}'
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    #prefix, user_name, bot_name = choose_prefix()
    #tokens_to_generate可自行修改
    request_body = {
            "model":"abab5.5-chat",
            "tokens_to_generate": 2048,
            'messages': []
    }

    request_body['messages'].append({"sender_type": "USER","text": message})

    response = ''
    try:
        response = requests.post(url, headers=headers, json=request_body)

    except:
        print("error, retry!")
        os.sleep(2)
        response = requests.post(url, headers=headers, json=request_body)

    print("\nreply json:")

    # JSON格式打印
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))

    response_text = json.loads(response.text)
    reply_content = response_text['choices'][0]['text']

    print(f"reply:\n {reply_content}")

    return reply_content


if __name__ == '__main__':
    app.run()
