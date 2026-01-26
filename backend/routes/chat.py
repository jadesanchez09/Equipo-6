from flask import Blueprint, request, jsonify
from openai import OpenAI 
import re
import os
from dotenv import load_dotenv

load_dotenv()

chat_bp = Blueprint("chat", __name__)

llave_api = os.getenv("LLAVE_OPENAI")

if not llave_api:
    print("ERRORR, NO SE ENCONTRO LA APY KEY DE OPENAI")

client = OpenAI(api_key=llave_api)



def pregunta_rarona(texto):
    patrones = [
        r"donde vivo",
        r"direccion",
        r"hacke",
        r"bomba",
        r"matar",
        r"haz mi tarea",
        r"explosivo",
        r"fortnite",
    ]
    return any(re.search(p, texto, re.IGNORECASE)for p in patrones)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_msg = request.json.get("message", "")
    
    if not user_msg:
        return jsonify({"response": "Por favor escribe un mensaje"}), 400
    
    if pregunta_rarona(user_msg):
        return jsonify({"response": "Lo siento, pero no puedo ayudarte con esta pregunta, intenta con algo relacionado al agua o al medio ambiente"})
#descomentar cuando haya dinero    
#    try:
#        completions = client.chat.completions.create(
#            model="gpt-3.5-turbo", 
#            messages=[
#                {"role":"system","content":"""
#                Eres Aquabot, un asistente enfocado en temas de hidrologia y cuidado del agua en mexico.
#                - Responde siempre con claridad, y amabilidad.
#                - Si no sabes un dato preciso y fundamentado, invita a consultar la fuente oficial. 
#                - NO inventes informacion cientifica.
#                - Manten un tono cercano pero profesional.
#                """},
#                {"role":"user","content": user_msg}
#            ]
#        )
#    
#        respuesta = completions.choices[0].message.content
#        
#        return jsonify({"response": respuesta})
#    except Exception as e:
#        print(f"Error de OpenAI {e}")
#        return jsonify({"response":"Tuve un problema conectando con mi servidor, prueba de nuevo mas tarde o reportanos el error."}), 500
        
    import time
    time.sleep(1)
    respuesta = "Modo de prueba: Holaa! Por el momento no tengo creditos de uso de mi libreria, pero si recibiste este mensaje y no el de error quiere decir que el codigo funciona :D"
    
    return jsonify({"response": respuesta})