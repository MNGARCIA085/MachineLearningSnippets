from db.repository.tag import create_new_tag,get_tags
from db.session import get_db
from fastapi import APIRouter, Depends
from schemas.tag import TagCreate
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/", status_code=201)
def create_tag(tag:TagCreate, db: Session = Depends(get_db)):
    return create_new_tag(tag=tag, db=db)


@router.get("/")
def get_all_groups(db: Session = Depends(get_db)):
    return get_tags(db=db)