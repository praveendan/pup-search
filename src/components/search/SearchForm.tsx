import Select, { MultiValue } from 'react-select';
import { Form, Button, InputGroup } from "react-bootstrap";
import { ChangeEvent, useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import { getBreeds, getDogSearchResults, getZipcodes } from '../../api/searchService';
import SearchMap from './SearchMap';
import { LatLng } from 'leaflet';
import { DogSearch, Region } from '../../types/search';
import { MAX_ZIPS } from '../../constants';
import styles from './searchform.module.scss'

type SearchFormProps = {
  updateDogsSearch: (data: DogSearch) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ updateDogsSearch }) => {
  const [breedsArr, setBreedsArr] = useState<MultiValue<{ value: string; label: string; }>>([])

  const [selectedBreeds, setSelectedBreeds] = useState<MultiValue<{ value: string; label: string; }>>([])
  const [age, setAge] = useState<{
    minAge: string,
    maxAge: string
  }>({
    minAge: '0',
    maxAge: ''
  })

  const [region, setRegion] = useState<{
    northEast: Region;
    southWest: Region
  }>()
  const [totalNumberOfZips, setTotalNumberOfZips] = useState<number>(0)
  const zipCodes = useRef<string[]>([])

  const setAgeData = (e: ChangeEvent<HTMLInputElement>) => {
    setAge({
      ...age,
      [e.target.name]: e.target.value
    })
  }

  const setBoundingBox = useCallback((northEast: LatLng, southWest: LatLng) => {
    setRegion({
      northEast: {
        lat: northEast.lat,
        lng: northEast.lng
      },
      southWest: {
        lat: southWest.lat,
        lng: southWest.lng
      }
    })
  }, [])

  const loadSearchResults = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const searchResults = await getDogSearchResults(
      selectedBreeds.map(breed => breed.label),
      zipCodes.current,
      { min: age.minAge, max: age.maxAge }
    )

    updateDogsSearch(searchResults.data)
  }

  useEffect(() => {
    const loadBreeds = async () => {
      const res = await getBreeds()
      setBreedsArr(res.data.map(breed => ({
        value: breed,
        label: breed
      })))
    }

    const loadAllDogs = async () => {
      const searchResults = await getDogSearchResults(
        [],
        [],
        { min: '', max: '' }
      )

      updateDogsSearch(searchResults.data)
    }

    
    Promise.all([
      loadBreeds(),
      loadAllDogs()
    ])
  }, [updateDogsSearch])

  useEffect(() => {
    const loadZips = async () => {
      if (region?.northEast && region?.southWest) {
        const zipCodeRes = await getZipcodes(region?.northEast, region?.southWest)
        setTotalNumberOfZips(zipCodeRes.data.total)
        zipCodes.current = zipCodeRes.data.results
      }
    }

    loadZips()
  }, [
    region?.northEast,
    region?.southWest
  ])


  return (
    <Form>
      <Form.Group className="mb-3" controlId="breedsSelect">
        <Form.Label>Select Breed</Form.Label>
        <Select
          options={breedsArr}
          isMulti
          name="breed"
          className={`basic-multi-select ${styles.breedSearch}`}
          classNamePrefix="select"
          onChange={e => { setSelectedBreeds(e) }}
          placeholder="Search and select options..."
          value={selectedBreeds}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="zipSelect">
        <Form.Label>Select Area</Form.Label>
        <SearchMap setBoundingBox={setBoundingBox} />
        {
          MAX_ZIPS < totalNumberOfZips && (
            <Form.Text className="text-danger">
              Too many location results. Please zoom in.
            </Form.Text>
          )
        }
        {
          totalNumberOfZips === 0 && (
            <Form.Text className="text-danger">
              No location results. Please zoom out.
            </Form.Text>
          )
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="ageRange">
        <Form.Label>Age Range</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control aria-label="Min age" name="minAge" type='number' step={1} placeholder='min' min={0} max={age.maxAge} value={age.minAge} onChange={setAgeData}/>
          <Form.Control aria-label="Max age" name="maxAge" type='number' step={1} placeholder='max' min={age.minAge} value={age.maxAge} onChange={setAgeData} />
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={MAX_ZIPS < totalNumberOfZips} onClick={loadSearchResults}>
        Search
      </Button>
    </Form>
  )
}

export default SearchForm
