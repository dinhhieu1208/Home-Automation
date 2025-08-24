from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    mongo_uri: str = Field(default="mongodb://localhost:27017", env="MONGO_URI")
    mongo_db: str = Field(default="smarthome_db", env="MONGO_DB")

    secret_key: str = Field(default="default-secret", env="SECRET_KEY")
    jwt_secret: str = Field(default="default-jwt-secret", env="JWT_SECRET")
    jwt_algorithm: str = Field(default="HS256", env="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=1440, env="ACCESS_TOKEN_EXPIRE_MINUTES")

    server_host: str = Field(default="127.0.0.1", env="SERVER_HOST")
    server_port: int = Field(default=8000, env="SERVER_PORT")

    mqtt_broker: str = Field(default="localhost", env="MQTT_BROKER")
    mqtt_port: int = Field(default=1883, env="MQTT_PORT")

    class Config:
        env_file = ".env"

settings = Settings()
