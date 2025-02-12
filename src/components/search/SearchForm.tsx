import Select from 'react-select';
import { Form, Button, InputGroup } from "react-bootstrap";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const SearchForm: React.FC = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="breedsSelect">
        <Form.Label>Select Breed</Form.Label>
        <Select
          options={options}
          isMulti
          name="breed"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={_ => { }}
          placeholder="Search and select options..."
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="zipSelect">
        <Form.Label>Select Zipcode</Form.Label>
        <Select
          options={options}
          isMulti
          name="zipcode"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={_ => { }}
          placeholder="Search and select options..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="ageRange">
        <Form.Label>Age Range</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control aria-label="Min age" />
          <Form.Control aria-label="Max age" />
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default SearchForm
