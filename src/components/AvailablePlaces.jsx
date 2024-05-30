import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    // using promise
    // fetch("http://localhost:3000/places")
    //   .then((res) => res.json())
    //   .then((resData) => setAvailablePlaces(resData.places));

    // using async/await
    async function fetchData() {
      setIsFetching(true);
      try {
        const res = await fetch("http://localhost:3000/places");
        const resData = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch places");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(currentLocation);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
        setIsFetching(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText={"Fetching places..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
