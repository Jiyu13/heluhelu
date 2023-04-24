#!/usr/bin/env python3
from flask import Flask, make_response, jsonify, request, session
from sqlalchemy.sql.expression import func

from config import app, db, api 
from flask_restful import Resource

from models import db, Dictionary, DictionaryWord, Article, User, UserArticle, UserWord, PageReadEvent, Vocabulary
import re
import uuid
from datetime import datetime, timedelta

class Dictionaries(Resource):
    def get(self):
        dictionaries = Dictionary.query.all()
        dictionaries_dict = jsonify([dictionary.to_dict() for dictionary in dictionaries])
        return make_response(dictionaries_dict, 200)

    def post(self):
        title=request.get_json()["title"]
        user_id=session["user_id"]
        word_translations = request.get_json()["words"].split('\n')

        # ===== for user to upload a dictionary =====
        new_dictionary = Dictionary(
            title=title,
            user_id=user_id
        )
        add.session.add(new_dictionary)
        add.session.commit()

        # ===== add each word in the dictionary to database with dictionary_id =====
        all_words = []
        for each in word_translations:
            w_t = each.split("\t")
            word = w_t[0]
            translation = w_t[1]
            new_word = Word(
                hawaiian=word,
                translation=translation,
                dictionary_id=new_dictionary.id
            )
            all_words.append(new_word)
        add.session.add_all(all_words)
        add.session.commit()
api.add_resource(Dictionaries, '/dictionaries', endpoint="dictionary")


class DictionaryWords(Resource):
    def get(self):
        dict_words = DictionaryWord.query.all()
        words_to_dict = jsonify([word.to_dict() for word in dict_words])
        return make_response(words_to_dict, 200)
api.add_resource(DictionaryWords, '/dictionary_words', endpoint="/dictionary_words")


class DictionariesWordsByWord(Resource):
    def get(self, word):
        # clean_word = ''.join(filter(str.isalpha, word.strip())).lower()
        clean_word = ''.join(filter(str.isalpha, word.strip()))
        # get translation from dictionary_words
        hawaiians = DictionaryWord.query.filter(
                DictionaryWord.hawaiian_clean.istartswith(clean_word)
            ).limit(5)

        # get tranlastion from user_words
        custom_word = UserWord.query.filter_by(word=clean_word, user_id=session["user_id"]).first()

        if custom_word:
            custom_word = custom_word.to_dict()
        
        if hawaiians:
            hawaiian_dict =[hawaiian.to_dict() for hawaiian in hawaiians]
            return make_response(jsonify({
                "dictionary": hawaiian_dict,
                "custom": custom_word
                }
                ), 200)
        
        response = {"message": "This word does not exist in the database, please try again"}
        return make_response(jsonify(response), 404)
api.add_resource(DictionariesWordsByWord, '/search/<string:word>')


class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict = jsonify([user.to_dict() for user in users])
        return make_response(users_dict, 200)
api.add_resource(Users, '/users', endpoint="users")


class Articles(Resource):
    
    def get(self):
        # show artciles belong to current user
        user_id = session["user_id"]
        if user_id:
            user = User.query.filter_by(id=user_id).first()

            # cannot use sort(key=...)????
            articles = sorted(user.articles, key=lambda x: x.update_at,  reverse=True)
            # articles = user.articles
            articles_dict = [article.to_dict() for article in articles]
            return make_response(articles_dict, 200)

    # create Article
    def post(self):
        new_article = Article(
            uuid=str(uuid.uuid4()),
            text=request.get_json()['text'],
            title=request.get_json()["title"],
            check_finished=False,
            # current_reading=False,
        )
        new_article.users.id = session["user_id"]
        db.session.add(new_article)
        db.session.commit()

        # ======= user_articles table ===========================
        user_article = UserArticle(
            user_id=session['user_id'],
            article_id=new_article.id
        )
        db.session.add(user_article)
        db.session.commit()
        # =======================================================

        return make_response(new_article.to_dict(), 201)
api.add_resource(Articles, '/articles', endpoint="articles")


class ArticleSharedByID(Resource):
    def get(self, id):
        article = Article.query.filter_by(id=id).first()
        if not article:
            response_body = {
                "message": "This article does not exist in the database, please try again"
            }
            return make_response(jsonify(response_body), 404)

        return make_response(article.to_dict(), 200)
api.add_resource(ArticleSharedByID, '/article/share/<int:id>')

class UserArticles(Resource):
    def get(self):
        user_articles = UserArticle.query.all()
        user_articles_dict = [user_article.to_dict() for user_article in user_articles]
        return make_response(user_articles_dict, 200)
api.add_resource(UserArticles, '/user_articles', endpoint="user_articles")
    

