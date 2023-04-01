from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt


class Dictionary(db.Model, SerializerMixin):
    __tablename__ = 'dictionaries'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    # is_enabled = db.Column(db.Boolean)  # check whether a dictionary is active or not 

    # a dictionary belongs to a user, many to one
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # a dict has many words
    words = db.relationship("Word", backref="dictionary")

    def __repr__(self):
        return f'''<Hawaiian {self.id}: title-{self.title}>\n'''


class Word(db.Model, SerializerMixin):
    __tablename__ = "words"

    id = db.Column(db.Integer, primary_key=True)
    hawaiian = db.Column(db.String, nullable=False)
    translation = db.Column(db.String)

    # a word belongs to a dictionary, many to one
    dictionary_id = db.Column(db.Integer, db.ForeignKey("dictionaries.id"))


class Article(db.Model, SerializerMixin):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)

    check_finished = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    # is_reading = db.Column(db.Boolean)
    # update_at = db.Column(db.DateTime onupdate=db.func.now())  # sort by last open

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f'''<Article {self.id} -> {self.title}: text: {self.text}>'''


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    # a user has many dictionaries and articles
    dictionaries = db.relationship("Dictionary", backref="user")
    articles = db.relationship("Article", backref="user")

    # ================= incorporate bcrypt to create a secure password. ====================
    @hybrid_property
    def password_hash(self):
        # Attempts to access the password_hash should be met with an AttributeError.
        raise AttributeError("Password hashes may not be accessed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash=bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    def __repr__(self):
        return f"""<User {self.id}; Username: {self.username}.>"""   
