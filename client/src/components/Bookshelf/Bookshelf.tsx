import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, BookType } from "../Book/Book";

type BookshelfType = {
  wantToRead: BookType[];
  currentlyReading: BookType[];
  read: BookType[];
};

const Bookshelf = () => {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);
  const [books, setBooks] = useState<BookshelfType>();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const moveBookToShelf = async (
    bookId: string,
    prevShelf: string,
    shelf: string
  ) => {
    const request = await axios.request({
      method: "PUT",
      url: `/api/bookshelf/${bookId}/${shelf}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    //removeBookFromShelf(bookId, prevShelf)

    // const booksClone = structuredClone(books);
    // if (!booksClone) return
    // booksClone[shelf].append
    setBooks(request.data.books);
  };

  const removeBookFromShelf = async (bookId: string) => {
    // const booksClone = structuredClone(books);
    // if (!booksClone) return
    // const bookIndex = booksClone[shelf as keyof BookshelfType].findIndex((book) => book.id !== bookId)
    // booksClone[shelf as keyof BookshelfType].splice(bookIndex, 1)
    // setBooks(booksClone);

    const request = await axios.request({
      method: "DELETE",
      url: `/api/bookshelf/${bookId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setBooks(request.data.books);
  };

  const getBookshelf = async () => {
    const request = await axios.request({
      method: "GET",
      url: "/api/bookshelf",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(request.data);
    setBooks(request.data.books);
  };

  useEffect(() => {
    getBookshelf();
  }, []);

  return (
    <>
      <h1>Welcome to bookshelf</h1>
      <h2>Want to read</h2>
      <div id="want-to-read" className="bookshelf">
        {books?.wantToRead.map((book) => {
          return (
            <Book
              id={book.id}
              title={book.title}
              authors={book.authors}
              shelf={book.shelf}
              imageLinks={book.imageLinks}
              moveBook={moveBookToShelf}
              removeBook={removeBookFromShelf}
            />
          );
        })}
      </div>
      <h2>Currently reading</h2>
      <div id="currently-reading" className="bookshelf">
        {books?.currentlyReading.map((book) => {
          return (
            <Book
              id={book.id}
              title={book.title}
              authors={book.authors}
              shelf={book.shelf}
              imageLinks={book.imageLinks}
              moveBook={moveBookToShelf}
              removeBook={removeBookFromShelf}
            />
          );
        })}
      </div>
      <h2>Read</h2>
      <div id="read" className="bookshelf">
        {books?.read.map((book) => {
          return (
            <Book
              id={book.id}
              title={book.title}
              authors={book.authors}
              shelf={book.shelf}
              imageLinks={book.imageLinks}
              moveBook={moveBookToShelf}
              removeBook={removeBookFromShelf}
            />
          );
        })}
      </div>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Bookshelf;
