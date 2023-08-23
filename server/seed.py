from models import db, Dictionary, User, DictionaryWord, Article, UserWord, PageReadEvent, Vocabulary
from app import app
import datetime
import uuid

def make_user():
#     User.query.delete()
#     Article.query.delete()
#     UserWord.query.delete()
#     PageReadEvent.query.delete()
    # Vocabulary.query.delete()

    # username = "ziru"
    # password = "Test12345!"

#     # create a user
#     new_user = User(
#         username=username,
#     )
#     new_user.password_hash = password
#     db.session.add(new_user)
#     db.session.commit()
#     # print(new_user.id)

#     # create a article
#     text = '''Maikaʻi loa! Ua aʻo nui kākou i ka ʻōlelo Hawaiʻi! I kēia manawa, e huakaʻi aku kākou i Lānaʻi, ka mokupuni hope loa o kā kākou huakaʻi.\n\
# Aloha kākou. ʻOiai e holo ana a puni nā moku nui ʻeono o Hawaiʻi nei, ua hiki mai i Lānaʻi, ka mokupuni hope o kā kākou huakaʻi mokupuni.\n\
# He liʻiliʻi wale nō kēia mokupuni: 18 mile ka loa, a he 13 mile ka laulā. He 8 mile ke kaʻawale mai Maui mai, a he 9 mai Molokaʻi mai hoʻi. ʻO Lānaʻihale ka inoa o ke kuahiwi nui loa o Lānaʻi, a ma kahi o ka 3,400 kapuaʻi kona kiʻekiʻe.\
#             '''.strip()
#     title = "Lānaʻi Story"
#     new_article = Article(
#             user_id=new_user.id,
#             uuid=str(uuid.uuid4()),
#             text=text,
#             title=title,
#             check_finished=False,
#     )
    
#     # new_article.users.id = new_user.id
#     db.session.add(new_article)
#     db.session.commit()

#     date1 = datetime.datetime(2023, 3, 21, 0, 0, 0, 0)
#     date2 = datetime.datetime(2023, 3, 23, 0, 0, 0, 0)
#     date3 = datetime.datetime(2023, 4, 1, 0, 0, 0, 0)
#     date4 = datetime.datetime(2023, 4, 3, 0, 0, 0, 0)
#     date5 = datetime.datetime(2023, 4, 5, 0, 0, 0, 0)
#     date6 = datetime.datetime(2023, 4, 7, 0, 0, 0, 0)
#     date6 = datetime.datetime(2023, 4, 13, 0, 0, 0, 0)
#     date6 = datetime.datetime(2023, 4, 16, 0, 0, 0, 0)
#     date6 = datetime.datetime(2023, 4, 17, 0, 0, 0, 0)
#     date6 = datetime.datetime(2023, 4, 18, 0, 0, 0, 0)
#     date7 = datetime.datetime(2023, 4, 18, 8, 0, 0, 0)
#     page_events = [
#         PageReadEvent(user_id = new_user.id, date=date1, words_read=2650),
#         PageReadEvent(user_id = new_user.id, date=date1, words_read=2050),
#         PageReadEvent(user_id = new_user.id, date=date2, words_read=750),
#         PageReadEvent(user_id = new_user.id, date=date3, words_read=950),
#         PageReadEvent(user_id = new_user.id, date=date4, words_read=765),
#         PageReadEvent(user_id = new_user.id, date=date5, words_read=1265),
#         PageReadEvent(user_id = new_user.id, date=date6, words_read=980),
#         PageReadEvent(user_id = new_user.id, date=date7, words_read=1650),
#         PageReadEvent(user_id = new_user.id, words_read=250),
#     ]
#     db.session.add_all(page_events)
#     db.session.commit()

