from typing import Optional,List
from fastapi import Query
from pydantic import BaseModel, Field, validator
from .common import Pagination


# helper for tags
class Tag(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True



# shared properties
class DocumentBase(BaseModel):
    title: str
    description: str
    detail: str
    obs: Optional[str] 
    pandas : Optional[str] 
    numpy : Optional[str] 
    pyspark: Optional[str] 
    scikitlearn: Optional[str] 
    keras: Optional[str] 
    tf : Optional[str] 
    pytorch : Optional[str] 
    trax : Optional[str] 

    
# this will be used to validate data while creating a document
class DocumentCreate(DocumentBase):
    tags: List[int] 

    # que los tags sean válidos
    @validator("tags")
    def validate_tags(cls, value):
        # géneros posibles (db query)
        # si no están los agrego a una lista
        pass
        #raise ValueError(f"Invalid tags IDs: {invalid_ids}")
        #return value


        
    

# this will be used to format the response
class DocumentShow(DocumentBase):
    id: int
    tag : Optional[List[Tag]]
    
    class Config:  # to convert non dict obj to json
        orm_mode = True

# for filtering
class DocumentFilter(Pagination):
    title: Optional[str] = None
    title__contains: Optional[str] = None
    tags: Optional[List[int]] = Field(Query([]))