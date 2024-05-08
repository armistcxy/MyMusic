from pydantic import BaseModel, EmailStr
from enum import Enum


class RegisterType(str, Enum):
    user = "user"
    admin = "admin"
    artist = "artist"


class RegisterForm(BaseModel):
    name: str
    email: EmailStr
    password: str
    type: RegisterType


class LogInForm(BaseModel):
    email: EmailStr
    password: str
