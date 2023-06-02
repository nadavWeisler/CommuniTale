from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json

from BookGenerator.BookGenerator import BookGenerator
from BookGenerator.Book import Book
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # This will enable CORS for all route


@app.route('/book', methods=['POST', 'OPTIONS'])
def book():
    if request.method == 'OPTIONS':
        # Preflight request. Reply successfully:
        return jsonify({'success': True}), 200
    if not request.json:
        return jsonify({'error': 'No id provided'}), 400
    print(request.json)
    result: Book = BookGenerator().getBook(request.json)
    print(result.to_dict().get('text_pages'))
    return jsonify(result.to_dict()), 200

    # return jsonify("Hello, World!"), 200


@app.route('/send_pdf', methods=['POST', 'OPTIONS'])
def send_pdf():
    if request.method == 'OPTIONS':
        # Preflight request. Reply successfully:
        return jsonify({'success': True}), 200

    pdf_file = "../output.pdf"

    with open(pdf_file, 'rb') as f:
        data = f.read()
    response = make_response(data)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline;filename=output.pdf'
    return response


if __name__ == '__main__':
    # print(BookGenerator().getBook(dict()))
    app.run(port=5000)  # Runs the server in development mode on port 5000.
