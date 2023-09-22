import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type BookType = {
  id: string;
  title: string;
  shelf: string;
};

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
      <div id="want-to-read">
        {books?.wantToRead.map((book) => {
          return <p>{book.title}</p>;
        })}
      </div>
      <div id="currently-reading">
        {books?.currentlyReading.map((book) => {
          return <p>{book.title}</p>;
        })}
      </div>
      <div id="read">
        {books?.read.map((book) => {
          return <p>{book.title}</p>;
        })}
      </div>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Bookshelf;
