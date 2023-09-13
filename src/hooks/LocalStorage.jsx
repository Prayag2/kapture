export const useLocalStorage = (key, defaultValue) => {
  const deleteValue = () => {
    localStorage.removeItem(key);
  };
  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getValue = () => {
    const result = localStorage.getItem(key);
    if (result) return JSON.parse(result);
    else return defaultValue;
  };
  return [getValue(), setValue, deleteValue];
};
