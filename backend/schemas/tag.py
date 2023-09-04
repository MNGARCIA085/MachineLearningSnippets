from typing import Optional
from pydantic import BaseModel
from .common import Pagination


class TagBase(BaseModel):
    name: str

class TagShow(TagBase):
    id: int

class TagCreate(TagBase):
    pass

# for filtering
class TagFilter(Pagination):
    name: Optional[str] = ''
    name__contains: Optional[str] = ''
