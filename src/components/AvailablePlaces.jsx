import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    // using promise
    // fetch("http://localhost:3000/places")
    //   .then((res) => res.json())
    //   .then((resData) => setAvailablePlaces(resData.places));

    // using async/await
    async function fetchData() {
      setIsFetching(true);
      const res = await fetch("http://localhost:3000/places");
      const resData = await res.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false)
    }

    fetchData();
  }, []);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText = {"Fetching places..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
