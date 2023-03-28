from server.models import db, Hawaiian
from server.app import app


def get_word_and_translation():
    Hawaiian.query.delete()

    hawaiians = []
    with open("../PukuiElbert.HawToEng.clean.txt", encoding="utf-8") as file:
        lines = file.readlines()

        for line in lines:
            word_translation = line.split('\t')
            # all_words_list.append(
            #     {
            #         "word": word_translation[0],
            #         "translation": word_translation[1]
            #      }
            # )
            hawaiian = Hawaiian(word=word_translation[0], translation=word_translation[1])
            hawaiians.append(hawaiian)
    db.session.add_all(hawaiians)
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        get_word_and_translation()
