from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, Rol
from extensions import db

auth_bp = Blueprint("auth", __name__)

# REGISTRO #

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    
    if not username or not email or not password:
        return jsonify({"error": "Faltan datos"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Este correo ya esta registrado"}), 400
    
    role = Rol.query.filter_by(name="user").first()
    if not role:
        role = Rol(name="user")
        db.session.add(role)
        db.session.commit()
    
    nuevo_user = User(
        username=username,
        email=email,
        pass_hash=generate_password_hash(password),
        role_id=role.id
    )
    
    db.session.add(nuevo_user)
    db.session.copy()
    
    return jsonify({"message": "Usuario registrado con exito"}), 201

# FINAL DE REGISTRO #

# LOGIN #

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Datos faltantes"}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    if not check_password_hash(user.pass_hash, password):
        return jsonify({"error": "contrasena incorrecta"}), 401
    
    token = create_access_token(identity=user.id)
    
    return jsonify({"message": "Login exitoso!", "token":token, "user": {"id":user.id, "username":user.username, "email":user.email,}})

# FINAL DE LOGIN #

# RUTA PROTEGIDA "A" ES UNA MUESTRA #

def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    return jsonify({"id":user.id,"username":user.username,"email":user.email})

