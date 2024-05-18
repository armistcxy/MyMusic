from app.model import models
from app.repository.repo import get_session
import app.schema.utils as schema_utils
import app.repository.user as user_repo
import app.repository.meta as meta_repo
from app.schema.user import (
    UserDetailResponse,
    UserRegisterForm,
    UserLogInForm,
    UserSimpleResponse,
    UserLogInResponse,
    UserLogInResult,
    MetaData,
)
from app.service.track import get_track_by_id
from app.schema.track import TrackResponse
import uuid
import bcrypt


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    # don't need to store salt, only need to store hash password
    hash_password = bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")
    return hash_password


def check_password(password: str, hash_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hash_password.encode("utf-8"))


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
    user = user_repo.get_user_by_id(session=session, id=id)
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


def login_user(login_form: UserLogInForm) -> UserLogInResult:
    session = get_session()
    email = login_form.email
    password = login_form.password
    user = user_repo.get_user_by_email(session=session, email=email)
    result = UserLogInResult(success=True)
    if user is None or not check_password(password, user.password):
        result.success = False
        session.close()
        return result

    result.id = user.id
    result.name = user.username
    result.email = email
    session.close()

    return result


def delete_user_by_id(id: uuid.UUID):
    session = get_session()
    user_repo.delete_user_by_id(id=id, session=session)
    session.close()


def get_current_track(id: uuid.UUID) -> TrackResponse | None:
    try:
        session = get_session()
        meta_info = meta_repo.get_meta_info(session=session, user_id=id)
        if meta_info is None:
            raise Exception("there's no current track")
        track_id = meta_info.track_id
        session.close()
        return get_track_by_id(id=track_id)
    except Exception as e:
        raise e


def update_current_track(user_id: uuid.UUID, track_id: uuid.UUID) -> MetaData:
    try:
        session = get_session()
        if meta_repo.get_meta_info(session=session, user_id=user_id) is None:
            meta_repo.create_meta_info(
                session=session, user_id=user_id, track_id=track_id
            )
        else:
            meta_repo.update_meta_info(
                session=session, user_id=user_id, track_id=track_id
            )
        session.close()

        response = MetaData(current_track_id=str(track_id), user_id=str(user_id))
        return response
    except Exception as e:
        session.rollback()
        raise e
