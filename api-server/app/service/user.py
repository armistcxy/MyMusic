from app.model import models
from app.repository.general import Repo
from app.repository.repo import get_session
import app.schema.utils as schema_utils
from app.schema.user import (
    UserDetailResponse,
    UserRegisterForm,
    UserSignInForm,
    UserSimpleResponse,
)
import uuid


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
        
        