from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.repository.error import IntegrityException, RepositoryError


def insert_album(session: Session, album: models.Album) -> models.Album:
    try:
        session.add(album)
        session.commit()
        session.refresh(album)
        return album
    except IntegrityError:
        session.rollback()
        raise IntegrityException
    except Exception as e:
        session.rollback()
        raise RepositoryError(message=str(e.__class__.__name__))


def get_album_by_id(session: Session, id: uuid.UUID) -> models.Album | None:
    try:
        album = session.get(models.Album, ident=id)
        return album
    except Exception as e:
        raise RepositoryError(message=str(e))


def get_album_by_name(session: Session, name: str) -> models.Album | None:
    try:
        album = session.query(models.Album).filter(models.Album.name == name).first()
        return album
    except Exception as e:
        raise RepositoryError(message=str(e))


def get_all_albums(session: Session) -> list[models.Album]:
    return session.query(models.Album).all()


def delete_album(session: Session, id: uuid.UUID) -> bool:
    session = get_session()
    album = session.get(models.Album, ident=id)
    if album == None:
        return False
    else:
        try:
            session.delete(album)
            session.commit()
            return True
        except Exception as e:
            session.rollback()
            raise e


def find_album_with_name(session: Session, name: str) -> list[models.Album]:
    session = get_session()
    ts_query = func.plainto_tsquery("simple", name)
    albums = (
        session.query(models.Album)
        .filter(func.to_tsvector("simple", models.Album.name).op("@@")(ts_query))
        .all()
    )
    return albums
