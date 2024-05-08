import yaml


class DatabaseConfig:
    def __init__(self, dsn, pool_size, max_conn, conn_timeout, log_enable):
        self.dsn = dsn
        self.pool_size = pool_size
        self.max_conn = max_conn
        self.conn_timeout = conn_timeout
        self.log_enable = log_enable


def load_db_config() -> DatabaseConfig:
    with open("config.yml", "r") as file:
        reader = yaml.safe_load(file)
        db_reader = reader["database"]
        dsn = db_reader["dsn"]
        pool_size = db_reader["pool_size"]
        max_conn = db_reader["max_conn"]
        conn_timeout = db_reader["conn_timeout"]
        log_enable = db_reader["log_enable"]
        db_config = DatabaseConfig(dsn, pool_size, max_conn, conn_timeout, log_enable)
        return db_config
