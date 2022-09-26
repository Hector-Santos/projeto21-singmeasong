import * as e2eRepository from "../repositories/e2eRepository.js";
import { faker } from "@faker-js/faker";
import { recommendationRepository } from "../repositories/recommendationRepository.js";

export async function truncate() {
  await e2eRepository.truncate();
}


export async function create() {
  const urlStart = "https://www.youtube.com/";
  const youtubeLink = urlStart + faker.random.alphaNumeric(10);
  const recommendation = {
    name: faker.name.fullName(),
    youtubeLink:youtubeLink
  };
  
  recommendationRepository.create(recommendation);
  
  
}