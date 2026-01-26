from flask import Flask
from flask_migrate import Migrate
from app import app, db
from models import Rol, User, PendingPost, PublishedPost

migrate = Migrate(app, db)

if __name__ == '__main__':
    from flask.cli import FlaskGroup
    cli = FlaskGroup(app)
    cli()