from db.models.document import Document
from schemas.documents import DocumentCreate,DocumentFilter
from .document_tags import create_document_tags,delete_document_tags
from sqlalchemy.orm import Session
from db.models.tag import Tag
from sqlalchemy import or_,and_


# create new document
def create_new_document(document: DocumentCreate,db: Session):
    # obtengo el dict; le separo los ids de los géneros y luego inserto apropiadamente
    data = document.dict()
    tags = data.pop('tags')
    # agrego la peli
    document_object = Document(**data)
    db.add(document_object)
    db.flush()
    # los géneros
    create_document_tags(document_object.id,tags,db)
    # commit
    db.commit()
    db.refresh(document_object)
    return document_object


# retrieve by id
def retreive_document(id: int, db: Session):
    return db.query(Document).filter(Document.id == id).first()


# list, with filters
def list_documents(db: Session,f:DocumentFilter):
    filters = [Document.id>0]
    if f.title:
        filters.append(Document.title==f.title)
    if f.title__contains:
        filters.append(Document.title.contains(f.title__contains))
    if f.tags:
        tags = db.query(Tag.id).filter(Tag.id.in_(f.tags))
        filters.append(Tag.id.in_(tags))
    # junto todo
    filters = and_(*filters)
    #for a in aux:
    #    for b in a.tag:
    #        print(b.id,b.name)
    # query
    docs = db.query(Document).join(Document.tag).filter(filters).limit(f.limit).offset(f.offset).all()
    
    # le agrego count, page, limit
    count = db.query(Document).join(Document.tag).filter(filters).count()
    
    #data = [item.__dict__ for item in docs]
    #data = [{key: value for key, value in item.items() if key != '_sa_instance_state'} for item in data]
    



    data = [
        {
            'id':d.id,
            'title': d.title,
            'detail': d.detail,
            'description':d.description,
            'obs':d.obs,
            'pandas':d.pandas,
            'numpy':d.numpy,
            'scikitlearn':d.scikitlearn,
            'pyspark':d.pyspark,
            'keras':d.keras,
            'tf':d.tf,
            'pytorch':d.pytorch,
            'trax':d.trax,
            'tag': [{'name':t.name,'id':t.id} for t in d.tag]
        }
        for d in docs
    ]


    
    
    
    # respuesta
    response = {
        'data': data,
        'count': count,
        'limit':f.limit,
        'offset':f.offset
    }
    return response



# update by id
def update_document_by_id(id: int, document: DocumentCreate, db: Session):
    existing_document = db.query(Document).filter(Document.id == id)
    if not existing_document.first():
        return 0
    # actualizo el documento y sus tags
    data = document.dict(exclude_unset=True) # ipte
    tags = data.pop('tags')
    # géneros: borro los viejos y agrego los nuevos
    delete_document_tags(id,db)
    create_document_tags(id,tags,db)
    # el documento
    existing_document.update(data) 
    db.commit()
    return 1


# delete by id
def delete_document_by_id(id: int, db: Session):
    existing_document = db.query(Document).filter(Document.id == id)
    if not existing_document.first():
        return 0
    # borro sus géneros
    delete_document_tags(document_id=id,db=db)
    # borro la peli
    existing_document.delete(synchronize_session=False)
    db.commit()
    return 1

