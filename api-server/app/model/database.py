from sqlalchemy import create_engine
from model.config import load_db_config
import sqlalchemy


def init_engine() -> sqlalchemy.Engine:
    db_config = load_db_config()
    engine = create_engine(
        url=db_config.dsn,
        pool_size=db_config.pool_size,
        max_overflow=db_config.conn_timeout,
        pool_timeout=db_config.conn_timeout,
        echo=db_config.log_enable,
    )
    return engine
