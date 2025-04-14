import React from "react";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useFavoriteStore from "../../store/useFavoriteStore";
import noCoverImage from "../../assets/no_cover.jpg";

// 스타일 컴포넌트 정의
const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BookImage = styled(Card.Img)`
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const CardContent = styled(Card.Body)`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitle = styled(Card.Title)`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: #1b3b36;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 2.6em;
  line-height: 1.3;
`;

const BookAuthor = styled(Card.Text)`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FavoriteButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  border-color: ${(props) => (props.isFavorite ? "#dc3545" : "#E6C88C")};
  color: ${(props) => (props.isFavorite ? "#dc3545" : "#E6C88C")};
`;

function BookItem({ book }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const favorites = useFavoriteStore((state) => state.favorites);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  const isFavorite = favorites.some((fav) => fav.key === book.key);

  const handleFavoriteClick = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (isFavorite) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
  };

  const handleImageError = (e) => {
    e.target.src = noCoverImage;
  };

  return (
    <div className="col-6 col-md-4 col-lg-2 mb-4 px-2">
      <StyledCard>
        <BookImage
          variant="top"
          src={book.coverUrl}
          onError={handleImageError}
        />
        <CardContent>
          <div>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
          </div>
          <div className="d-flex justify-content-end">
            <FavoriteButton
              variant={isFavorite ? "outline-danger" : "outline-warning"}
              size="sm"
              onClick={handleFavoriteClick}
              isFavorite={isFavorite}
            >
              {isFavorite ? "♥" : "♡"}
            </FavoriteButton>
          </div>
        </CardContent>
      </StyledCard>
    </div>
  );
}

export default BookItem;
