from app.model import models
import app.repository.playlist as playlist_repo
from app.repository.repo import get_session
import app.schema.utils as schema_utils
import uuid
from app.schema.playlist import (
    PlaylistDetailResponse,
    PlaylistUploadForm,
    PlaylistUpdateForm,
    PlaylistSimpleResponse,
)

# create, get, update, delete playlist


def create_playlist(upload_form: PlaylistUploadForm) -> PlaylistDetailResponse:
    session = get_session()
    playlist = models.Playlist(name=upload_form.name, user_id=upload_form.user_id)
    playlist = playlist_repo.create_playlist(playlist=playlist, session=session)
    response = schema_utils.playlist_model_to_detail_response(playlist)
    session.close()
    return response


def get_playlist_by_id(id: uuid.UUID) -> PlaylistDetailResponse:
    session = get_session()
    playlist = playlist_repo.get_playlist_by_id(id, session)
    session.close()
    return playlist


def get_playlist_by_name(id: uuid.UUID) -> PlaylistDetailResponse:
    session = get_session()
    playlist = playlist_repo.get_playlist_by_name(id=id, sesion=session)
    session.close()
    return playlist


def get_all_playlists_belong_to_user(
    user_id: uuid.UUID,
) -> list[PlaylistSimpleResponse]:
    session = get_session()
    playlists = playlist_repo.get_all_playlists_belong_to_user(
        session=session, user_id=user_id
    )
    response = [
        schema_utils.playlist_model_to_simple_response(playlist)
        for playlist in playlists
    ]
    session.close()
    return response


def get_all_playlists() -> list[PlaylistSimpleResponse]:
    session = get_session()
    playlists = playlist_repo.get_all_playlists(session)
    response = [
        schema_utils.playlist_model_to_simple_response(playlist)
        for playlist in playlists
    ]
    session.close()
    return response


def update_playlist(update_form: PlaylistUpdateForm) -> PlaylistDetailResponse:
    session = get_session()
    # playlist = playlist_repo
    session.close()
    pass


def delete_playlist_by_id(id: uuid.UUID):
    session = get_session()
    playlist_repo.delete_playlist(id, session)
    session.close()


def find_playlist_with_name(name: str) -> list[PlaylistSimpleResponse]:
    session = get_session()
    response = playlist_repo.find_playlist_with_name(name, session)
    return response
