import { useState } from 'react';
import { Button, Collapse, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ActionDropdown({ title, formFields, handleSubmit }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      return acc;
    }, {}),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                <Form.Control
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mb-2"
                />
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
