import React from "react";
import BookItem from "../../../common/components/BookItem";

function BookList({ books }) {
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
      {books.map((book) => (
        <BookItem key={book.key} book={book} />
      ))}
    </div>
  );
}

export default BookList;
