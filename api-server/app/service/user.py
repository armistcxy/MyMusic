from app.model import models
from app.repository.general import Repo
from app.repository.repo import get_session
import app.schema.utils as schema_utils
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


class UserService:
    def __init__(self, repo: Repo):
        self.repo = repo

    def get_all_users(self) -> list[UserSimpleResponse]:
        session = get_session()
        users = self.repo.user_repo.get_all_users(session)
        response = []
        for user in users:
            response.append(schema_utils.user_model_to_simple_response(user))
        session.close()

        return response

    def get_user_by_id(self, id: uuid.UUID) -> list[UserDetailResponse]:
        session = get_session()
        user = self.repo.user_repo.get_user_by_id(id, session)
        response = schema_utils.user_model_to_detail_response(user)
        session.close()
        return response

    def register_user(self, register_form: UserRegisterForm) -> UserDetailResponse:
        session = get_session()

        password_to_store = hash_password(register_form.password)

        user = models.User(
            email=register_form.email,
            username=register_form.name,
            password=password_to_store,
        )

        user = self.repo.user_repo.insert_user(user, session)
        response = schema_utils.user_model_to_detail_response(user)
        session.close()

        return response

    def login_user(self, login_form: UserLogInForm) -> UserLogInResponse:
        pass
