from flask import Flask, render_template, url_for

app = Flask(__name__)


lst = ('a', 'b', 'c', 'd')


@app.route('/', methods=['GET'])
def index():
    from datetime import datetime

    now = datetime.now()

    time = now.strftime("%H:%M:%S")
    return render_template('index.html', time=time, lst=lst)


if __name__ == '__main__':
    app.run(port=5050, debug=True)
