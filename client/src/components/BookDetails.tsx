import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();

  return (
    <>
      <h1>Welcome to book details</h1>
      <p>showing details for {bookId}</p>
      <p>
        jdsg;lkjad;glkajdg lkasdjg a;slkdgj sdlkgjs; kgdj a;sldgkjas gjhsig u
        asgivuhsv jbdohs sodkjan{" "}
      </p>
    </>
  );
};

export default BookDetails;
