from app.model import models
import app.repository.album as album_repo
from app.repository.repo import get_session
import app.schema.utils as schema_utils
import uuid
from app.schema.album import (
    AlbumDetailResponse,
    AlbumUploadForm,
    AlbumUpdateForm,
    AlbumSimpleResponse,
)
import app.repository.artist as artist_repo

# create, get, update, delete album


def insert_album(upload_form: AlbumUploadForm) -> AlbumDetailResponse:
    session = get_session()

    artists = [
        artist_repo.get_artist_by_id(session=session, id=artist_id)
        for artist_id in upload_form.artists_id
    ]
    album = models.Album(name=upload_form.name, artists=artists)
    album = album_repo.insert_album(session=session, album=album)
    response = schema_utils.album_model_to_detail_response(album)
    session.close()
    return response


def get_album_by_id(id: uuid.UUID) -> AlbumDetailResponse | None:
    session = get_session()
    album = album_repo.get_album_by_id(session=session, id=id)
    response = schema_utils.album_model_to_detail_response(album)
    session.close()
    return response


def get_album_by_name(name: str) -> AlbumDetailResponse | None:
    session = get_session()
    album = album_repo.get_album_by_name(session=session, name=name)
    session.close()
    return album


def get_all_albums() -> list[AlbumSimpleResponse]:
    session = get_session()
    albums = album_repo.get_all_albums(session)
    session.close()
    response = [schema_utils.album_model_to_simple_response(album) for album in albums]
    return response


def update_album(update_form: AlbumUpdateForm) -> AlbumDetailResponse:
    session = get_session()
    # album = album_repo
    session.close()
    pass


def delete_album_by_id(id: uuid.UUID):
    session = get_session()
    album_repo.delete_album(id)
    session.close()


def find_album_with_name(name: str) -> list[AlbumSimpleResponse]:
    session = get_session()
    albums = album_repo.find_album_with_name(session=session, name=name)
    response = [schema_utils.album_model_to_simple_response(album) for album in albums]
    session.close()
    return response
