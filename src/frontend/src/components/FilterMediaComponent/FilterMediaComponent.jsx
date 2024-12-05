import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import './FilterMediaComponent.css';

export default function FilterMediaComponent({ onFilterChange }) {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const years = ['all'];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const types = [
    { value: 'all', label: 'All' },
    { value: 'tvShort', label: 'TV Short' },
    { value: 'movie', label: 'Movies' },
    { value: 'tvMovie', label: 'TV Movie' },
    { value: 'short', label: 'Short' },
    { value: 'tvMiniSeries', label: 'TV Mini Series' },
    { value: 'videoGame', label: 'Video Game' },
    { value: 'tvEpisode', label: 'TV Episode' },
    { value: 'tvSeason', label: 'TV Season' },
    { value: 'video', label: 'Video' },
    { value: 'tvSpecial', label: 'TV Special' },
    { value: 'tvSeries', label: 'TV Series' },
  ];

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    const filterCriteria = {
      type: newType === 'all' ? null : newType,
      year: selectedYear,
    };
    onFilterChange(filterCriteria);
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    const filterCriteria = {
      type: selectedType,
      year: newYear === 'all' ? null : newYear,
    };
    onFilterChange(filterCriteria);
  };

  return (
    <div>
      <Form>
        <Row>
          <Col md={2} sm={4} xs={6} className="d-flex align-items-center">
            <Form.Label htmlFor="type" className="mb-0 me-2">
              Type:
            </Form.Label>
            <Form.Select id="type" size="sm" onChange={handleTypeChange}>
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2} sm={4} xs={6} className="d-flex align-items-center">
            <Form.Label htmlFor="year" className="mb-0 me-2">
              Year:
            </Form.Label>
            <Form.Control
              as="select"
              value={selectedYear}
              onChange={handleYearChange}
              size="sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