#     # word tracker
    # for i in range(1400):
    word1 = "maikaʻi"
    word2 = "loa"
    word3 = "Lānaʻi"
    word4= "ua"
    
    vocabs = [
        Vocabulary(user_id=1, hawaiian_clean=word1, status=2), # known
        Vocabulary(user_id=1, hawaiian_clean=word2, status=1), # studying
        Vocabulary(user_id=1, hawaiian_clean=word3, status=3), # ignored
        Vocabulary(user_id=1, hawaiian_clean=word4, status=2),
    ]
    db.session.add_all(vocabs)
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

            # =================================================
            # check if ", " in the hawaiian word
            word = word_translation[0]
            if ", " in word:
                word_list = word.split(", ")
                for each in word_list:
                    w_t = DictionaryWord(
                        hawaiian=each,
                        translation=word_translation[1],
                        dictionary_id=new_dictionary.id
                    )
                    w_t.hawaiian_clean = w_t.hawaiian.replace(".","").replace("-", "")
                    all_words.append(w_t)
            else:
                w_t = DictionaryWord(
                    hawaiian=word, 
                    translation=word_translation[1],
                    dictionary_id=new_dictionary.id
                )
                w_t.hawaiian_clean = w_t.hawaiian.replace(".","").replace("-", "")
                all_words.append(w_t)
            # ===================================================
            # w_t.hawaiian_clean = w_t.hawaiian.replace(".","").replace("-", "")
            # all_words.append(w_t)
    db.session.add_all(all_words)
    db.session.commit()


def make_user(username, password_hash):
    # create a user
    new_user = User(
        username=username,
    )
    new_user._password_hash = password_hash
    db.session.add(new_user)
    db.session.commit()
    # print(new_user.id)

def read_user_csv():
    with open("instance-bkp/sql-backup/users.csv", "r") as f:
        csv_file = csv.reader(f, delimiter=',', quotechar='"')
        for id, name, password_hash in csv_file:
            print(name, password_hash)
            make_user(name, password_hash)

def read_articles_csv(file_name):
    # Article.query.delete()
    with open(f"instance-bkp/sql-backup/{file_name}", "r") as f:
        # delimiter: A one-character string used to separate fields
        # quotechar: A one-character string used to quote fields containing special characters, quotechar='"' - default
        csv_file = csv.reader(f, delimiter=',')
        for id, uuid, title, text, check_finished, created_at, update_at, user_id, current_page in csv_file:
            if user_id == '5':
                continue
            # print(id, user_id, title)
            new_article = Article(
                    user_id=user_id,
                    uuid=uuid,
                    current_page=current_page,
                    text=text,
                    title=title,
                    check_finished=True if check_finished == 1 else False,
                    created_at=created_at,
                    update_at=update_at
            )
            db.session.add(new_article)
            db.session.commit()


def read_dictionary_words_csv(file_name):
    all_words = []
    with open(f"instance-bkp/sql-backup/{file_name}", "r") as f:
        csv_file = csv.reader(f, delimiter=",")
        for id, hawaiian, hawaiian_clean, translation, dictionary_id in csv_file:
            w_t = DictionaryWord(
                hawaiian=hawaiian,
                hawaiian_clean=hawaiian_clean,
                translation=translation,
                dictionary_id=dictionary_id
            )
            all_words.append(w_t)
        db.session.add_all(all_words)
        db.session.commit()

def read_page_read_events_csv(file_name):
    page_events = []
    with open(f"instance-bkp/sql-backup/{file_name}", "r") as f:
        csv_file = csv.reader(f, delimiter=",")
        # for line in csv_file:
        #     print(line)
        for id, date, words_read, user_id in csv_file:
            new_event = PageReadEvent(
                user_id=user_id,
                date=date,
                words_read=words_read
            )
            page_events.append(new_event)
        db.session.add_all(page_events)
        db.session.commit()

def user_words_csv(file_name):
    all_user_words = []
    with open(f"instance-bkp/sql-backup/{file_name}", "r") as f:
        csv_file = csv.reader(f, delimiter=",")
        for id, word, translation, user_id in csv_file:
            new_user_word = UserWord(
                word=word,
                translation=translation,
                user_id=user_id
            )
            all_user_words.append(new_user_word)
        db.session.add_all(all_user_words)
        db.session.commit()

def vocabularies_csv(file_name):
    all_vocabs = []
    with open(f"instance-bkp/sql-backup/{file_name}", "r") as f:
        csv_file = csv.reader(f, delimiter=",")
        for id, hawaiian_clean, status, user_id in csv_file:
            new_vocab = Vocabulary(
                hawaiian_clean=hawaiian_clean,
                status=status,
                user_id=user_id
            )
            all_vocabs.append(new_vocab)
        db.session.add_all(all_vocabs)
        db.session.commit()

import csv
if __name__ == "__main__":
    with app.app_context():
        # make_user()
        # upload_dictionary()
        # read_articles_csv("articles.csv")
        # read_dictionary_words_csv("dictionary_words.csv")
        # read_page_read_events_csv("page_read_events.csv")
        # user_words_csv("user_words.csv")
        vocabularies_csv("vocabularies.csv")

