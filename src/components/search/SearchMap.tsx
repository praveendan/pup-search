import { LatLng } from "leaflet";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from './searchmap.module.scss';
import { CENTER_OF_USA, MAP_ATTRIBUTION, MAP_TILE_LAYER_URL } from "../../constants";


type SearchMapProps = {
  setBoundingBox: (northEast: LatLng, southWest: LatLng) => void
}

const RecenterAutomatically = () => {
  const map = useMap();
  useEffect(() => {
    const showPosition = (position: GeolocationPosition) => {
      map.setView([position.coords.latitude, position.coords.longitude]);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      map.setView(CENTER_OF_USA);
    }
  }, []);
  return null;
};

const GetBounds:React.FC<SearchMapProps> = ({setBoundingBox}) => {
  const map = useMap();

  useEffect(() => {
    map.on("moveend", function () {
      const bounds = map.getBounds()
      setBoundingBox(bounds.getNorthEast(), bounds.getSouthWest())
    });

    return () => {
      map.off("moveend");
    };
  }, [setBoundingBox]);

  return null;
};

const SearchMap: React.FC<SearchMapProps> = ({ setBoundingBox }) => {
  return (
    <MapContainer
      doubleClickZoom={false}
      id="searchMap"
      zoom={15}
      center={CENTER_OF_USA}
      className={styles.searchMap}
    >
      <TileLayer
        url={MAP_TILE_LAYER_URL}
        attribution={MAP_ATTRIBUTION}
      />
      <RecenterAutomatically />
      <GetBounds setBoundingBox={setBoundingBox} />
    </MapContainer>
  );
};

export default SearchMap;
