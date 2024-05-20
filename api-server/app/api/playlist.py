from fastapi import APIRouter, Depends, HTTPException, status
from app.schema.playlist import (
    PlaylistDetailResponse,
    PlaylistSimpleResponse,
    PlaylistUploadForm,
    PlaylistModifyForm,
)
import app.service.playlist as playlist_service
import uuid
from app.api.auth import security
import app.model.models as models
from authx import TokenPayload

playlist_router = APIRouter(prefix="/playlists", tags=["Playlist"])


@playlist_router.post(
    "/",
    response_model=PlaylistDetailResponse,
    dependencies=[Depends(security.access_token_required)],
)
def create_playlist(
    upload_form: PlaylistUploadForm,
    payload: TokenPayload = Depends(security.access_token_required),
):
    try:
        user_id = getattr(payload, "sub")
        user_id = uuid.UUID(user_id, version=4)
        upload_form.user_id = user_id
        response = playlist_service.create_playlist(upload_form)
        return response
    except AttributeError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="must login to operate this method",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@playlist_router.get(
    "/me",
    response_model=list[PlaylistSimpleResponse],
    dependencies=[Depends(security.access_token_required)],
)
def get_all_playlists_belong_to_user(
    payload: TokenPayload = Depends(security.access_token_required),
):
    try:
        user_id = getattr(payload, "sub")
        user_id = uuid.UUID(user_id, version=4)
        response = playlist_service.get_all_playlists_belong_to_user(user_id=user_id)
        return response
    except AttributeError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="must login to operate this method",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@playlist_router.get("/", response_model=list[PlaylistSimpleResponse])
def get_all_playlists():
    response = playlist_service.get_all_playlists()
    return response


@playlist_router.get("/{id}", response_model=PlaylistDetailResponse)
def get_playlist_by_id(id: uuid.UUID):
    response = playlist_service.get_playlist_by_id(id)
    return response


@playlist_router.get("/find/{name}", response_model=list[PlaylistSimpleResponse])
def find_playlist_with_name(name: str):
    response = playlist_service.find_playlist_with_name(name)
    return response


@playlist_router.delete("/{id}", dependencies=[Depends(security.access_token_required)])
def delete_playlist_by_id(
    id: uuid.UUID, payload: TokenPayload = Depends(security.access_token_required)
):
    try:
        user_id = getattr(payload, "sub")
        user_id = uuid.UUID(user_id, version=4)
        playlist_response = playlist_service.get_playlist_by_id(id=id)

        if playlist_response.user.id != str(user_id):
            raise HTTPException(
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                detail=f"User {user_id} have no right to modify playlist {id}",
            )
        else:
            playlist_service.delete_playlist_by_id(id)
    except AttributeError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@playlist_router.patch(
    "/{playlist_id}", dependencies=[Depends(security.access_token_required)]
)
def modify_track_in_playlist(
    playlist_id: uuid.UUID,
    modify_form: PlaylistModifyForm,
    payload: TokenPayload = Depends(security.access_token_required),
):
    rename = modify_form.rename
    track_id_list = modify_form.track_id_list
    try:
        user_id = getattr(payload, "sub")
        user_id = uuid.UUID(user_id, version=4)
        playlist_response = playlist_service.get_playlist_by_id(id=playlist_id)

        if playlist_response.user.id != str(user_id):
            raise HTTPException(
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                detail=f"User {user_id} have no right to modify playlist {playlist_id}",
            )
        if rename:
            playlist_service.change_playlist_name(new_name=rename, id=playlist_id)
        if track_id_list is not None:
            playlist_service.update_track_in_playlist(
                playlist_id=playlist_id, track_id_list=track_id_list
            )
    except AttributeError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="must login to operate this method}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
