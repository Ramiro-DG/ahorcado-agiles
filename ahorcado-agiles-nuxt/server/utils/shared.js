// server/utils/shared.js
let sharedData = {};

export const setSharedData = (key, value) => {
  sharedData[key] = value;
};

export const getSharedData = (key) => sharedData[key];

export const resetSharedData = () => {
  sharedData = {};
};
