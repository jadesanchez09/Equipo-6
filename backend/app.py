from flask import Flask, jsonify
from flask_cors import CORS
from extensions import jwt
from extensions import db, migrate
from config import Config

# BLUEPRINTS
from routes.protected import bp_protegido
from routes.auth import auth_bp
# Si más adelante agregas chat u otros blueprints:
# from routes.chat import chat_bp


def create_app():
    """
    Función factory para crear la app de Flask.
    Permite escalabilidad y tests más fáciles.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # CORS para permitir conexiones desde frontend
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Registrar blueprints
    app.register_blueprint(bp_protegido, url_prefix="/api/protected")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    # app.register_blueprint(chat_bp, url_prefix="/api/chat")  # Descomentar cuando lo tengas

    # Ruta de prueba
    @app.route("/api")
    def index():
        return {"message": "Backend funcionando con JWT"}

    return app


if __name__ == "__main__":
    # Crear la app usando la factory
    app = create_app()
    print("Backend listo en puerto 8000")
    print(
        "Favor de ejecutar el host del frontend con 'npm run dev' o 'npm start' desde el directorio raíz"
    )
    app.run(debug=True, host="0.0.0.0", port=8000)