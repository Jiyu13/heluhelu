from models import db, Dictionary, User, DictionaryWord, Article, UserArticle
from app import app

def make_user():
    User.query.delete()
    Article.query.delete()
    UserArticle.query.delete()

    username = "ziru"
    password = "test"

    # create a user
    new_user = User(
        username=username,
    )
    new_user.password_hash = password
    db.session.add(new_user)
    db.session.commit()




def upload_dictionary():
    Dictionary.query.delete()
    DictionaryWord.query.delete()

    user = User.query.filter_by(username="ziru").first()

    dictionary_title = "PukuiElbert.HawToEng.clean"
    
    new_dictionary = Dictionary(
        title=dictionary_title,
        user_id=user.id
    )
    db.session.add(new_dictionary)
    db.session.commit()

    all_words = []
    with open("../PukuiElbert.HawToEng.clean.txt", encoding="utf-8") as file:
        lines = file.readlines()
        for line in lines:
            word_translation = line.split('\t')
            w_t = DictionaryWord(
                hawaiian=word_translation[0], 
                translation=word_translation[1],
                dictionary_id=new_dictionary.id
            )
            w_t.hawaiian_clean = w_t.hawaiian.replace(".","").replace("-", "")
            all_words.append(w_t)
    db.session.add_all(all_words)
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        make_user()
        upload_dictionary()
