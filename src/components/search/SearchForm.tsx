import Select, { MultiValue } from 'react-select';
import { Form, Button, InputGroup } from "react-bootstrap";
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getBreeds } from '../../api/searchService';

const SearchForm: React.FC = () => {
  const [breedsArr, setBreedsArr] = useState<MultiValue<{ value: string; label: string; }>>([])

  const [selectedBreeds, setSelectedBreeds] = useState<MultiValue<{ value: string; label: string; }>>([])
  const [age, setAge] = useState<{
    minAge: string,
    maxAge: string
  }>({
    minAge: '0',
    maxAge: ''
  })

  const setAgeData = (e: ChangeEvent<HTMLInputElement>) => {
    setAge({
      ...age,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const loadBreeds = async () => {
      const res = await getBreeds()
      setBreedsArr(res.data.map(breed => ({
        value: breed,
        label: breed
      })))
    }

    loadBreeds()
  }, [])
  return (
    <Form>
      <Form.Group className="mb-3" controlId="breedsSelect">
        <Form.Label>Select Breed</Form.Label>
        <Select
          options={breedsArr}
          isMulti
          name="breed"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={e => { setSelectedBreeds(e) }}
          placeholder="Search and select options..."
          value={selectedBreeds}
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
          <Form.Control aria-label="Min age" name="minAge" type='number' step={1} placeholder='min' min={0} max={age.maxAge} value={age.minAge} onChange={setAgeData}/>
          <Form.Control aria-label="Max age" name="maxAge" type='number' step={1} placeholder='max' min={age.minAge} value={age.maxAge} onChange={setAgeData} />
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default SearchForm
