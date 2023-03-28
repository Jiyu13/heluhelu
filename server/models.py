from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


class Hawaiian(db.Model, SerializerMixin):
    __tablename__ = 'hawaiians'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String, nullable=False)
    translation = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'''<Hawaiian {self.id}: word-{self.word}; translation-{self.translation}>\n'''


class Article(db.Model, SerializerMixin):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)

    def __repr__(self):
        return f'''<Article {self.id}: text: {self.text}>'''
