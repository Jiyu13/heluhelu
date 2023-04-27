from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt
import string

class Dictionary(db.Model, SerializerMixin):
    __tablename__ = 'dictionaries'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    # is_enabled = db.Column(db.Boolean)  # check whether a dictionary is active or not

    # a dictionary belongs to a user, many to one
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # a dict has many words
    dict_words = db.relationship("DictionaryWord", backref="dictionary")

    serialize_rules = ("-user", "-dict_words")

    def __repr__(self):
        return f'''<Hawaiian {self.id}: title-{self.title}>\n'''


class DictionaryWord(db.Model, SerializerMixin):
    __tablename__ = "dictionary_words"

    id = db.Column(db.Integer, primary_key=True)
    hawaiian = db.Column(db.String, nullable=False)
    hawaiian_clean = db.Column(db.String)

    translation = db.Column(db.String)

    # a word belongs to a dictionary, many to one
    dictionary_id = db.Column(db.Integer, db.ForeignKey("dictionaries.id"))

    serialize_rules = ('-dictionary',)


class Article(db.Model, SerializerMixin):
    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String, unique=True, nullable=False)
    title = db.Column(db.String, nullable=False)
    text = db.Column(db.String, nullable=False)
    check_finished = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    update_at = db.Column(db.DateTime, server_default=db.func.now())
    
    # many-to-many
    user_articles = db.relationship("UserArticle", backref="article")
    users = association_proxy("user_articles", "user")

    serialize_rules = ('-user', "-user_articles.user", '-user_articles.article',)

    def __repr__(self):
        return f'''<Article {self.id, self.uuid} -> {self.title}; <{self.update_at}>\n'''


class UserArticle(db.Model, SerializerMixin):
    __tablename__ = "user_articles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    article_id = db.Column(db.Integer, db.ForeignKey("articles.id"))
    current_page = db.Column(db.Integer, default=0)

    serialize_rules = ('-user.user_articles', '-article.user_articles',)

    def __repr__(self):
        return f'''<UserArticle {self.id} -> user_id: {self.user_id}; article_id: {self.article_id}; current_page: {self.current_page}>'''


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    # one-to-many: a user has many dictionaries and articles
    dictionaries = db.relationship("Dictionary", backref="user")
    articles = db.relationship("Article", backref="user")
    page_read_events = db.relationship("PageReadEvent", backref="user")

    # one-to-many: a user has many saved words, vocabularies
    words = db.relationship("UserWord", backref="user")
    vocabularies = db.relationship("Vocabulary", backref="user")

    # many-to-manny:
    user_articles = db.relationship("UserArticle", backref="user")
    articles = association_proxy("user_articles", 'article')

    serialize_rules = ('-dictionaries', "-articles", "-user_articles", "-vocabularies", '-page_read_events', "-words", "-_password_hash")

    # ================= password validation ==========================================
    @validates('_password_hash')
    def validate_password(self, key, _password_hash):
        cap_alphabets = list(string.ascii_uppercase)
        special_characters = list(string.punctuation)
        if not len(_password_hash) >= 8: 
            raise ValueError("Password must be at least 8 characters long.")
        if not any(each in cap_alphabets for each in _password_hash):
            raise ValueError("Password must contain at least one capitalised character.")
        if not any(each in special_characters for each in _password_hash):
            raise ValueError("Password must contain at least one of these characters: " + string.punctuation)
        return _password_hash

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


class UserWord(db.Model, SerializerMixin):
    __tablename__ = "user_words"

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String, nullable=False)
    translation = db.Column(db.String, nullable=False)

    # a user has many saved words
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = ('-user',)

    def __repr__(self):
            return f'''<Word {self.id}: word-{self.word}>, {self.translation}; user-{self.user_id}\n'''


class PageReadEvent(db.Model, SerializerMixin):
    __tablename__ = "page_read_events"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, server_default=db.func.now())
    words_read = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = ('-user', "-article")

    def __repr__(self):
            return f'''<PageRead {self.id}: date-{self.date}>, {self.words_read}; user-{self.user_id}>\n'''


class Vocabulary(db.Model, SerializerMixin):
    """status -> 1: studying; 2: known; 3: ignored"""
    __tablename__ = "vocabularies"

    id = db.Column(db.Integer, primary_key=True)
    hawaiian_clean = db.Column(db.String)
    status = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # serialize_rules = ("-user")

    def __repr__(self):
        return f"""<Vocab {self.id}; hawaiian_clean: {self.hawaiian_clean}; status: {self.status}; user: {user_id}>\n"""