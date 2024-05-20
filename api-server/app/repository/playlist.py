from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func, text
from sqlalchemy.orm import Session
from app.repository.error import RepositoryError
import app.repository.track as track_repo
import logging

logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


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
    playlist = session.get(models.Playlist, ident=id)
    if playlist == None:
        return False
    else:
        session.delete(playlist)
        session.commit()
        return True


def find_playlist_with_name(name: str, session: Session) -> list[models.Playlist]:
    ts_query = func.plainto_tsquery("simple", name)
    playlists = (
        session.query(models.Playlist)
        .filter(func.to_tsvector("simple", models.Playlist.name).op("@@")(ts_query))
        .all()
    )
    return playlists


def change_playlist_name(session: Session, new_name: str | None, id: uuid.UUID):
    if new_name:
        result = (
            session.query(models.Playlist)
            .filter(models.Playlist.id == id)
            .update({models.Playlist.name: new_name})
        )
        if result == 1:
            session.commit()
        else:
            session.rollback()
            raise RepositoryError(message="Fault happen when modifying playlist's name")


def remove_track_from_playlist(
    session: Session, playlist_id: uuid.UUID, remove_track_id_list: list[uuid.UUID]
):
    # raw_sql_query = """
    #     DELETE * FROM "tracks-playlists"
    #     WHERE playlist_id=:playlist_id AND track_id IN (:remove_track_id_list)"""

    # params = {
    #     "playlist_id": playlist_id,
    #     "remove_track_id_list": set(remove_track_id_list),
    # }
    # session.execute(statement=raw_sql_query, params=params)
    # session.commit()
    playlist = get_playlist_by_id(id=playlist_id, session=session)
    for track_id in remove_track_id_list:
        playlist.tracks.remove(track_repo.get_track_by_id(id=track_id, session=session))
    session.commit()


def add_track_into_playlist(
    session: Session, playlist_id: uuid.UUID, add_track_id_list: list[uuid.UUID]
):
    # raw_sql_query = """INSERT INTO "tracks-playlists" (track_id, playlist_id)
    #     VALUES(:track_id, :playlist_id)
    # """

    # data = [
    #     {"track_id": track_id, "playlist_id": playlist_id}
    #     for track_id in add_track_id_list
    # ]
    # for params in data:
    #     session.execute(text(raw_sql_query), params=params)
    playlist = get_playlist_by_id(id=playlist_id, session=session)
    for track_id in add_track_id_list:
        playlist.tracks.append(track_repo.get_track_by_id(id=track_id, session=session))
    # this could lead to N + 1 problems, but just ignore this, I will find out the solution later
    session.commit()


def update_track_in_playlist(
    session: Session, playlist_id: uuid.UUID, track_id_list: list[uuid.UUID]
):
    logger.info("function has been called")
    playlist = get_playlist_by_id(session=session, id=playlist_id)
    current_tracks = playlist.tracks

    remove_track_id_list = []
    current_tracks_id = set()
    for track in current_tracks:
        if track.id not in track_id_list:
            remove_track_id_list.append(track.id)
        current_tracks_id.add(track.id)

    logger.info([track.id for track in current_tracks])
    logger.info(remove_track_id_list)
    logger.info("hi")
    if len(remove_track_id_list) > 0:
        remove_track_from_playlist(
            session=session,
            playlist_id=playlist_id,
            remove_track_id_list=remove_track_id_list,
        )

    add_track_id_list = []
    for track_id in track_id_list:
        if track_id not in current_tracks_id:
            add_track_id_list.append(track_id)

    if len(add_track_id_list) > 0:
        add_track_into_playlist(
            session=session,
            playlist_id=playlist_id,
            add_track_id_list=add_track_id_list,
        )
