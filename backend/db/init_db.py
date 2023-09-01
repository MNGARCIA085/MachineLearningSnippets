from sqlalchemy.orm import Session

import schemas
from .repository import tag
from core.config import settings


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly



from db.models.document import Document
from db.models.tag import Tag
from db.models.document_tag import DocTag



def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    # borro datos anteriores
    db.query(Document).delete()
    db.query(Tag).delete()
    db.query(DocTag).delete()
    db.commit()


    # TAGS
    list_tags = ['Algoritmo','CNN','RNN','TensorFlow','Keras','PyTorch','Trax',
                    'Optimizadores','ScikiLearn','Pandas','Numpy','PySpark']
    for t in list_tags:
        tag.create_new_tag(schemas.tag.TagCreate(name=t),db)
 

    

    