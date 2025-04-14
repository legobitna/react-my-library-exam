import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useFavoriteStore from "../../store/useFavoriteStore";
import BookItem from "../../common/components/BookItem";

function MyBooksPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const favorites = useFavoriteStore((state) => state.favorites);

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/my-books" } });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container my-5">
      <h2 className="mb-4" style={{ color: "#1B3B36" }}>
        나의 책 리스트
      </h2>
      <div className="row">
        {favorites.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">아직 좋아요를 누른 책이 없습니다.</p>
          </div>
        ) : (
          favorites.map((book) => <BookItem key={book.key} book={book} />)
        )}
      </div>
    </div>
  );
}

export default MyBooksPage;
