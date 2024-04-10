# Online Bookstore Project

## Description

Online Bookstore is a web application that allows authors to create, update, delete and search books online. This project is built using Node.js and Express for the backend, with MongoDB as the database. It features a RESTful API for managing books and authors, including operations to create, read, update, and delete (CRUD) books, as well as to search for books by city and in between published dates.

## Features

- Browse and search for books by city and published date.
- View detailed information about each book.
- Add, edit, and remove books from the inventory (valid authors only).
- Manage author profiles.
- User authentication for secure access.

## Installation

To set up the Online Bookstore project locally, follow these steps:

1. **Clone the repository:**

git clone https://github.com/Gargi7560/Nodejs_BookStoreOnline.git

2. **Navigate to the project directory:**

cd online-bookstore

3. **Install dependencies:**

npm install

4. **Set up the environment variables:**

Copy the `.env`, and update it with your own secret key.

5. **Set up the MongoDB Database:**

Create new database with the name of bookstoreonline in your MongoDB Database.

6. **Start the server:**

Node index.js

The application will be running on `http://localhost:3000`.

## Usage

After starting the application, you can use the following endpoints to interact with the bookstore:

- `GET /api/books` - Retrieve a list of all books.
- `POST /api/books` - Add a new book (valid author only).
- `GET /api/books/:id` - Retrieve a book by its ID.
- `PATCH /api/books/:id` - Update a book's information (valid author only).
- `DELETE /api/books/:id` - Remove a book from the catalog (valid author only).
- `GET /api/books/search` - Search a book from the catalog (valid author only).
- `POST /api/authors/register` - To add a new author in the portal.
- `POST /api/authors/login` - Login portal for the authors.




