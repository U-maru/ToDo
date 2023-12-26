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

# ToDoの追加処理
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
        # 新データ登録済みのデータを'ToDo.json'に上書き
        json.dump(json_data, f, indent=4)

    return jsonify(json_data)

# ToDoの削除処理
@app.route('/remove_ToDo', methods=["POST"])
def remove_todo():
    json_index = request.form.to_dict()
    index = int(json_index['index'])

    with open('ToDo.json') as f:
        # 既存のデータを読み込み
        json_data = list(json.load(f))

    del json_data[index]

    with open('ToDo.json', mode="w") as f:
        # 新データ登録済みのデータを'ToDo.json'に上書き
        json.dump(json_data, f, indent=4)
    
    return redirect(url_for('todo_list'))


# ToDoの変更画面の設定
@app.route('/edit_start_ToDo', methods=['POST'])
def edit_start_todo():
    json_index = request.form.to_dict()
    index = int(json_index['index'])

    with open('ToDo.json') as f:
        # 既存のデータを読み込み
        json_data = list(json.load(f))

    # 編集画面に必要な情報のみを抽出
    target_data = json_data[index]
    return jsonify(target_data)

# ToDoの変更処理
@app.route('/edit_end_ToDo', methods=['POST'])
def edit_end_ToDo():
    new_data = request.form.to_dict()
    index = int(new_data['index'])

    with open('ToDo.json') as f:
        # 既存のデータを読み込み
        json_data = list(json.load(f))

    # 変更したいデータを新しくアップデートする
    json_data[index].update(name=new_data['name'])
    json_data[index].update(title=new_data['title'])
    json_data[index].update(text=new_data['text'])
    json_data[index].update(date=new_data['date'])
    json_data[index].update(state=new_data['state'])

    with open('ToDo.json', mode="w") as f:
        # 新データ登録済みのデータを'ToDo.json'に上書き
        json.dump(json_data, f, indent=4)

    return redirect(url_for('todo_list'))


# ToDoリストの表示ページ
# http://127.0.0.1:5000/ToDo_List
@app.route('/ToDo_List')
def todo_list():
    with open('ToDo.json') as f:
        # 既存のデータを読み込み
        json_data = list(json.load(f))

    index = 0
    for jd in json_data:
        jd['index'] = index
        index = index + 1

    return render_template("ToDo_list.html", data=json_data)

if __name__ == "__main__":
    # debugモードが不要の場合は、debug=Trueを消してください
    app.run(debug=True)