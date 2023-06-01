from flask import Flask, request, jsonify
from flask_cors import CORS
import json

from BookGenerator.BookGenerator import BookGenerator
from BookGenerator.Book import Book

app = Flask(__name__)
CORS(app)  # This will enable CORS for all route


@app.route('/book', methods=['POST'])
def book():
    if not request.json:
        return jsonify({'error': 'No id provided'}), 400
    print(request.json)
    result: Book = BookGenerator().getBook(request.json)

    # return jsonify(result), 200

    return jsonify("Hello, World!"), 200


if __name__ == '__main__':
    app.run(port=5000)  # Runs the server in development mode on port 5000.