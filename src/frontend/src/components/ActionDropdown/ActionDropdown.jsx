import { useState } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';

export default function ActionDropdown({
  title,
  formFields,
  handleSubmit,
  buttonText,
}) {
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
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-dark"
        id="dropdown-basic"
        className="w-100 mb-2"
      >
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
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
            {buttonText}
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}
