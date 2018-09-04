import { TrucksModule } from './trucks.module';

describe('TrucksModule', () => {
  let trucksModule: TrucksModule;

  beforeEach(() => {
    trucksModule = new TrucksModule();
  });

  it('should create an instance', () => {
    expect(trucksModule).toBeTruthy();
  });
});
