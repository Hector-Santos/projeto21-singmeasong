import {faker} from "@faker-js/faker";
import {prisma} from "../../../src/database";

export async function createRecommendation() {
  const urlStart = "https://www.youtube.com/"; 
  const youtubeLink:string = urlStart + faker.random.alphaNumeric(10);
  const recommendation = await prisma.recommendation.create({
    data: {
      name: faker.name.fullName(),
      youtubeLink:youtubeLink

    }
  });

  return recommendation;
}

export  async function prepareRecommendation() {
  const urlStart = "https://www.youtube.com/";
  const youtubeLink:string = urlStart + faker.random.alphaNumeric(10);
  const recommendation = {
    name: faker.name.fullName(),
    youtubeLink:youtubeLink
  };

  return recommendation;
}
