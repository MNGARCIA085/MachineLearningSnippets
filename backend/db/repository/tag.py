from sqlalchemy.orm import Session
from db.models.tag import Tag
from schemas.tag import TagCreate,TagFilter
from sqlalchemy import and_


# new tag
def create_new_tag(tag:TagCreate, db: Session):
    tag = Tag(**tag.dict())
    db.add(tag)
    db.commit()
    db.refresh(tag)
    return tag

# all tags
def get_tags(db: Session,f:TagFilter):
    filters = [Tag.id>0]
    if f.name:
        filters.append(Tag.name==f.name)
    if f.name__contains:
        filters.append(Tag.name.contains(f.name__contains))
    # junto todo
    filters = and_(*filters)
    tags = db.query(Tag).filter(filters).limit(f.limit).offset(f.offset)
    count = db.query(Tag).filter(filters).count()
    #
    data = [item.__dict__ for item in tags]
    data = [{key: value for key, value in item.items() if key != '_sa_instance_state'} for item in data]
    # respuesta
    response = {
        'data': data,
        'count': count,
        'limit':f.limit,
        'offset':f.offset
    }
    return response


# retrieve by id
def retreive_tag(id: int, db: Session):
    return db.query(Tag).filter(Tag.id == id).first()



# update tag
def update_tag_by_id(id: int, tag: TagCreate, db: Session):
    existing_tag = db.query(Tag).filter(Tag.id == id)
    if not existing_tag.first():
        return 0
    # actualizo
    data = tag.dict(exclude_unset=True) # ipte
    # el documento
    existing_tag.update(data) 
    db.commit()
    return 1


# delete by id
def delete_tag_by_id(id: int, db: Session):
    existing_tag = db.query(Tag).filter(Tag.id == id)
    if not existing_tag.first():
        return 0
    # borro
    existing_tag.delete(synchronize_session=False)
    db.commit()
    return 1