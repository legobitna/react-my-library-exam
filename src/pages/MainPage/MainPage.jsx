import React, { useState } from "react";
import BookList from "./components/BookList";
import useGetBooks from "./hooks/useGetBooks";
import useSearchBooks from "./hooks/useSearchBooks";
import useAuthStore from "../../store/useAuthStore";
import {
  Form,
  InputGroup,
  Button,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: defaultBooks, isLoading: isLoadingDefault } = useGetBooks();
  const { data: searchResults, isLoading: isLoadingSearch } =
    useSearchBooks(searchQuery);
  const user = useAuthStore((state) => state.user);

  const books = searchQuery ? searchResults : defaultBooks;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingDefault;

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchQuery(formData.get("search"));
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!books || books.length === 0) return <div>No books available</div>;

  return (
    <div className="main-container">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          background: "#1B3B36",
          color: "white",
          padding: "50px 0",
          marginBottom: "50px",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 style={{ color: "#E6C88C" }}>코딩알려주는 누나 도서관</h1>
              {user && (
                <h2 style={{ color: "#E6C88C" }}>
                  {user.username}님 환영합니다!
                </h2>
              )}
            </Col>
            <Col md={6}>
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="책 제목이나 작가를 검색하세요"
                    defaultValue={searchQuery}
                    style={{ height: "50px" }}
                  />
                  <Button
                    variant="warning"
                    type="submit"
                    style={{
                      backgroundColor: "#E6C88C",
                      borderColor: "#E6C88C",
                    }}
                  >
                    검색
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Books Section */}
      <Container>
        <h2 className="mb-4" style={{ color: "#1B3B36" }}>
          인기 도서
        </h2>
        <BookList books={books} />
      </Container>
    </div>
  );
}

export default MainPage;
