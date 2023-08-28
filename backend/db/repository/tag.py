from sqlalchemy.orm import Session
from db.models.tag import Tag
from schemas.tag import TagCreate

# new tag
def create_new_tag(tag:TagCreate, db: Session):
    tag = Tag(**tag.dict())
    db.add(tag)
    db.commit()
    db.refresh(tag)
    return tag

# all tags
def get_tags(db: Session):
    return db.query(Tag).all()