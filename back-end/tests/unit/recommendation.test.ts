import {deleteAllData} from '../integration/factories/scenarioFactory';
import {jest} from '@jest/globals';


beforeEach(async () => {
  await deleteAllData();
  jest.resetAllMocks();
  jest.clearAllMocks();
});



describe('Testes unitários com recommendations', () => {
  it('Testa POST /recommendations passando uma recomendação válida',
   async () => {
    
    
  });
  
  
  

});


afterAll(async () => {
  await disconnectPrisma();
});
