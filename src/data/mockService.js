
export const MockServices = {
  options: [{
    value: 'service1',
    label: 'userService',
    index: 0,
    changePercent: 0,
    flowRate: 20,
    maxCount: 10,
    images: {
      optionsGo: [],
      optionsNode: []
    }
  }, {
    value: 'service2',
    label: 'imageService',
    index: 1,
    changePercent: 0,
    flowRate: 30,
    maxCount: 10,
    images: {
      optionsGo: [],
      optionsNode: []
    }
  }],
  value: 'service1'
};


export function getService(serviceValue) {
  return MockServices.options.find((option) => option.value === serviceValue);
}
