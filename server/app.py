#!/usr/bin/env python3
from flask import Flask, make_response, jsonify, request, session

from config import app, db, api 
from flask_restful import Resource

from models import db, Dictionary, Word, Article


class Dictionary(Resource):
    def get(self):
        dictionaries = Hawaiian.query.all()
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
api.add_resource(Dictionary, '/dictionaries', endpoint="dictionary")


class Articles(Resource):
    def get(self):
        articles = Article.query.all()  
        articles_dict = [article.to_dict() for article in articles]
        return make_response(articles_dict, 200)

    # create Article
    def post(self):
        new_article = Article(
            text=request.get_json()['text'],
            title=request.get_json()["title"],
            check_finished=False,
            current_reading=False,
            user_id=session["user_id"]
        )
        db.session.add(article)
        db.session.commit()

        new_article.user_id = session["user_id"]

        return make_response(new_article.to_dict(), 201)
api.add_resource(Articles, '/articles', endpoint="articles")


class ArticleByID(Resource):
    def get(self, id):
        article = Article.query.filter_by(id=id).first()

        if not article:
            response_body = {
                "message": "This article does not exist in the database, please try again"
            }
            return make_response(jsonify(response_body), 404)

        return make_response(article.to_dict(), 200)
api.add_resource(ArticleByID, '/articles/<int:id>')


class CheckSession(Resource):
    def get(self):
        # if the user is logged in (if their user_id is in the session object):
        if session.get("user_id"):
            user = User.query.filter_by(id=session["user_id"]).first()
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'message': '401: Not Authorized'}, 401)
api.add_resource(CheckSession, '/check_session', endpoint='check_session')


class Login(Resource):
    def post(self):
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        user = user.query.filter_by(username=username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return make_response(user.to_dict())
        return make_response({"message": "401: Not Authorized"}, 401)
api.add_resource(Login, '/login', endpoint='login')


if __name__ == "__main__":
    app.run(port=5555, debug=True)
