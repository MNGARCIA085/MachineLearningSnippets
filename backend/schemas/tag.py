from pydantic import BaseModel


class TagBase(BaseModel):
    name: str

class TagShow(TagBase):
    id: int

class TagCreate(TagBase):
    pass