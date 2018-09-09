export function mockService(serviceClass: any): any {
  const props = Object.getOwnPropertyNames(serviceClass.prototype).slice(1);
  return jasmine.createSpyObj(props);
}
