from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Set API key OpenAI
openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    # Mengirim pesan ke OpenAI GPT
    response = openai.Completion.create(
        model="gpt-4",  # Bisa menggunakan model GPT-3.5 atau GPT-4
        prompt=user_message,
        max_tokens=150
    )
    
    # Mengambil teks dari response
    message = response.choices[0].text.strip()
    return jsonify({'response': message})

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    
    # Proses pencarian sederhana, misalnya menggunakan daftar artikel
    articles = [
        {"title": "ChatGPT Introduction", "content": "ChatGPT is a conversational AI model..."},
        {"title": "Python Basics", "content": "Python is a powerful programming language..."},
    ]
    
    # Filter artikel berdasarkan query
    results = [article for article in articles if query.lower() in article["title"].lower()]
    
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
