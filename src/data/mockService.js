
export const MockServices = {
  options: [{
    value: 'service1',
    label: 'userService',
    index: 0,
    changePercent: 0,
    pressRate: 0.1,
    maxCount: 8
  }, {
    value: 'service2',
    label: 'imageService',
    index: 1,
    changePercent: 0,
    pressRate: 1,
    maxCount: 6
  }],
  value: 'service1'
};


export function getService(serviceValue) {
  return MockServices.options.find((option) => option.value === serviceValue);
}
