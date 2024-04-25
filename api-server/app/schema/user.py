import uuid
from pydantic import BaseModel, EmailStr
from enum import Enum


class Gender(Enum):
    male = "male"
    female = "female"
    other = "other"


class UserSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


class UserDetailResponse(UserSimpleResponse):
    email: EmailStr


class UserLogInForm(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool


class UserRegisterForm(BaseModel):
    email: EmailStr
    password: str
    name: str
    # gender: Gender


class UserRegisterResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    name: str


class UserLogInResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    name: str
    token: str
