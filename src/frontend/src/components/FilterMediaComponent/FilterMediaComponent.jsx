import { Form, Row, Col } from 'react-bootstrap';

export default function FilterMediaComponent({ onFilterChange }) {
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

  const handleChange = (event) => {
    if (event.target.id === 'type') {
      const filterCriteria = { type: event.target.value };
      onFilterChange(filterCriteria);
    }
  };

  return (
    <div>
      <p>Filters:</p>
      <Row>
        <Col md={2} sm={4} xs={6}>
          <Form.Select id="type" size="sm" onChange={handleChange}>
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} sm={4} xs={6}>
          Column 3
        </Col>
        <Col md={2} sm={4} xs={6}>
          Column 4
        </Col>
        <Col md={2} sm={4} xs={6}>
          Column 5
        </Col>
        <Col md={2} sm={4} xs={6}>
          Column 6
        </Col>
      </Row>
    </div>
  );
}
