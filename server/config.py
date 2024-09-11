from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS
from flask_mail import Mail
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import local_config

import json
import os
with open('config.json') as config_file:
    database_uri = json.load(config_file)

app = Flask(__name__)
app.secret_key = local_config.SECRET_KEY
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri.get('SQLALCHEMY_DATABASE_URI')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
if app.debug:
    app.config['SESSION_COOKIE_SECURE'] = False
    app.config['SESSION_COOKIE_DOMAIN'] =  "127.0.0.1"
    app.config['RESET_PW_URL'] = database_uri.get('DEBUG_RESET_PW_URL')
else:
    app.config['SESSION_COOKIE_DOMAIN'] = ".heluhe.lu"
    app.config['RESET_PW_URL'] = database_uri.get('PRODUCTION_RESET_PW_URL')
app.config['CORS_ALLOW_HEADERS'] = ['Content-Type']
app.config['CORS_ORIGINS'] = ["https://heluhe.lu"]


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = database_uri.get('MAIL_PORT')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = database_uri.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = database_uri.get('MAIL_PASSWORD')


app.json.compact = False
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

CORS(app, resources={r"/*": {"origins": ["https://heluhe.lu"]}}, supports_credentials=True)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

mail = Mail(app)
jwt = JWTManager(app)
