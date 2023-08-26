from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class Tag(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    # Definición de la relación muchos a uno con Document
    #document_id = Column(Integer, ForeignKey('documents.id'))
    document = relationship('Document', secondary='doctag',back_populates='tag')




