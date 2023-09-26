import { useState, ChangeEvent, FormEventHandler, FormEvent } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BookType } from "../Book/Book";

type SearchBookType = {
  id: string;
  title: string;
  authors: string;
  imageLinks: { smallThumbnail: string; thumbnail: string };
  addBook: (bookId: string) => {};
};

const SearchBook = ({
  id,
  title,
  authors,
  imageLinks,
  addBook,
}: SearchBookType) => {
  return (
    <div className="book">
      <div className="book-btns">
        <button onClick={() => addBook(id)}>Add</button>
      </div>
      <img src={imageLinks.smallThumbnail} alt={title}></img>
      <h3>{title}</h3>
      <h4>{authors}</h4>
    </div>
  );
};

const Search = () => {
  const { token } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState<string>();
  const [searchedBooks, setSearchedBooks] = useState<BookType[]>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formattedSearch = searchInput?.replace(/ /g, "+");

    const request = await axios.request({
      method: "GET",
      url: `/api/book/search/${formattedSearch}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.books) {
      setSearchedBooks(request.data.books);
    }
  };

  const addBook = async (bookId: string) => {
    const request = await axios.request({
      method: "PUT",
      url: `/api/bookshelf/${bookId}/wantToRead`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <>
      <h1>Welcome to Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-input"
          name="search"
          value={searchInput}
          onChange={handleInputChange}
        ></input>
        <button type="submit">search</button>
      </form>
      <div id="search-results">
        {searchedBooks?.map((book) => {
          return (
            <SearchBook
              id={book.id}
              title={book.title}
              authors={book.authors}
              imageLinks={book.imageLinks}
              addBook={() => addBook(book.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Search;
