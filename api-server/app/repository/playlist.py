from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


def insert_playlist(playlist: models.Playlist, session: Session) -> models.Playlist:
    session.add(playlist)
    session.commit()
    session.refresh(playlist)
    return playlist


def get_playlist_by_id(id: uuid.UUID, session: Session) -> models.Playlist:
    playlist = session.get(models.Playlist, ident=id)
    return playlist


def delete_playlist(id: uuid.UUID, session: Session) -> bool:
    session = get_session()
    playlist = session.get(models.Playlist, ident=id)
    if playlist == None:
        return False
    else:
        session.delete(playlist)
        session.commit()
        return True


def find_playlist_with_name(name: str, session: Session) -> list[models.Playlist]:
    session = get_session()
    ts_query = func.plainto_tsquery("simple", name)
    playlists = (
        session.query(models.Playlist)
        .filter(func.to_tsvector("simple", models.Playlist.name).op("@@")(ts_query))
        .all()
    )
    return playlists
