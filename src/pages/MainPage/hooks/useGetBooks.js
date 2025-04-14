import { useQuery } from "@tanstack/react-query";

async function fetchBooks() {
  const response = await fetch(
    "https://openlibrary.org/subjects/love.json?limit=10"
  );
  const data = await response.json();

  const books = data.works.map((work) => {
    return {
      key: work.key,
      title: work.title,
      author: work.authors[0]?.name,
      coverUrl: `http://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
    };
  });

  return books;
}

function useGetBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
}

export default useGetBooks;
