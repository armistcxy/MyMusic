from app.model import models
from app.repository.repo import get_session
import app.schema.utils as schema_utils
import app.repository.user as user_repo
from app.schema.user import (
    UserDetailResponse,
    UserRegisterForm,
    UserLogInForm,
    UserSimpleResponse,
    UserLogInResponse,
)
import uuid
import bcrypt


def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()
    # don't need to store salt, only need to store hash password
    hash_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hash_password


def check_password(password: str, hash_password: bytes) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hash_password)


def get_all_users() -> list[UserSimpleResponse]:
    session = get_session()
    users = user_repo.get_all_users(session)
    response = []
    for user in users:
        response.append(schema_utils.user_model_to_simple_response(user))
    session.close()

    return response


def get_user_by_id(id: uuid.UUID) -> list[UserDetailResponse]:
    session = get_session()
    user = user_repo.get_user_by_id(id, session)
    response = schema_utils.user_model_to_detail_response(user)
    session.close()
    return response


def register_user(register_form: UserRegisterForm) -> UserDetailResponse:
    session = get_session()

    password_to_store = hash_password(register_form.password)

    user = models.User(
        email=register_form.email,
        username=register_form.name,
        password=password_to_store,
    )

    user = user_repo.insert_user(user, session)
    response = schema_utils.user_model_to_detail_response(user)
    session.close()

    return response


def login_user(login_form: UserLogInForm) -> UserLogInResponse:
    pass
