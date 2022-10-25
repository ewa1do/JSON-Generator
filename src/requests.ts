import * as https from 'node:https';

const dogApiEndpoint = 'https://dog.ceo/api/breeds/image/random';
const catApiEndpoint = 'https://api.thecatapi.com/v1/images/search';
const birdApiEndpoint = 'https://zoo-animal-api.herokuapp.com/animals/rand/10';

interface AnimalApiResponse {
  name: string;
  latin_name: string;
  animal_type: string;
  active_time: string;
  length_min: string;
  length_max: string;
  weight_min: string;
  weight_max: string;
  lifespan: string;
  habitat: string;
  diet: string;
  geo_range: string;
  image_link: string;
  id: number;
}

function getDogImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(dogApiEndpoint, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        return resolve(JSON.parse(data).message);
      });

      res.on('error', (err) => reject(err));
    });
  });
}

function getCatImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(catApiEndpoint, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('close', () => {
        const [response] = JSON.parse(data);
        data = response.url;

        resolve(data);
      });

      res.on('error', (err) => reject(err));
    });
  });
}

function getBirdImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(birdApiEndpoint, (res) => {
      let data: string = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('close', () => {
        const animals: AnimalApiResponse[] = JSON.parse(data);

        const [bird] = animals.filter((animal) => {
          return animal.animal_type === 'Bird';
        });

        resolve(bird.image_link);
      });

      res.on('error', (err) => reject(err));
    });
  });
}

export { getBirdImage, getDogImage, getCatImage };
