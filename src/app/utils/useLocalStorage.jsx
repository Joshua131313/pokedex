import React, { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [fetched, setFetched] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    setFetched(JSON.parse(localStorage.getItem(key)) || defaultValue);
  }, [key, defaultValue]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(fetched || defaultValue));
    } catch (e) {}
  }, [fetched, key, defaultValue]);

  return [fetched, setFetched];
};
export default useLocalStorage;
