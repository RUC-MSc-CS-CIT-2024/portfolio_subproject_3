import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function SearchForm({ btnVariant = 'dark', onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <Form className="d-flex my-3" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        size="sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        variant={btnVariant}
        size="sm"
        onClick={handleSearch}
        type="submit"
      >
        <span className="d-flex gap-2">
          <i className="bi bi-search"></i> Search
        </span>
      </Button>
    </Form>
  );
}
