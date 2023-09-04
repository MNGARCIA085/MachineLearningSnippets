from db.repository.tag import create_new_tag,get_tags,retreive_tag,update_tag_by_id,delete_tag_by_id
from db.session import get_db
from fastapi import APIRouter, Depends, HTTPException,status
from schemas.tag import TagCreate, TagFilter,TagShow
from sqlalchemy.orm import Session


router = APIRouter()


# create tag
@router.post("/", status_code=201)
def create_tag(tag:TagCreate, db: Session = Depends(get_db)):
    return create_new_tag(tag=tag, db=db)


# all tags
@router.get("/")
def get_all_tags(f:TagFilter = Depends(),db: Session = Depends(get_db)):
    return get_tags(db=db,f=f)


# get tag by id
@router.get("/{id}", response_model=TagShow)
def read_tag(id: int, db: Session = Depends(get_db)):
    tag = retreive_tag(id=id, db=db)
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with this id {id} does not exist",
        )
    return tag

# update tag
@router.put("/{id}",status_code=201)
def update_tag(
                id: int, 
                tag: TagCreate, 
                db: Session = Depends(get_db)):
    aux = update_tag_by_id(id=id, tag=tag, db=db)
    if not aux:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Tag with id {id} not found"
        )
    return {"msg": "Successfully updated data."}


# delete
@router.delete("/{id}")
def delete_tag(
    id: int,
    db: Session = Depends(get_db),
):
    tag = retreive_tag(id=id, db=db)
    if not tag:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tag with id {id} does not exist",
        )
    # chequear que sólo pueda borrar un superusuario
    delete_tag_by_id(id=id, db=db)
    return {"detail": "Successfully deleted."}