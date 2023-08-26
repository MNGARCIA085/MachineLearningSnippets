from sqlalchemy import Column, Integer, String, ForeignKey,Text
from sqlalchemy.orm import relationship
from db.base_class import Base

class Document(Base):
   
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)

    # Definición de la relación uno a muchos con Tag
    tag = relationship('Tag', secondary='doctag',back_populates='document') 
    
    #
    description = Column(Text)
    detail = Column(Text)
    obs = Column(Text)

    # snippets en cada framework
    pandas = Column(Text)
    numpy = Column(Text)
    pyspark = Column(Text)
    scikitlearn = Column(Text)
    keras = Column(Text)
    tf = Column(Text)
    pytorch = Column(Text)
    trax = Column(Text)
    
    #reviews = relationship("Review", back_populates="movie") dsp.fk a files



