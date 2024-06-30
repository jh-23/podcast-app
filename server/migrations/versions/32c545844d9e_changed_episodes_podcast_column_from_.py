"""changed episodes Podcast column from string to integer

Revision ID: 32c545844d9e
Revises: de68ceae310c
Create Date: 2024-06-30 12:21:15.333776

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32c545844d9e'
down_revision = 'de68ceae310c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('podcasts', schema=None) as batch_op:
        batch_op.alter_column('episodes',
               existing_type=sa.VARCHAR(),
               type_=sa.Integer(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('podcasts', schema=None) as batch_op:
        batch_op.alter_column('episodes',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    # ### end Alembic commands ###