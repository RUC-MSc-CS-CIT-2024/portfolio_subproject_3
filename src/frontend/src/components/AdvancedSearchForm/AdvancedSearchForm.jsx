// AdvancedSearchForm.jsx
import { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { SearchForm } from '@/components';
import './AdvancedSearchForm.css';

export default function AdvancedSearchForm({
  queryType,
  setQueryType,
  onSearch,
}) {
  const [structuredFields, setStructuredFields] = useState({
    title: '',
    plot: '',
    character: '',
    person: '',
  });

  const handleStructuredChange = (field, value) => {
    setStructuredFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleNonStructuredSearch = (query) => {
    let params = { query_type: queryType };

    if (queryType === 'ExactMatch' || queryType === 'BestMatch') {
      const keywords = query.trim().split(/\s+/);
      params = { ...params, keywords };
    } else if (queryType === 'Simple') {
      params = { ...params, query };
    }

    onSearch(params);
  };

  const handleStructuredSubmit = (e) => {
    e.preventDefault();
    const params = {
      query_type: 'Structured',
      ...structuredFields,
    };
    onSearch(params);
  };

  return (
    <div className="advanced-search-form mt-4">
      <Card className="shadow-sm p-4">
        <Col xs="12" md="2" className="mb-3">
          <Form.Group controlId="queryTypeSelect">
            <Form.Label className="fw-bold">Search Type</Form.Label>
            <Form.Select
              className="rounded shadow-sm"
              value={queryType}
              onChange={(e) => setQueryType(e.target.value)}
            >
              <option value="ExactMatch">ExactMatch</option>
              <option value="BestMatch">BestMatch</option>
              <option value="Simple">Simple</option>
              <option value="Structured">Structured</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="12" md="15">
          {queryType !== 'Structured' && (
            <SearchForm
              btnVariant="dark"
              onSearch={handleNonStructuredSearch}
            />
          )}
          {queryType === 'Structured' && (
            <Form onSubmit={handleStructuredSubmit}>
              <Row>
                <Col xs="12" md="6" className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Title</Form.Label>
                    <Form.Control
                      className="rounded shadow-sm"
                      type="text"
                      placeholder="Search by title"
                      value={structuredFields.title}
                      onChange={(e) =>
                        handleStructuredChange('title', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="6" className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Plot</Form.Label>
                    <Form.Control
                      className="rounded shadow-sm"
                      type="text"
                      placeholder="Search by plot"
                      value={structuredFields.plot}
                      onChange={(e) =>
                        handleStructuredChange('plot', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6" className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Character</Form.Label>
                    <Form.Control
                      className="rounded shadow-sm"
                      type="text"
                      placeholder="Search by character"
                      value={structuredFields.character}
                      onChange={(e) =>
                        handleStructuredChange('character', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="6" className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Person</Form.Label>
                    <Form.Control
                      className="rounded shadow-sm"
                      type="text"
                      placeholder="Search by person"
                      value={structuredFields.person}
                      onChange={(e) =>
                        handleStructuredChange('person', e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button
                  variant="dark"
                  className="rounded shadow-sm"
                  type="submit"
                >
                  Search
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Card>
    </div>
  );
}
