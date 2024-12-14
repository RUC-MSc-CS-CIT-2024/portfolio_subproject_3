import { useState, useEffect } from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactStarsRating from 'react-awesome-stars-rating';

export default function ActionDropdown({
  title,
  formFields = [],
  handleSubmit,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormData = {};
    formFields.forEach((field) => {
      initialFormData[field.name] = field.defaultValue || '';
    });
    setFormData(initialFormData);
  }, [formFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRatingChange = (value) => {
    const ratingValue = value * 2;
    setFormData((prevData) => ({ ...prevData, rating: ratingValue }));
  };

  const handleFormSubmit = async () => {
    await handleSubmit(formData);
  };

  return (
    <>
      <Button
        variant="outline-dark"
        onClick={() => setOpen(!open)}
        aria-controls="form-collapse"
        aria-expanded={open}
        className="w-100 mb-2 rounded"
      >
        {title}
        {!open ? (
          <i className="bi bi-chevron-down ms-1"></i>
        ) : (
          <i className="bi bi-chevron-up ms-1"></i>
        )}
      </Button>
      <Collapse in={open}>
        <div id="form-collapse" className="w-100">
          <Form className="p-3">
            {formFields.map((field) => (
              <Form.Group controlId={field.name} key={field.name}>
                {field.type === 'select' ? (
                  <Form.Control
                    as="select"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="mb-2"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                ) : field.type === 'rating' ? (
                  <Form.Group controlId="rating" className="d-flex flex-column">
                    <Form.Label>Rating</Form.Label>
                    <ReactStarsRating
                      value={formData.rating / 2 || 0}
                      onChange={handleRatingChange}
                      count={5}
                      size={30}
                      isHalf={true}
                      primaryColor="orange"
                      secondaryColor="grey"
                      className="mb-2"
                    />
                  </Form.Group>
                ) : (
                  <Form.Control
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="mb-2"
                  />
                )}
              </Form.Group>
            ))}
            <Button
              variant="outline-dark"
              onClick={handleFormSubmit}
              className="mt-2"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Collapse>
    </>
  );
}