# deal with adding new user to an article when an article is shared
class UserArticlesByUUID(Resource):
    def post(self, uuid):
        article = Article.query.filter_by(uuid=uuid).first()
        current_user = session["user_id"]

        user_article = UserArticle.query.filter_by(user_id=session["user_id"], article_id=article.id).first()
        if user_article:
            return make_response({"message": "article already exists"}, 409)
        else:
            new_user_article = UserArticle(
                article_id=article.id,
                user_id=current_user
            )
            db.session.add(new_user_article)
            db.session.commit()
            return make_response(new_user_article.to_dict(), 201)
api.add_resource(UserArticlesByUUID, '/user_article/<string:uuid>')


class UserArticleByArticleId(Resource):
    def patch(self, article_id):
        current_user = session["user_id"]
        user_article = UserArticle.query.filter_by(user_id=current_user, article_id=article_id).first()
        user_article.current_page = request.get_json()["current_page"]
        db.session.commit()

        return make_response(user_article.to_dict(), 200)

    def delete(self, article_id):
        current_user = session["user_id"]
        user_article = UserArticle.query.filter_by(user_id=current_user, article_id=article_id).first()
        db.session.delete(user_article)
        db.session.commit()
        return make_response()
api.add_resource(UserArticleByArticleId, '/user_article/<int:article_id>')


class ArticleShared(Resource):
    def get(self, uuid):
        article = Article.query.filter_by(uuid=uuid).first()

        if not article: 
            response_body = {
                "message": "This article does not exist in the database, please try again"
            }
            return make_response(jsonify(response_body), 404)

        return make_response(user_article.to_dict(), 200)
api.add_resource(ArticleShared, '/article/share_receive/<string:uuid>')


class ArticleByUUID(Resource):
    def get(self, uuid):
        article = Article.query.filter_by(uuid=uuid).first()
        if not article: 
            response_body = {
                "message": "This article does not exist in the database, please try again"
            }
            return make_response(jsonify(response_body), 404)

        return make_response(article.to_dict(), 200)
api.add_resource(ArticleByUUID, '/articles/<string:uuid>')


class ArticleByID(Resource):
    def get(self, id):
        article = Article.query.filter_by(id=id).first()
        user_article = UserArticle.query.filter_by(
            user_id = session["user_id"],
            article_id = article.id
        ).first()

        if not article:
            response_body = {
                "message": "This article does not exist in the database, please try again"
            }
            return make_response(jsonify(response_body), 404)

        article.update_at = datetime.utcnow()
        db.session.commit()

        response = {
            "article": article.to_dict(),
            "current_page": user_article.current_page
        }
        return make_response(response, 200)
api.add_resource(ArticleByID, '/articles/<int:id>')


class ArticleEdit(Resource):
    def patch(self, id):
        try:
            article = Article.query.filter_by(id=id).first() 
            for attr in request.get_json():
                setattr(article, attr, request.get_json()[attr])
            article.update_at = datetime.utcnow()
            db.session.add(article)
            db.session.commit()
            response = make_response(article.to_dict(), 200)
        except:
            response = make_response({"error": "article not found"}, 404)
        return response
api.add_resource(ArticleEdit, '/article/edit/<int:id>')


# =============================== user words ============================================
class UserWords(Resource):
    def post(self):
        word = request.get_json()["word"]
        translation=request.get_json()["translation"]
        user_id=session["user_id"]

        check_exist = UserWord.query.filter_by(word=word, user_id=user_id).first()
        if check_exist: 
            return make_response({"message": "Custom word already exists."}, 422)

        new_user_word = UserWord(
            word=word,
            translation=translation,
            user_id=session["user_id"]
        )
        db.session.add(new_user_word)
        db.session.commit()
        return make_response(new_user_word.to_dict(), 201)
api.add_resource(UserWords, '/user_words', endpoint="user_words")


class UserWordByID(Resource):
    def patch(self, id):
        custom_word = UserWord.query.filter_by(id=id, user_id=session["user_id"]).first()
        for attr in request.get_json():
            setattr(custom_word, attr, request.get_json()[attr])
        db.session.add(custom_word)
        db.session.commit()
        response = make_response(custom_word.to_dict(), 200)
        return response
    
    def delete(self, id):
        custom_word = UserWord.query.filter_by(id=id, user_id=session["user_id"]).first()
        db.session.delete(custom_word)
        db.session.commit()
        return make_response()
api.add_resource(UserWordByID, "/user_word/<int:id>")

# =============================== account ===============================================
class CheckSession(Resource):
    def get(self):
        # if the user is logged in (if their user_id is in the session object):
        if session.get('user_id'):
            user = User.query.filter_by(id=session['user_id']).first()
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'message': '401: Not Authorized'}, 401)
    
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

