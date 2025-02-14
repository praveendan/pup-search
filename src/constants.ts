import { LatLngTuple } from "leaflet";

export const ENDPOINT = 'https://frontend-take-home-service.fetch.com';

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const CENTER_OF_USA: LatLngTuple = [38.7946, 106.5348];

export const MAP_TILE_LAYER_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

export const MAP_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

export const MAX_ZIPS = 100

export const MAX_SEARCH_RES_PER_PAGE = 20
