from api.v1 import tag,document
from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(tag.router, prefix="/tag", tags=["tag"])
api_router.include_router(document.router, prefix="/document", tags=["document"])
