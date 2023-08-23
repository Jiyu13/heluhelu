from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS

import json
import os
with open('config.json') as config_file:
    database_uri = json.load(config_file)

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri.get('SQLALCHEMY_DATABASE_URI')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
if app.debug:
    app.config['SESSION_COOKIE_SECURE'] = False
    app.config['SESSION_COOKIE_DOMAIN'] =  "127.0.0.1"
else:
    app.config['SESSION_COOKIE_DOMAIN'] = ".heluhe.lu"
app.config['CORS_ALLOW_HEADERS'] = ['Content-Type']
app.config['CORS_ORIGINS'] = ["https://heluhe.lu"]
app.json.compact = False
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

CORS(app, supports_credentials=True)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)
