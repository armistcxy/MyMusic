from repository import sessionmaker
from sqlalchemy.orm import Session


def get_db() -> Session:
    db = sessionmaker()
    return db
