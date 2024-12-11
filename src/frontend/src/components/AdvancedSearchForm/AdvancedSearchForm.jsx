import { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { SearchForm } from '@/components';

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
    } else if (queryType === 'SimpleSearch') {
      params = { ...params, query };
    }
    onSearch(params);
  };

  const handleStructuredSubmit = (e) => {
    e.preventDefault();
    const params = {
      query_type: 'StructuredSearch',
      ...structuredFields,
    };
    onSearch(params);
  };

  return (
    <div className="advanced-search-form mt-4">
      <Card className="shadow-sm p-4">
        <Row className="mb-3 align-items-end">
          <Col xs="12" md="4" className="mb-3">
            <Form.Group controlId="queryTypeSelect">
              <Form.Label className="fw-bold">Search Type</Form.Label>
              <Form.Select
                className="rounded shadow-sm"
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
              >
                <option value="ExactMatch">ExactMatch</option>
                <option value="BestMatch">BestMatch</option>
                <option value="SimpleSearch">SimpleSearch</option>
                <option value="StructuredSearch">StructuredSearch</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="12" md="8">
            {queryType !== 'StructuredSearch' && (
              <SearchForm
                btnVariant="dark"
                onSearch={handleNonStructuredSearch}
              />
            )}
            {queryType === 'StructuredSearch' && (
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
        </Row>
      </Card>
    </div>
  );
}
