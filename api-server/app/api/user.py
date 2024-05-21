from fastapi import APIRouter, HTTPException, Depends, Body, status
import uuid
from app.api.auth import security
from pydantic import BaseModel
from app.schema.user import UserRegisterForm, UserLogInForm, UserDetailResponse
import app.service.user as user_service
from starlette.responses import RedirectResponse
from authx import TokenPayload, RequestToken
import app.model.models as models
from fastapi.responses import JSONResponse
from app.schema.track import TrackResponse

user_router = APIRouter(prefix="/users", tags=["User"])


@user_router.post(
    "/register",
    responses={
        status.HTTP_201_CREATED: {"model": UserDetailResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {},
    },
)
def register_user(register_form: UserRegisterForm):
    try:
        response = user_service.register_user(register_form=register_form)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED, content=response.model_dump()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@user_router.post("/login")
def login_user(login_form: UserLogInForm):
    result = user_service.login_user(login_form=login_form)
    if not result.success:
        raise HTTPException(401, detail={"message": "Bad credentials"})

    access_token = security.create_access_token(uid=str(result.id), fresh=True)
    refresh_token = security.create_refresh_token(
        uid=str(result.id), data={"id": result.id}
    )
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@user_router.post("/refresh")
def refresh(refresh_payload: TokenPayload = Depends(security.refresh_token_required)):
    access_token = security.create_access_token(
        refresh_payload.sub,
        fresh=False,
    )
    return JSONResponse(
        content={"access_token": access_token}, status_code=status.HTTP_201_CREATED
    )


@user_router.get("/whoami")
def whoami(user: models.User = Depends(security.get_current_subject)):
    return f"You are: {user.username}"


@user_router.get("/profile", dependencies=[Depends(security.access_token_required)])
def get_user_by_id(payload: TokenPayload = Depends(security.access_token_required)):
    id = getattr(payload, "sub")
    try:
        id = uuid.UUID(id, version=4)
        response = user_service.get_user_by_id(id)
        return response
    except Exception as e:
        raise HTTPException(401, detail={"message": str(e)})


@user_router.get("/")
def get_all_users():
    response = user_service.get_all_users()
    return response


@user_router.delete(
    "/profile/delete", dependencies=[Depends(security.access_token_required)]
)
def delete_user(payload: TokenPayload = Depends(security.access_token_required)):
    id = getattr(payload, "sub")
    try:
        id = uuid.UUID(id, version=4)
        user_service.delete_user_by_id(id)
    except Exception as e:
        raise HTTPException(401, detail={"message": str(e)})


@user_router.get(
    "/me/last",
    dependencies=[Depends(security.access_token_required)],
    response_model=TrackResponse,
)
def get_last_play_track(
    payload: TokenPayload = Depends(security.access_token_required),
):
    id = getattr(payload, "sub")
    try:
        id = uuid.UUID(id, version=4)
        track_response = user_service.get_current_track(id=id)
        return track_response
    except Exception as e:
        raise HTTPException(401, detail={"message": str(e)})


@user_router.put(
    "/me/now/{track_id}", dependencies=[Depends(security.access_token_required)]
)
def update_last_play_track(
    track_id: uuid.UUID,
    payload: TokenPayload = Depends(security.access_token_required),
):
    id = getattr(payload, "sub")
    try:
        id = uuid.UUID(id, version=4)
        meta = user_service.update_current_track(user_id=id, track_id=track_id)
        return meta
    except Exception as e:
        raise HTTPException(401, detail={"message": str(e)})
