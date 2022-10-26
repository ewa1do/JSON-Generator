import { printProgress } from './config';
import {
  PromiseId,
  getDesc,
  getKind,
  getOwner,
  getPetGender,
  getPetImage,
  getPuppyName,
  setPhoneNumber,
  writeJsonFile,
} from './promises';

interface PuppyAPIResponse {
  id: string;
  name: string;
  description: string;
  kind: string;
  gender: string;
  image: string;
  owner: string;
  phoneNumber: string;
}

let puppyData: PuppyAPIResponse[] = [];
const limit = 100;

(async function () {
  for (let i = 0; i < limit; i++) {
    const owner = await getOwner();
    const name = await getPuppyName();
    const id = await PromiseId();
    const kind = await getKind();
    const image = await getPetImage(kind);
    const gender = await getPetGender();
    const description = await getDesc();
    const phoneNumber = await setPhoneNumber();

    const data: PuppyAPIResponse = {
      id,
      description,
      gender,
      image,
      kind,
      name: name.toLowerCase().trim(),
      owner: owner.trim(),
      phoneNumber,
    };

    puppyData.push(data);
    printProgress(i + 1);
  }

  await writeJsonFile(
    `${__dirname}/data/output/apitest.json`,
    JSON.stringify(puppyData)
  );
})();
