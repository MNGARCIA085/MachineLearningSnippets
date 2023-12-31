from api.base import api_router
from core.config import settings
from db.base import Base
from db.session import engine
#from db.utils import check_db_connected
#from db.utils import check_db_disconnected
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



def cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"]
    )



def include_router(app):
    app.include_router(api_router)



def create_tables():
    Base.metadata.create_all(bind=engine)


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    cors(app)
    include_router(app)
    #create_tables()
    return app


app = start_application()




"""
@app.on_event("startup")
async def app_startup():
    await check_db_connected()


@app.on_event("shutdown")
async def app_shutdown():
    await check_db_disconnected()
"""



"""
ALEMBIC
https://stackoverflow.com/questions/17768940/target-database-is-not-up-to-date
https://stackoverflow.com/questions/48242324/undo-last-alembic-migration
"""




"""

pip install alembic



alembic init alembic


models.Base.metadata.create_all(bind=engine); migrar sin usar alembic (en main)
alembic.ini
sqlalchemy.url = "sqlite:///./sql_app.db"

.env de alembic:

config.set_main_option("sqlalchemy.url", "sqlite:///./sql_app.db")
from db.base import Base  # noqa
target_metadata = Base.metadata


migraciones

alembic revision --autogenerate -m "Initial migration"
alembic upgrade head


----> https://medium.com/@julgq/migraciones-en-fastapi-usando-alembic-19379607db70



volver al inicio: alembic downgrade base

alembic downgrade -1



target db not up to dare (ojo que limpia todo)
almebic stamp head


"""