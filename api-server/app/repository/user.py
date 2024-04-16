from model import models
from repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


class UserRepo:
    def insert_user(self, user: models.User, session: Session) -> models.User:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    def get_user_by_id(self, id: uuid.UUID, session: Session) -> models.User:
        user = session.get(models.User, ident=id)
        return user

    def delete_user(self, id: uuid.UUID, session: Session) -> bool:
        session = get_session()
        user = session.get(models.User, ident=id)
        if user == None:
            return False
        else:
            session.delete(user)
            session.commit()
            return True

    def find_user_with_name(self, name: str, session: Session) -> list[models.User]:
        session = get_session()
        ts_query = func.plainto_tsquery("simple", name)
        users = (
            session.query(models.User)
            .filter(func.to_tsvector("simple", models.User.name).op("@@")(ts_query))
            .all()
        )
        return users
