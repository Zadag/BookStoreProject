import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Signin/SignIn";
import Search from "./components/Search/Search";
import BookDetails from "./components/BookDetails/BookDetails";
import Bookshelf from "./components/Bookshelf/Bookshelf";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" Component={Search} />
        <Route path="/book/:bookId" Component={BookDetails} />
        <Route path="/bookshelf" Component={Bookshelf} />
        <Route path="/" Component={SignIn} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
