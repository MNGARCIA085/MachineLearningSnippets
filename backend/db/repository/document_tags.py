from typing import List
from db.models.document_tag import DocTag
from sqlalchemy.orm import Session



def create_document_tags(document_id:int,tags:List[int],db:Session):
    for t in tags:
        document_tag_object = DocTag(document_id=document_id,tag_id=t)
        db.add(document_tag_object)
        # sin commit pues es más bien un accesorio
    return 


# borro todos los géneros de la peli
def delete_document_tags(document_id:int,db:Session):
    db.query(DocTag).filter(DocTag.document_id==document_id).delete(synchronize_session=False)
    return