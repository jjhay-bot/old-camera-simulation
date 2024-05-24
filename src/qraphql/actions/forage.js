import localforage from "localforage";

// BETTER to directly call localforage.getItem('key') due to await process
export const getForage = async (key) => {
  return await localforage.getItem(key);
};

export const setForage = async (key, value) => {
  return await localforage.setItem(key, value);
};

export const removeForage = async (key, value) => {
  return await localforage.removeItem(key);
};

export const cleanForage = async (key, value) => {
  return await localforage.clear();
};

export const setSession = (keyName, value) => {
  try {
    sessionStorage.setItem(keyName, value);
  } catch (error) {
    console.log("Error in Session storage", error);
  }
};
