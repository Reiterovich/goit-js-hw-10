import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
const breedSelect = document.querySelector('.breed-select');
const loaderP = document.querySelector('.loader');
const errorP = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.hidden = true;
// loaderP.hidden = false;
errorP.hidden = true;

fetchBreeds()
  .then(breeds => {
    let breedsArray = [...breeds];
    createBreedsOptions(breeds);
    loaderP.hidden = true;
    breedSelect.hidden = false;
    console.log(breedsArray);
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    loaderP.hidden = true;
    showEl(errorP);
  })
  .finally(() => {});

function createBreedsOptions(array) {
  const markup = array
    .map(({ id, name }) => ` <option value="${id}">${name}</option>`)
    .join(' ');
  breedSelect.insertAdjacentHTML('afterbegin', markup);
}

function showEl(elem) {
  elem.hidden = false;
}

breedSelect.addEventListener('change', breedFun);

let catCard = [];

function breedFun() {
  catInfo.innerHTML = '';
  loaderP.hidden = false;
  let breedId = breedSelect.value;
  fetchCatByBreed(breedId)
    .then(cat => {
      catCard = [...cat];
      createCards(catCard);
    })
    .catch(err => {
      loaderP.hidden = true;
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      showEl(errorP);
    })
    .finally(() => {
      loaderP.hidden = true;
    });
}

function createCards(array) {
  const markup = array
    .map(
      ({ breeds, url }) =>
        `<img width="250" px src="${url}"></img><h1>Breed: ${breeds[0].name}</h1><p>Description: ${breeds[0].description}</p><p>Temperament: ${breeds[0].temperament}</p>`
    )
    .join(' ');
  catInfo.innerHTML = markup;
  //   console.log(markup);
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// fetchCatByBreed();
// console.log(breedsArray);

// [
//   {
//     breeds: [
//       {
//         weight: {
//           imperial: '7 - 10',
//           metric: '3 - 5',
//         },
//         id: 'aege',
//         name: 'Aegean',
//         vetstreet_url: 'http://www.vetstreet.com/cats/aegean-cat',
//         temperament: 'Affectionate, Social, Intelligent, Playful, Active',
//         origin: 'Greece',
//         country_codes: 'GR',
//         country_code: 'GR',
//         description:
//           'Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.',
//         life_span: '9 - 12',
//         indoor: 0,
//         alt_names: '',
//         adaptability: 5,
//         affection_level: 4,
//         child_friendly: 4,
//         dog_friendly: 4,
//         energy_level: 3,
//         grooming: 3,
//         health_issues: 1,
//         intelligence: 3,
//         shedding_level: 3,
//         social_needs: 4,
//         stranger_friendly: 4,
//         vocalisation: 3,
//         experimental: 0,
//         hairless: 0,
//         natural: 0,
//         rare: 0,
//         rex: 0,
//         suppressed_tail: 0,
//         short_legs: 0,
//         wikipedia_url: 'https://en.wikipedia.org/wiki/Aegean_cat',
//         hypoallergenic: 0,
//         reference_image_id: 'ozEvzdVM-',
//       },
//     ],
//     id: 'uvt2Psd9O',
//     url: 'https://cdn2.thecatapi.com/images/uvt2Psd9O.jpg',
//     width: 1024,
//     height: 1024,
//   },
// ];
