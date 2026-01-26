from extensions import db
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash

class Rol(db.Model):
    __tablename__ = "roles"
    
    id_rol = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True)
    descripcion = db.Column(db.Text)
    
    usuarios = db.relationship("User", backref="rol", lazy=True)
    
    def __repr__(self):
        return f"<Rol {self.nombre}>"
    
class User(db.Model):
    __tablename__ = "usuarios"
    
    # datos de usuario
    
    id_usuario = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    pass_hash = db.Column(db.String(128), nullable=False) #antes era 255, se cambio a 128 por recomendacion de chat
    biografia = db.Column(db.Text, nullable=True)
    rol_id = db.Column(db.Integer, db.ForeignKey("roles.id_rol"), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    activo = db.Column(db.Boolean, default=True)
     
    
    posts_pendientes = db.relationship(
        "PendingPost",
        backref=db.backref("autor", lazy=True),
        lazy=True,
        foreign_keys="PendingPost.usuario_id"
    )
    
    posts_revisados = db.relationship(
        "PendingPost",
        backref=db.backref("revisor", lazy=True),
        lazy=True,
        foreign_keys="PendingPost.admin_revisor_id"
    )
    
    posts_publicados = db.relationship(
        "PublishedPost",
        backref=db.backref("autor", lazy=True),
        lazy=True,
        foreign_keys="PublishedPost.usuario_id"
    )
    
    def set_password(self, raw_password):
        self.pass_hash = generate_password_hash(raw_password, method="pbkdf2:sha256", salt_length=8) # metodo de hasheo, salt es un numero aleatorio 
    
    def check_password(self, raw_password):
        return check_password_hash(self.pass_hash, raw_password) #compara el hash con la contraseña dada o cruda
    
    def __repr__(self):
        return f"<User {self.username}>"
    
class PendingPost(db.Model):
    __tablename__ = "posts_pendientes"
    
    id_post = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario"), nullable=False)
    titulo = db.Column(db.String(150), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    estado = db.Column(db.Enum("pendiente", "rechazado", "aprobado"), default="pendiente")
    admin_revisor_id = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario"), nullable=True)
    comentario_revisor = db.Column(db.Text)
    
    def __repr__(self):
        return f"<PendingPost {self.titulo}>"
    
class PublishedPost(db.Model):
    __tablename__ = "posts_publicados"
    
    id_post_publicado = db.Column(db.Integer, primary_key=True)
    id_post_original = db.Column(db.Integer, db.ForeignKey("posts_pendientes.id_post"), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario"), nullable=False)
    titulo = db.Column(db.String(150), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_publicacion = db.Column(db.DateTime, default=datetime.utcnow)
    visible = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f"<PublishedPost {self.titulo}>"