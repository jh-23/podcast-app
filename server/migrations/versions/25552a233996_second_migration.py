"""second migration

Revision ID: 25552a233996
Revises: f60c3578ccdd
Create Date: 2024-05-19 11:35:59.311581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25552a233996'
down_revision = 'f60c3578ccdd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###