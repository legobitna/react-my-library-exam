import { useQuery } from "@tanstack/react-query";

async function searchBooks(query) {
  if (!query) return [];

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=10`
  );
  const data = await response.json();

  const books = data.docs.map((doc) => {
    return {
      key: doc.key,
      title: doc.title,
      author: doc.author_name?.[0] || "Unknown Author",
      coverUrl: doc.cover_i
        ? `http://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover",
    };
  });

  return books;
}

function useSearchBooks(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchBooks(query),
    enabled: !!query,
  });
}

export default useSearchBooks;
