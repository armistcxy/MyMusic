from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.repository.error import IntegrityException, RepositoryError


def insert_artist(session: Session, artist: models.Artist) -> models.Artist:
    try:
        session.add(artist)
        session.commit()
        session.refresh(artist)
        return artist
    except IntegrityError:
        session.rollback()
        raise IntegrityException
    except Exception as e:
        session.rollback()
        raise RepositoryError(message=str(e.__class__.__name__))


def get_artist_by_id(session: Session, id: uuid.UUID) -> models.Artist:
    try:
        artist = session.get(models.Artist, ident=id)
        return artist
    except Exception as e:
        raise RepositoryError(message=str(e))


def get_artist_by_name(session: Session, name: str) -> models.Artist:
    try:
        artist = session.query(models.Artist).where(models.Artist.name == name).first()
        return artist
    except Exception as e:
        raise RepositoryError(message=str(e))


def delete_artist(session: Session, id: uuid.UUID) -> bool:
    artist = session.get(models.Artist, ident=id)
    if artist == None:
        return False
    else:
        try:
            session.delete(artist)
            session.commit()
            return True
        except Exception as e:
            session.rollback()
            raise e


def find_artist_with_name(session: Session, name: str) -> list[models.Artist]:
    ts_query = func.plainto_tsquery("simple", name)
    artists = (
        session.query(models.Artist)
        .filter(func.to_tsvector("simple", models.Artist.name).op("@@")(ts_query))
        .all()
    )
    return artists


def get_all_artists(session: Session) -> list[models.Artist]:
    artists = session.query(models.Artist).all()
    return artists
