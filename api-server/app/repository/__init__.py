from model import database, models
from sqlalchemy.orm import sessionmaker

engine = database.init_engine()
sessionmaker = sessionmaker(bind=engine, autoflush=True, autocommit=False)

models.Base.metadata.create_all(bind=engine)


