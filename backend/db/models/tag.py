from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Tag(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    
    # Definición de la relación muchos a uno con Document
    document_id = Column(Integer, ForeignKey('documents.id'))
    document = relationship('Document', back_populates='tags')
