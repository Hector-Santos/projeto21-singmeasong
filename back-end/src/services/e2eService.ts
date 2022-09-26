import * as e2eRepository from "../repositories/e2eRepository";
import { recommendationRepository } from "../repositories/recommendationRepository.js";
import {prepareRecommendation} from "../../tests/factories/recommendationFactory";
export async function truncate() {
  await e2eRepository.truncate();
}

export async function populate() {

  for(let i = 0; i<10; i++){
    const createRecommendationData = await prepareRecommendation();

    await recommendationRepository.create(createRecommendationData);
   
  }
  
}
