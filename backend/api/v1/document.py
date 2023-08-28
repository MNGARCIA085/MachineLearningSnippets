from typing import List
from db.repository.document import create_new_document,retreive_document,delete_document_by_id,update_document_by_id,list_documents
from db.session import get_db
from fastapi import APIRouter, Depends, HTTPException,status
from schemas.documents import DocumentCreate,DocumentShow,DocumentFilter
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/", response_model=DocumentShow,status_code=201)
def create_document(
    document: DocumentCreate,
    db: Session = Depends(get_db)
):
    return create_new_document(document=document,db=db)


@router.get(
    "/{id}", response_model=DocumentShow
)
def read_document(id: int, db: Session = Depends(get_db)):
    document = retreive_document(id=id, db=db)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with this id {id} does not exist",
        )
    return document


@router.get("/",response_model=List[DocumentShow]) 
def read_documents(f: DocumentFilter = Depends(),db: Session = Depends(get_db)):
    return list_documents(db=db,f=f) 


@router.put("/{id}",status_code=201)
def update_documents(
                id: int, 
                document: DocumentCreate, 
                db: Session = Depends(get_db)):
    aux = update_document_by_id(id=id, document=document, db=db)
    if not aux:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Document with id {id} not found"
        )
    return {"msg": "Successfully updated data."}


@router.delete("/{id}")
def delete_document(
    id: int,
    db: Session = Depends(get_db),
):
    document = retreive_document(id=id, db=db)
    if not document:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with id {id} does not exist",
        )
    # chequear que sólo pueda borrar un superusuario
    delete_document_by_id(id=id, db=db)
    return {"detail": "Successfully deleted."}