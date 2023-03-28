from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Hawaiian, Article

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)


class Dictionary(Resource):
    def get(self):
        hawaiians_dictionary = Hawaiian.query.all()
        all_words = jsonify([word_translation.to_dict() for word_translation in hawaiians_dictionary])
        return make_response(all_words, 200)


api.add_resource(Dictionary, '/dictionary')
# @app.route('/dictionary')
# def dictionary():
#     hawaiians_dictionary = Hawaiian.query.all()
#     all_words = jsonify([word_translation.to_dict() for word_translation in hawaiians_dictionary])
#     return make_response(all_words, 200)


class Articles(Resource):
    def get(self):
        articles = Article.query.all()  # create Article
        articles_dict = [article.to_dict() for article in articles]
        return make_response(articles_dict, 200)

    def post(self):
        article = Article(
            text=request.get_json()['text']
        )
        db.session.add(article)
        db.session.commit()
        return make_response(article.to_dict(), 201)


api.add_resource(Articles, '/articles')


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

if __name__ == "__main__":
    app.run(port=3000, debug=True)
