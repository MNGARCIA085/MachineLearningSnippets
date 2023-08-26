from db.base_class import Base
from sqlalchemy import Column, ForeignKey,Integer



class DocTag(Base):
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey('document.id'))
    tag_id = Column(Integer, ForeignKey('tag.id'))