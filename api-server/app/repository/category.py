from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


class CategoryRepo:
    def insert_category(
        self, category: models.Category, session: Session
    ) -> models.Category:
        session.add(category)
        session.commit()
        session.refresh(category)
        return category

    def get_category_by_id(self, id: uuid.UUID, session: Session) -> models.Category:
        category = session.get(models.Category, ident=id)
        return category

    def delete_category(self, id: uuid.UUID, session: Session) -> bool:
        session = get_session()
        category = session.get(models.Category, ident=id)
        if category == None:
            return False
        else:
            session.delete(category)
            session.commit()
            return True

    def find_category_with_name(
        self, name: str, session: Session
    ) -> list[models.Category]:
        session = get_session()
        ts_query = func.plainto_tsquery("simple", name)
        categories = (
            session.query(models.category)
            .filter(func.to_tsvector("simple", models.Category.name).op("@@")(ts_query))
            .all()
        )
        return categories
