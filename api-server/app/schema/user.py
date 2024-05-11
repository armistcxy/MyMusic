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
    id: uuid.UUID
    username: str


class UserDetailResponse(UserSimpleResponse):
    email: EmailStr


class UserLogInForm(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool


class UserRegisterForm(RegisterForm):
    type: Final = "user"


class UserRegisterResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    name: str


class UserLogInResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    name: str
    token: str


class UserLogInResult(BaseModel):
    id: uuid.UUID | None = None
    email: EmailStr | None = None
    name: str | None = None
    success: bool
