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
