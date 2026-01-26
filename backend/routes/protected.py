from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

bp_protegido = Blueprint("protected", __name__)

@bp_protegido.route("/tablon")
@jwt_required()

def tablon():
    uid = get_jwt_identity()
    return {"message": f"Bienvenido, {uid} !"} 