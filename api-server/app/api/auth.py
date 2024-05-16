from authx import AuthX, AuthXConfig
import app.model.models as models
import app.service.user as user_service
import uuid
import os


auth_config = AuthXConfig()
auth_config.JWT_SECRET_KEY = os.environ.get("SECRET_KEY", "secret_key")
auth_config.JWT_TOKEN_LOCATION = ["headers", "query", "cookies", "json"]
security = AuthX(config=auth_config)


@security.set_subject_getter
def get_user_from_uid(uid: str) -> models.User:
    id = uuid.UUID(uid.strip(), version=4)
    return user_service.get_user_by_id(id)
