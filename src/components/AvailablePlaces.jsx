import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    // using promise
    // fetch("http://localhost:3000/places")
    //   .then((res) => res.json())
    //   .then((resData) => setAvailablePlaces(resData.places));

    // using async/await
    async function fetchData() {
      const res = await fetch("http://localhost:3000/places");
      const resData = await res.json();
      setAvailablePlaces(resData.places);
    }

    fetchData();
  }, []);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
