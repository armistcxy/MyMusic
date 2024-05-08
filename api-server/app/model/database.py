from sqlalchemy import create_engine, event, Engine
from app.model.config import load_db_config
import sqlalchemy
import logging
import time


def init_engine() -> sqlalchemy.Engine:
    db_config = load_db_config()
    engine = create_engine(
        url=db_config.dsn,
        pool_size=db_config.pool_size,
        max_overflow=db_config.conn_timeout,
        pool_timeout=db_config.conn_timeout,
        # echo=db_config.log_enable,
    )
    return engine


# get the idea about using config at debug level from https://github.com/Netflix/dispatch/blob/master/src/dispatch/database/core.py
# actually I already logged using echo=True when create engine, but for the sake of simplicity
# use logging library may be a better choice
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


@event.listens_for(Engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    conn.info.setdefault("query_start_time", []).append(time.time())
    logger.debug("Start Query: %s", statement)


@event.listens_for(Engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    total = time.time() - conn.info["query_start_time"].pop(-1)
    logger.debug("Query complete!")
    logger.debug("Total time: %f", total)


# more simple way
# import logging
# logging.basicConfig()
# logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
