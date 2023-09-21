const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_ArAdxPPmWFTkudMtjUmKmjlP0wRLKUjhisFBxfXflSrcXkZD9UApqTd2gAf0qAis';

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds?api_key=${API_KEY}`;
  // console.log(url);
  // console.log(fetchUrl(url));
  return fetchUrl(url);
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  console.log(fetchUrl(url));
  return fetchUrl(url);
}

function fetchUrl(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
