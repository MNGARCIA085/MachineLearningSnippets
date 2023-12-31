"""doc table

Revision ID: 5b54d0230867
Revises: 33a02bf53bd8
Create Date: 2023-08-26 11:35:44.816398

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5b54d0230867'
down_revision: Union[str, None] = '33a02bf53bd8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('document',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('detail', sa.Text(), nullable=True),
    sa.Column('obs', sa.Text(), nullable=True),
    sa.Column('pandas', sa.Text(), nullable=True),
    sa.Column('numpy', sa.Text(), nullable=True),
    sa.Column('pyspark', sa.Text(), nullable=True),
    sa.Column('scikitlearn', sa.Text(), nullable=True),
    sa.Column('keras', sa.Text(), nullable=True),
    sa.Column('tf', sa.Text(), nullable=True),
    sa.Column('pytorch', sa.Text(), nullable=True),
    sa.Column('trax', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_document_id'), 'document', ['id'], unique=False)
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tag_id'), 'tag', ['id'], unique=False)
    op.create_table('doctag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('document_id', sa.Integer(), nullable=True),
    sa.Column('tag_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['document_id'], ['document.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_doctag_id'), 'doctag', ['id'], unique=False)
    op.drop_index('ix_topic_id', table_name='topic')
    op.drop_table('topic')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('topic',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_topic_id', 'topic', ['id'], unique=False)
    op.drop_index(op.f('ix_doctag_id'), table_name='doctag')
    op.drop_table('doctag')
    op.drop_index(op.f('ix_tag_id'), table_name='tag')
    op.drop_table('tag')
    op.drop_index(op.f('ix_document_id'), table_name='document')
    op.drop_table('document')
    # ### end Alembic commands ###
