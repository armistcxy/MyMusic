from fastapi import Response
from pydantic import BaseModel


class ErrorResponse(BaseModel, Response):
    message: str
