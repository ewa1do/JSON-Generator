import * as fs from 'node:fs';
import { v4 as uuid } from 'uuid';
import {
  getBirdImage,
  getCatImage,
  getDescription,
  getDogImage,
} from './requests';
import {
  animals,
  description,
  genders,
  species,
  getRandomNumber,
} from './config';

const peopleNames = fs
  .readFileSync(
    `${__dirname}/data/input/firstname-lastname-untitledproject-9-19-2022-QueryResult.csv`,
    'utf-8'
  )
  .split('\n');

const puppyNames = fs
  .readFileSync(
    `${__dirname}/data/input/dog-names-from-march-2022-1.csv`,
    'utf-8'
  )
  .split('\n');

function getFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
}

function PromisifySyncFile(file: string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    resolve(file);
  });
}

function PromiseId(): Promise<string> {
  return new Promise((resolve) => resolve(uuid()));
}

async function getOwner() {
  const owners = await PromisifySyncFile(peopleNames);

  const limit = owners.length;
  const owner = owners[getRandomNumber(limit)];
  return owner;
}

async function getPuppyName() {
  const puppies = await PromisifySyncFile(puppyNames);
  const limit = puppies.length;

  let puppy = puppies[getRandomNumber(limit)];
  puppy = puppy.slice(0, puppy.indexOf(','));

  return puppy;
}

async function getKind(): Promise<string> {
  const limit = species.length;
  return new Promise((resolve) => resolve(species[getRandomNumber(limit)]));
}

async function getPetImage(kind: string): Promise<string> {
  if (kind === 'perro') {
    return getDogImage();
  } else if (kind === 'gato') {
    return getCatImage();
  } else if (kind === 'ave') {
    return getBirdImage();
  } else {
    return animals.roedor[getRandomNumber(animals.roedor.length)];
  }
}

async function getPuppyOwner(): Promise<string> {
  const peopleNames: string = await getFile(
    `${__dirname}/data/input/firstname-lastname-untitledproject-9-19-2022-QueryResult.csv`
  );

  const limit = peopleNames.split('\n').length;
  const owner = peopleNames.split('\n')[getRandomNumber(limit)].trim();

  return owner;
}

async function getPetGender(): Promise<string> {
  return new Promise((resolve) =>
    resolve(genders[getRandomNumber(genders.length)])
  );
}

async function getDesc(): Promise<string> {
  return getDescription();
}

async function setPhoneNumber(): Promise<string> {
  return new Promise((resolve, reject) => {
    const phone = `+57-311-${getRandomNumber(99999999)}`;
    resolve(phone);
  });
}

async function writeJsonFile(dir: string, file: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dir, file, (err) => {
      if (err) reject(err);

      console.log('\n\nFile Created Successfully!!');
      resolve('success');
    });
  });
}

export {
  PromiseId,
  getOwner,
  getPuppyName,
  getKind,
  getPetImage,
  getPuppyOwner,
  getPetGender,
  getDesc,
  setPhoneNumber,
  writeJsonFile,
};
