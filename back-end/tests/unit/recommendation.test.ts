/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import {deleteAllData} from "../factories/scenarioFactory";
import {jest} from "@jest/globals";
import {disconnectPrisma} from "../factories/scenarioFactory";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import {recommendationService} from "../../src/services/recommendationsService";
import { prepareRecommendation, mockCreateRecommendation, mockCreateRecommendationArray} from "../factories/recommendationFactory";
import { faker } from "@faker-js/faker";



beforeEach(async () => {
  await deleteAllData();
  jest.resetAllMocks();
  jest.clearAllMocks();
});



describe("Testes unitários com recommendationService", () => {
  it("Testa criação de recommendation com resultado positivo",
    async () => {

      const createRecommendationData = await prepareRecommendation();

      jest.
        spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => {});

      jest.
        spyOn(recommendationRepository, "create")
        .mockImplementationOnce((): any => {});

      await recommendationService.insert(createRecommendationData);

      expect(recommendationRepository.findByName).toBeCalled();
      expect(recommendationRepository.create).toBeCalled();
    });

  it("Testa falha na criação de recommendation por repetição",
    async () => {

      const createRecommendationData = await prepareRecommendation();

      jest.
        spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => {
          return createRecommendationData;
        });

      const promise = recommendationService.insert(createRecommendationData);

      expect(recommendationRepository.findByName).toBeCalled();
      expect(promise).rejects.toEqual({
        type:"conflict",
        message:"Recommendations names must be unique"
      });
      expect(recommendationRepository.create).not.toBeCalled();
    });

  it("Testa upvote de recommendation com resultado positivo",
    async () => {
      const recommendationData = await mockCreateRecommendation();
      jest.
        spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {return recommendationData;});

      jest.
        spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => {});

      await recommendationService.upvote(recommendationData.id);

      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
    });

  it("Testa upvote de recommendation com erro de recomendação não encontrada",
    async () => {
      jest.
        spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {});

      const promise = recommendationService.upvote(1);

      expect(recommendationRepository.find).toBeCalled();
      expect(promise).rejects.toEqual({
        message: "",
        type: "not_found",
      });
      expect(recommendationRepository.updateScore).not.toBeCalled();
    });

  it("Testa downvote de recommendation com resultado positivo",
    async () => {
      const recommendationData = await mockCreateRecommendation();
      jest.
        spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {return recommendationData;});

      jest.
        spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => {return recommendationData;});

      await recommendationService.downvote(recommendationData.id);

      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
    });

  it("Testa downvote de recommendation com score menor que -5",
    async () => {
      const recommendationData = await mockCreateRecommendation();
      jest.
        spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {return recommendationData;});

      recommendationData.score = -6;
       
      jest.
        spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => {return recommendationData;});

      jest.
        spyOn(recommendationRepository, "remove")
        .mockImplementationOnce((): any => {});

      await recommendationService.downvote(recommendationData.id);

      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
      expect(recommendationRepository.remove).toBeCalled();
    });

  it("Testa downvote de recommendation com erro de recomendação não encontrada",
    async () => {
      jest.
        spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {});

      const promise = recommendationService.downvote(1);

      expect(recommendationRepository.find).toBeCalled();
      expect(promise).rejects.toEqual({
        message: "",
        type: "not_found",
      });
      expect(recommendationRepository.updateScore).not.toBeCalled();
    });

  it("Testa get de recommendations",
    async () => {

      jest.
        spyOn(recommendationRepository, "findAll")
        .mockImplementationOnce((): any => {});


      await recommendationService.get();

      expect(recommendationRepository.findAll).toBeCalled();
    });


  it("Testa get de recommendations",
    async () => {

      jest.
        spyOn(recommendationRepository, "findAll")
        .mockImplementationOnce((): any => {});


      await recommendationService.get();

      expect(recommendationRepository.findAll).toBeCalled();
    });

  it("Testa get de recommendations",
    async () => {

      jest.
        spyOn(recommendationRepository, "findAll")
        .mockImplementationOnce((): any => {});


      await recommendationService.get();

      expect(recommendationRepository.findAll).toBeCalled();
    });
  it("Testa get de top recommendations",
    async () => {

      jest.
        spyOn(recommendationRepository, "getAmountByScore")
        .mockImplementationOnce((): any => {});

      await recommendationService.getTop(faker.datatype.number({min:1, max:10}));

      expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

  it("Testa get randomico de recommendations com random inferior a 0,7",
    async () => {
      const recommendationArray = mockCreateRecommendationArray();
      jest.
        spyOn(Math, "random")
        .mockImplementation((): any => {return 0.5;});
      jest.
        spyOn(recommendationRepository, "findAll")
        .mockImplementationOnce((): any => {return recommendationArray;});

      const result = await recommendationService.getRandom();
      console.log(result.id);

      expect(recommendationRepository.findAll).toBeCalled();
      expect(result.id).toEqual(6);
    });
  it("Testa get randomico de recommendations com random superior a 0,7",
    async () => {
      const recommendationArray = mockCreateRecommendationArray();
      jest.
        spyOn(Math, "random")
        .mockImplementation((): any => {return 0.9;});
      jest.
        spyOn(recommendationRepository, "findAll")
        .mockImplementationOnce((): any => {return recommendationArray;});

      const result = await recommendationService.getRandom();
      console.log(result.id);

      expect(recommendationRepository.findAll).toBeCalled();
      expect(result.id).toEqual(10);
    });
  it("Testa get randomico de recommendations com retorno vazio da funçao findAll",
    async () => {

      jest.
        spyOn(Math, "random")
        .mockImplementation((): any => {return 0.9;});
      jest.
        spyOn(recommendationRepository, "findAll")
        .mockImplementation((): any => {return [];});
      

      const promise = recommendationService.getRandom();
      
      expect(promise).rejects.toEqual({
        message: "",
        type: "not_found",
      });
      expect(recommendationRepository.findAll).toBeCalled();
      
    });

      

});


afterAll(async () => {
  await disconnectPrisma();
});
