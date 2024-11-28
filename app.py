from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Google Books API base URL
GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes"

@app.route("/")
def index():
    # Render the frontend
    return render_template("index.html")

@app.route("/get_book_info", methods=["POST"])
def get_book_info():
    user_input = request.json.get("query", "")
    if not user_input:
        return jsonify({"response": "Please provide a book title or author."})

    # Query Google Books API
    response = requests.get(GOOGLE_BOOKS_API, params={"q": user_input})
    data = response.json()

    if "items" not in data:
        return jsonify({"response": "No books found for your query."})

    book = data["items"][0]["volumeInfo"]
    title = book.get("title", "No title available")
    authors = ", ".join(book.get("authors", ["Unknown author"]))
    description = book.get("description", "No description available.")
    rating = book.get("averageRating", "No rating available.")

    response_text = f"**Title**: {title}\n**Authors**: {authors}\n**Description**: {description}\n**Rating**: {rating}"
    return jsonify({"response": response_text})


if __name__ == "__main__":
    # Run the Flask app in debug mode
    app.run(debug=True)


#from flask_cors import CORS
#CORS(app)

