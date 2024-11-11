from sqlalchemy import create_engine
import logging

# Definir las variables de entorno directamente
POSTGRES_PASSWORD = '123456'
CONTAINER_NAME = 'SEDECODE'
POSTGRES_USER = 'postgres'
POSTGRES_DB = 'sedecode'
POSTGRES_PORT = '5431'
POSTGRES_HOST = 'localhost'  # Asegúrate de definir el host, puede ser 'localhost' o la IP del contenedor


def connection():
    """
    Establishes a connection to a PostgreSQL database using SQLAlchemy.

    Returns:
        Engine: A SQLAlchemy database engine connected to Postgresql.
    """

    try:
        # Usar las variables definidas directamente en el código
        engine = create_engine(
            f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}")
        logging.info('Successful connection to the DB.')
        return engine

    except Exception as e:
        logging.error(str(e))


if __name__ == '__main__':
    connection()
