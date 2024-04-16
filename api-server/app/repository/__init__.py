from model import database, models
from sqlalchemy.orm import sessionmaker

engine = database.init_engine()
sessionmaker = sessionmaker(
    bind=engine, autoflush=False, autocommit=False, expire_on_commit=False
)
# autoflush = False means data only be modified at the end of the session, this could help
# application performance better, in case transaction are fail, the data has been not written to db yet

models.Base.metadata.create_all(bind=engine)
