from typing import Any


class IntegrityException(Exception):
    """Duplicate value when try to add value into table"""

    def __init__(self):
        self.message = "Duplicate value when try to add value into table"

    def __str__(self):
        return self.message


class RepositoryError(Exception):
    """Error occurs when operating with database"""

    def __init__(self, message):
        self.message = message

    def __str__(self):
        return str(self.message)


class NotFoundError(Exception):
    """The instance looking for is not exist"""

    def __init__(self, type: str, additional_info: Any):
        self.type = type
        self.additional_info = additional_info

    def __str__(self):
        msg = f"The instance looking for is not exist\nobject type:{self.type}"
        if self.additional_info is not None:
            msg = f"{msg}\n{str(self.additional_info)}"
        return msg
