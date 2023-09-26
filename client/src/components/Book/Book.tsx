import { MouseEventHandler } from "react";

export type BookType = {
  id: string;
  title: string;
  authors: string;
  shelf: string;
  imageLinks: { smallThumbnail: string; thumbnail: string };
  moveBook: (bookId: string, prevShelf: string, shelf: string) => void;
  removeBook: (id: string) => void;
};

export const Book = ({
  id,
  title,
  authors,
  shelf,
  imageLinks,
  removeBook,
  moveBook,
}: BookType) => {
  return (
    <div className="book">
      <div className="book-btns">
        <button onClick={() => removeBook(id)}>x</button>
      </div>
      <img src={imageLinks.smallThumbnail} alt={title}></img>
      <h3>{title}</h3>
      <h4>{authors}</h4>
    </div>
  );
};
