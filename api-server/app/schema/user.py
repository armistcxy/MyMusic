import uuid
from pydantic import BaseModel, EmailStr
from enum import Enum
from app.schema.auth import RegisterForm
from typing import Final


class Gender(Enum):
    male = "male"
    female = "female"
    other = "other"


class UserSimpleResponse(BaseModel):
    id: str
    username: str


class UserDetailResponse(UserSimpleResponse):
    email: EmailStr


class UserLogInForm(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class UserRegisterForm(RegisterForm):
    type: Final = "user"


class UserRegisterResponse(BaseModel):
    id: str
    email: EmailStr
    name: str


class UserLogInResponse(BaseModel):
    id: str
    email: EmailStr
    name: str
    token: str


class UserLogInResult(BaseModel):
    id: str | None = None
    email: EmailStr | None = None
    name: str | None = None
    success: bool


class MetaData(BaseModel):
    current_track_id: str | None = None
    user_id: str | None = None
