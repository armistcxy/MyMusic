from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


def get_admin_by_username(session: Session, admin_name: str) -> models.User:
    return (
        session.query(models.Admin).filter(models.User.admin_name == admin_name).first()
    )


def get_admin_by_email(session: Session, email: str) -> models.User:
    return session.query(models.User).filter(models.User.email == email).first()


def get_user_by_id(session: Session, id: uuid.UUID) -> models.User:
    return session.get(models.User, ident=id)


def insert_user(user: models.User, session: Session) -> models.User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def delete_user(id: uuid.UUID, session: Session) -> bool:
    user = get_user_by_id(session, id)
    if user == None:
        return False
    else:
        session.delete(user)
        session.commit()
        return True


def find_user_with_name(name: str, session: Session) -> list[models.User]:
    session = get_session()
    ts_query = func.plainto_tsquery("simple", name)
    users = (
        session.query(models.User)
        .filter(func.to_tsvector("simple", models.User.name).op("@@")(ts_query))
        .all()
    )
    return users


def get_all_users(session: Session) -> list[models.User]:
    users = session.query(models.User).all()
    return users
