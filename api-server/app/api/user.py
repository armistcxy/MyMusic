from fastapi import APIRouter, HTTPException, Depends, Body
import uuid
from app.api.auth import security
from pydantic import BaseModel
from app.schema.user import UserRegisterForm, UserLogInForm
import app.service.user as user_service
from starlette.responses import RedirectResponse
from authx import TokenPayload, RequestToken
import app.model.models as models

user_router = APIRouter(prefix="/users", tags=["User"])


@user_router.post("/register")
def register_user(register_form: UserRegisterForm):
    response = user_service.register_user(register_form=register_form)
    return response


@user_router.post("/login")
def login_user(login_form: UserLogInForm):
    result = user_service.login_user(login_form=login_form)
    if not result.success:
        raise HTTPException(401, detail={"message": "Bad credentials"})

    token = security.create_access_token(uid=str(result.id), id=str(result.id), age=22)
    return {"access_token": token}


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
    pass


@user_router.get("/search/{name}")
def find_users_with_name(name: str):
    pass


@user_router.delete("/{id}")
def delete_user(id: uuid.UUID):
    pass
