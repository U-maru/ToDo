from flask import Flask, request, render_template, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import json
import os
import glob

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False  # 日本語などのASCII以外の文字列を返したい場合は、こちらを設定しておく

# Topページ
# http://127.0.0.1:5000/
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/ToDo')
def todo_form():
    return render_template("ToDo_form.html")

@app.route('/add_ToDo', methods=["POST"])
def add_todo():
    # 追加パラメータの取得
    new_data = request.form.to_dict()

    with open('ToDo.json') as f:
        # 既存のデータを読み込み
        json_data = list(json.load(f))
        # 新しいデータを既存のデータに登録
        json_data.append(new_data)

    with open('ToDo.json', mode="w") as f:
        # 新データ登録済みのデータを'address.json'に上書き
        json.dump(json_data, f, indent=4)

    return render_template("ToDo_form.html")

@app.route('/ToDo_List')
def todo_list():
    with open('ToDo.json') as f:
        # 既存のデータを読み込み
        json_data = list(json.load(f))

    return render_template("ToDo_list.html", data=json_data)

if __name__ == "__main__":
    # debugモードが不要の場合は、debug=Trueを消してください
    app.run(debug=True)