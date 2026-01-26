"""estado inicial

Revision ID: 0001
Revises: 
Create Date: 2025-11-04 21:02:01.891164

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Este es el estado inicial de la base de datos
    # Las tablas y relaciones ya existen, así que no hacemos cambios
    
    # Stamping de la versión inicial para indicar que este es nuestro punto de partida
    op.execute('INSERT INTO alembic_version (version_num) VALUES ("0001")')


def downgrade():
    # No hay downgrade para el estado inicial
    pass
