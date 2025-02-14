interface Region {
  lat: number;
  lng: number;
}

interface Dog {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

interface DogSearch {
  results: Dog[];
  next?: string;
  back?: string;
  total: number;
}

export type {
  Dog,
  Region,
  DogSearch
}