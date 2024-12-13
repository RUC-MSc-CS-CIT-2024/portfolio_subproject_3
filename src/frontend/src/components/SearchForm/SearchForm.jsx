// SearchForm.jsx
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useEffect, useState, useRef, useCallback } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getUserSearchHistory, deleteUserSearchHistory } from '@/services';
import './SearchForm.css';
import { useAuth, useSearch } from '@/hooks';

export default function SearchForm({ btnVariant = 'dark', onSearch }) {
  const { isAuthenticated } = useAuth();
  const { query } = useSearch();

  const [searchQuery, setSearchQuery] = useState(query);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const formRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSearch(e.target.query.value);
  };

  const fetchSearchHistory = useCallback(
    async (page) => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const history = await getUserSearchHistory(page, 5);
        if (page === 1) {
          setSearchHistory(history.items);
        } else {
          setSearchHistory((prevHistory) => [...prevHistory, ...history.items]);
        }
        setHasMoreItems(history.nextPage !== null);
      } catch {
        console.error('Could not fetch search history');
      }
    },
    [isAuthenticated],
  );

  const handleDelete = async (id) => {
    try {
      await deleteUserSearchHistory(id);
      setSearchHistory((prevHistory) =>
        prevHistory.filter((item) => item.searchHistoryId !== id),
      );
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting the search history item:', error);
    }
  };

  useEffect(() => {
    fetchSearchHistory(currentPage);
  }, [currentPage, refresh, fetchSearchHistory]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="search-form-container" ref={formRef}>
      <Form className="d-flex my-3" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          size="sm"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <Button variant={btnVariant} size="sm" type="submit">
          <span className="d-flex gap-2">
            <i className="bi bi-search"></i> Search
          </span>
        </Button>
      </Form>
      {showDropdown && searchHistory.length > 0 && (
        <Dropdown show={showDropdown} className="w-100">
          <Dropdown.Menu className="w-100">
            {searchHistory.map((item, index) => (
              <Dropdown.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <span onMouseDown={() => setSearchQuery(item.searchText)}>
                  {item.searchText}
                </span>
                <i
                  className="bi bi-x text-danger"
                  style={{ cursor: 'pointer' }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleDelete(item.searchHistoryId)}
                />
              </Dropdown.Item>
            ))}
            {hasMoreItems && (
              <Dropdown.Item
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleNextPage}
                className="fw-bold"
              >
                Load more...
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
