from models import db, Dictionary, User, DictionaryWord, Article, UserArticle, UserWord, PageReadEvent
from app import app
import datetime
import uuid

def make_user():
    User.query.delete()
    Article.query.delete()
    UserArticle.query.delete()
    UserWord.query.delete()
    PageReadEvent.query.delete()

    username = "ziru"
    password = "Test12345!"

    # create a user
    new_user = User(
        username=username,
    )
    new_user.password_hash = password
    db.session.add(new_user)
    db.session.commit()
    # print(new_user.id)

    # create a article
    text = '''Maikaʻi loa! Ua aʻo nui kākou i ka ʻōlelo Hawaiʻi! I kēia manawa, e huakaʻi aku kākou i Lānaʻi, ka mokupuni hope loa o kā kākou huakaʻi.\n\
Aloha kākou. ʻOiai e holo ana a puni nā moku nui ʻeono o Hawaiʻi nei, ua hiki mai i Lānaʻi, ka mokupuni hope o kā kākou huakaʻi mokupuni.\n\
He liʻiliʻi wale nō kēia mokupuni: 18 mile ka loa, a he 13 mile ka laulā. He 8 mile ke kaʻawale mai Maui mai, a he 9 mai Molokaʻi mai hoʻi. ʻO Lānaʻihale ka inoa o ke kuahiwi nui loa o Lānaʻi, a ma kahi o ka 3,400 kapuaʻi kona kiʻekiʻe.\
            '''.strip()
    title = "Lānaʻi Story"
    new_article = Article(
            uuid=str(uuid.uuid4()),
            text=text,
            title=title,
            # total_pages=len(text.split()),
            check_finished=False,
    )
    
    new_article.users.id = new_user.id
    db.session.add(new_article)
    db.session.commit()

    # user-article
    user_article = UserArticle(
        user_id=new_user.id,
        article_id=new_article.id,
    )
    db.session.add(user_article)
    db.session.commit()

    date1 = datetime.datetime(2023, 3, 21, 0, 0, 0, 0)
    date2 = datetime.datetime(2023, 3, 23, 0, 0, 0, 0)
    date3 = datetime.datetime(2023, 4, 1, 0, 0, 0, 0)
    date4 = datetime.datetime(2023, 4, 3, 0, 0, 0, 0)
    date5 = datetime.datetime(2023, 4, 5, 0, 0, 0, 0)
    date6 = datetime.datetime(2023, 4, 7, 0, 0, 0, 0)
    date6 = datetime.datetime(2023, 4, 13, 0, 0, 0, 0)
    date6 = datetime.datetime(2023, 4, 16, 0, 0, 0, 0)
    date6 = datetime.datetime(2023, 4, 17, 0, 0, 0, 0)
    date6 = datetime.datetime(2023, 4, 18, 0, 0, 0, 0)
    date7 = datetime.datetime(2023, 4, 18, 8, 0, 0, 0)
    page_events = [
        PageReadEvent(user_id = new_user.id, date=date1, words_read=2650),
        PageReadEvent(user_id = new_user.id, date=date1, words_read=2050),
        PageReadEvent(user_id = new_user.id, date=date2, words_read=750),
        PageReadEvent(user_id = new_user.id, date=date3, words_read=950),
        PageReadEvent(user_id = new_user.id, date=date4, words_read=765),
        PageReadEvent(user_id = new_user.id, date=date5, words_read=1265),
        PageReadEvent(user_id = new_user.id, date=date6, words_read=980),
        PageReadEvent(user_id = new_user.id, date=date7, words_read=1650),
        PageReadEvent(user_id = new_user.id, words_read=250),
    ]
    db.session.add_all(page_events)
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
