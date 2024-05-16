from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


def insert_category(session: Session, category: models.Category) -> models.Category:
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


def get_category_by_name(session: Session, name: str) -> models.Category:
    return session.query(models.Category).filter(models.Category.name == name).first()


def get_category_by_id(session: Session, id: uuid.UUID) -> models.Category:
    category = session.get(models.Category, ident=id)
    return category


def get_all_categories(session: Session) -> list[models.Category]:
    return session.query(models.Category).all()


def delete_category(session: Session, id: uuid.UUID) -> bool:
    session = get_session()
    category = session.get(models.Category, ident=id)
    if category == None:
        return False
    else:
        session.delete(category)
        session.commit()
        return True


def find_category_with_name(session: Session, name: str) -> list[models.Category]:
    session = get_session()
    ts_query = func.plainto_tsquery("simple", name)
    categories = (
        session.query(models.category)
        .filter(func.to_tsvector("simple", models.Category.name).op("@@")(ts_query))
        .all()
    )
    return categories
