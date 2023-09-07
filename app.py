import flask
from flask import render_template, request, jsonify

import sentiment_analysis as sa

app = flask.Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def review():
    review = request.json.get('customer_review')

    if not review:
        return jsonify({'status': 'error', 'message': 'Empty response'})

    sentiment, emoji_path = sa.predict(review)

    return jsonify({'sentiment': sentiment, 'emoji_path': emoji_path})


if __name__ == '__main__':
    app.run(debug=True)

