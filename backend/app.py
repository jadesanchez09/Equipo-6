from flask import Flask, jsonify
from flask_cors import CORS
from extensions import jwt
from extensions import db, migrate
from config import Config

# BLUEPRINTS
# from models import Rol, User, PendingPost, PublishedPost
from routes.protected import bp_protegido
from routes.auth import auth_bp
from routes.chat import chat_bp


def create_app():  
    
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(chat_bp, url_prefix="/api")
    
    CORS(app, resources={r"/api/*": {"origins":"http://localhost:5173"}})
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    @app.route("/api")
    def index():
        return{"message": "Backend funcionando con JWT"}
    return app

app = create_app()

if __name__ == "__main__":
    print("Backend listo en puerto 8000")
    print("favor de ejecutar el host del fontend con npm run dev o npm start desde el dir raiz")
    app.run(debug=True, host="0.0.0.0", port=8000)
    