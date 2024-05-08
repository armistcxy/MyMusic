from app.repository import sessionmaker
from sqlalchemy.orm import Session


def get_session() -> Session:
    session = sessionmaker()
    return session
