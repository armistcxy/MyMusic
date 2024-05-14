from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


def insert_artist(session: Session, artist: models.Artist) -> models.Artist:
    session.add(artist)
    session.commit()
    session.refresh(artist)
    return artist


def get_artist_by_id(session: Session, id: uuid.UUID) -> models.Artist:
    artist = session.get(models.Artist, ident=id)
    return artist


def get_artist_by_name(session: Session, name: str) -> models.Artist:
    return session.query(models.Artist).where(models.Artist.name == name).first()


def delete_artist(session: Session, id: uuid.UUID) -> bool:
    artist = session.get(models.Artist, ident=id)
    if artist == None:
        return False
    else:
        session.delete(artist)
        session.commit()
        return True


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
