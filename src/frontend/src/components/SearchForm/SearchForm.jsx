import { Form, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import useNavigation from '@/hooks/useNavigation';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function SearchForm({ btnVariant = 'dark' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { goTo } = useNavigation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    goTo(`/search?q=${searchQuery}`);
  };

  return (
    <Form className="d-flex my-3">
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        size="sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant={btnVariant} size="sm" onClick={handleSearch}>
        <span className="d-flex gap-2">
          <i className="bi bi-search"></i> Search
        </span>
      </Button>
    </Form>
  );
}
