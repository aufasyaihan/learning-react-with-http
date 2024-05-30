export async function fetchAvailablePlaces() {
  const res = await fetch("http://localhost:3000/places");
  const resData = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.places;
}

export async function UpdateUserPlaces(places) {
  const res = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }), // the backend needed key, its just the same as {places : places}
    headers: { "Content-Type": "application/json" },
  });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData.message;
}
