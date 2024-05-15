from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


def create_playlist(playlist: models.Playlist, session: Session) -> models.Playlist:
    session.add(playlist)
    session.commit()
    session.refresh(playlist)
    return playlist


def get_playlist_by_id(id: uuid.UUID, session: Session) -> models.Playlist:
    playlist = session.get(models.Playlist, ident=id)
    return playlist


def get_playlist_by_name(name: str, session: Session) -> models.Playlist:
    return session.query(models.Playlist).filter(models.Playlist.name == name).first()


def get_all_playlists_belong_to_user(
    session: Session, user_id: uuid.UUID
) -> list[models.Playlist]:
    return (
        session.query(models.Playlist).filter(models.Playlist.user_id == user_id).all()
    )


def get_all_playlists(session: Session) -> list[models.Playlist]:
    return session.query(models.Playlist).all()


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
