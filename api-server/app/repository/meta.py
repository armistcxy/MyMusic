from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.repository.error import IntegrityException, RepositoryError


def get_meta_info(session: Session, user_id: uuid.UUID) -> models.UserMetadata:
    meta_info = (
        session.query(models.UserMetadata)
        .where(models.UserMetadata.user_id == user_id)
        .first()
    )

    return meta_info


def create_meta_info(
    session: Session, user_id: uuid.UUID, track_id: uuid.UUID
) -> models.UserMetadata:
    meta_info = models.UserMetadata(user_id=user_id, track_id=track_id)
    try:
        session.add(meta_info)
        session.commit()
        session.refresh(meta_info)
        return meta_info
    except Exception as e:
        raise e


def update_meta_info(session: Session, user_id: uuid.UUID, track_id: uuid.UUID):
    try:
        session.query(models.UserMetadata).filter(
            models.UserMetadata.user_id == user_id
        ).update({"track_id": track_id})
        session.commit()
    except Exception as e:
        raise e
