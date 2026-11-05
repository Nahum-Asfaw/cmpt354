from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def index():
    return 'Index Page'

@app.route('/hello')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=7000)
