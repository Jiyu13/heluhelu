# Heluhe.lu - Hawiian Reader

Heluhe.lu is a Hawaiian language learning tool that helps users keep track of vocabulary and reading stats while reading.

Users can:
* import Hawaiian texts to read.
* edit existing articles.
* click on a word while reading to see its definition (or add a custom definition).
* mark words as known/studying/ignored to track progress and record for later study.
* check reading stats over a variety of time periods.
* review saved words and filter words by status.
* create links to share articles with other users.
* delete unwanted articles.

## Frontend

The frontend was built with **React**. I used **React styled components** to style the frontend.

## Backend

The backend REST API was built in **Python** using **Flask**. The database uses **SQLite3** and is managed by **Flask** using **SQLAlchemy**.

## Authentication

The backend uses **bcrypt** for hashing and validating passwords. Users must be logged in to use the site. Once logged in, they can only see the articles and stats they've created.