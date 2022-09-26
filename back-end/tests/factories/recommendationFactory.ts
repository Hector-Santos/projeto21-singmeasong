import {faker} from "@faker-js/faker";
import {prisma} from "../../src/database";

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

export async function mockCreateRecommendation() {
  const urlStart = "https://www.youtube.com/"; 
  const youtubeLink:string = urlStart + faker.random.alphaNumeric(10);
  const recommendation = {
    id:faker.datatype.number({min: 1, max: 10}),
    name: faker.name.fullName(),
    youtubeLink:youtubeLink,
    score:faker.datatype.number({min: 0, max: 100}),
  };

  return recommendation;
}


export async function mockCreateRecommendationArray() {
  const urlStart = "https://www.youtube.com/"; 
  const recommendations = [];
  for (let i = 1; i <11; i++){
    const youtubeLink:string = urlStart + faker.random.alphaNumeric(10);
    recommendations.push( {
      id: i,
      name: faker.name.fullName(),
      youtubeLink:youtubeLink,
      score:faker.datatype.number({min: 0, max: 20})
    });
  }
  return recommendations;
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
