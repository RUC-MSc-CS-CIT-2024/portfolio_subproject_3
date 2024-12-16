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
        let uniqueHistory = [];
        let nextPage = page;
        let hasMore = true;

        while (uniqueHistory.length < 5 && hasMore) {
          const history = await getUserSearchHistory(nextPage, 5);
          const newUniqueItems = history.items.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.searchText.toLowerCase() === item.searchText.toLowerCase(),
              ),
          );

          uniqueHistory = [
            ...uniqueHistory,
            ...newUniqueItems.filter(
              (item) =>
                !uniqueHistory.some(
                  (uniqueItem) =>
                    uniqueItem.searchText.toLowerCase() ===
                    item.searchText.toLowerCase(),
                ),
            ),
          ];

          hasMore = history.nextPage !== null;
          nextPage += 1;
        }

        if (page === 1) {
          setSearchHistory(uniqueHistory);
        } else {
          setSearchHistory((prevHistory) => [
            ...prevHistory,
            ...uniqueHistory.filter(
              (item) =>
                !prevHistory.some(
                  (prevItem) =>
                    prevItem.searchText.toLowerCase() ===
                    item.searchText.toLowerCase(),
                ),
            ),
          ]);
        }
        setHasMoreItems(hasMore);
      } catch {
        console.error('Could not fetch search history');
      }
    },
    [isAuthenticated],
  );

  const handleDelete = async (searchText) => {
    try {
      const itemsToDelete = searchHistory.filter(
        (item) => item.searchText.toLowerCase() === searchText.toLowerCase(),
      );

      await Promise.all(
        itemsToDelete.map(async (item) => {
          try {
            await deleteUserSearchHistory(item.searchHistoryId);
          } catch (error) {
            if (error.message.includes('404')) {
              console.warn(`Item with ID ${item.searchHistoryId} not found.`);
            } else {
              throw error;
            }
          }
        }),
      );

      setSearchHistory((prevHistory) =>
        prevHistory.filter(
          (item) => item.searchText.toLowerCase() !== searchText.toLowerCase(),
        ),
      );

      fetchSearchHistory(currentPage);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting the search history items:', error);
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
                  onClick={() => handleDelete(item.searchText)}
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