# ============================== my stats =======================================
class PageReadEvents(Resource):
    def get(self):
        events = PageReadEvent.query.filter_by(user_id=session["user_id"]).all()
        all_time = 0
        today = 0
        yesterday = 0
        this_week = 0
        this_month = 0
        this_year = 0
        today_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        yesterday_date = today_date - timedelta(days=1)
        week_date = today_date - timedelta(days=today_date.weekday())
        month_date = today_date.replace(day=1)
        year_date = month_date.replace(month=1)
        for event in events:
            if event.date >= today_date:
                today += event.words_read
            elif event.date >= yesterday_date:
                yesterday += event.words_read
            
            if event.date >= week_date:
                this_week += event.words_read
            
            if event.date >= month_date:
                this_month += event.words_read

            if event.date >= year_date:
                this_year += event.words_read
            
            all_time += event.words_read

        return make_response({
                'today': today,
                'yesterday': yesterday,
                'week': {
                    'total': this_week,
                    'avg': this_week / (today_date.weekday() + 1)
                },
                'month':{
                    'total': this_month,
                    'avg': this_month / today_date.day
                },
                'year': {
                    'total': this_year,
                    'avg': this_month / today_date.timetuple().tm_yday # tm_yday, range[1, 366]
                },
                'total': all_time
            }, 200)
    
    def post(self):
        words_read = request.get_json()["words_read"]
        user_id = session["user_id"]
        new_read_event = PageReadEvent(
            words_read=words_read,
            user_id=user_id
        )
        db.session.add(new_read_event)
        db.session.commit()
        response = new_read_event.to_dict()
        return make_response(response, 201)
api.add_resource(PageReadEvents, "/stats", endpoint="stats")


# my stats line graph
class PageEventByMonth(Resource):
    def get(self, current_month):

        all_events = PageReadEvent.query.filter_by(user_id=session["user_id"]).all()
        
        data = [0] * 31

        # get event happens within 30 days
        today = datetime.now()
        last_month = today - timedelta(days=30)
        # yesterday = today - timedelta(days=1)
        
        events_within_a_month = []
        
        for event in all_events:
            if  last_month.date() <= event.date.date() <= today.date():
                difference = today.date() - event.date.date()
                difference_in_days = difference.days

                data[difference_in_days] += event.words_read
    
        response = make_response(data[::-1], 200)
        return response
api.add_resource(PageEventByMonth, '/stats/month/<int:current_month>')


# ============================== Vocabulary tracking ============================
class GetVocabularies(Resource):
    def get(self):
        user_id = session["user_id"]
        vocabularies = Vocabulary.query.filter_by(user_id=user_id).all()
        vocabularies_dict = [vocab.to_dict() for vocab in vocabularies]
        return make_response(vocabularies_dict, 200)
api.add_resource(GetVocabularies, "/vocabularies", endpoint="vocabularies")


# class Vocabulary(Resource):
#     def post(self, word, status):
#         user_id = session["user_id"]
#         vocab = Vocabulary.query.filter_by(hawaiian_clean=word, user_id=user_id).first()
#         if vocab:
#             return make_response({"message": "Vocabulary already exists."}, 409)
        
#         if status == 0:
#             new_vocab = Vocabulary(
#                 user_id=user_id,
#                 hawaiian_clean=word,
#                 status=status
#             )
# api.add_resource(Vocabulary, "/vocabulary/<int:word>/<int:status>") 

# ============================== account =========================================
class Signup(Resource):
    def post(self): 
        username = request.get_json()["username"]
        password = request.get_json()["password"]

        if username and password:
            user = User.query.filter_by(username=username).first()
            # check if user already exists in db
            if not user:
                try:
                    new_user = User(username=username, _password_hash=password)
                    new_user.password_hash = password
                    db.session.add(new_user)
                    db.session.commit()

                    session["user_id"] = new_user.id
                    return new_user.to_dict(), 201 
                except ValueError as e:
                    return make_response({"message": [e.__str__()]}, 422)
        return make_response({'message': 'Username already exists, please try again!'}, 422)
api.add_resource(Signup, '/signup', endpoint='signup')


class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        user = User.query.filter_by(username=username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return make_response(user.to_dict(), 201)
            return make_response({"message": "Invalid username or password"}, 401)
        return make_response({"message": "Invalid username or password"}, 401)
api.add_resource(Login, '/login', endpoint='login')


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return make_response({'message':'204: No Content'}, 204)
        return make_response({'error': '401: Unauthorized'}, 401)
api.add_resource(Logout, '/logout', endpoint='logout')



if __name__ == "__main__":
    app.run(port=5555, debug=True)
