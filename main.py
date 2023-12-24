from flask import Flask, request, render_template, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import os
import glob

app = Flask(__name__)

# Topページ
# http://127.0.0.1:5000/
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/ToDo')
def todo_form():
    return render_template("ToDo_form.html")

@app.route('/ToDo_List')
def todo_list():
    return render_template("ToDo_list.html")

if __name__ == "__main__":
    # debugモードが不要の場合は、debug=Trueを消してください
    app.run(debug=True)