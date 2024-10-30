import openai
import gradio as gr
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
openai.api_key = ""  # Use an environment variable for security
messages = [{"role": "system", "content": "You are a psychologist"}]

def CustomChatGPT(user_input):
    try:
        messages.append({"role": "user", "content": user_input})
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=messages
        )
        ChatGPT_reply = response["choices"][0]["message"]["content"]
        messages.append({"role": "assistant", "content": ChatGPT_reply})
        return ChatGPT_reply
    except Exception as error:
        print("An error occurred:", error)  # Log the error
        return "Sorry, there was an error processing your request."

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("input")
    reply = CustomChatGPT(user_input)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    demo = gr.Interface(fn=CustomChatGPT, inputs="text", outputs="text", title="MindMate")
    demo.launch(server_name="0.0.0.0", server_port=5000, debug=True, share=True)
