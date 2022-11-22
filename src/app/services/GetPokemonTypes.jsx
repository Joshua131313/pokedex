import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const useGetTypes = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setTypes(JSON.parse(localStorage.getItem("types")) || []);
  }, []);
  useEffect(() => {
    if (localStorage.getItem("types")) {
      axios.get(`https://pokeapi.co/api/v2/type`).then((results) => {
        setTypes(results.data.results);
      });
    }
  }, [types]);
  useEffect(() => {
    try {
      localStorage.setItem("types", JSON.stringify(types));
    } catch (e) {}
  }, [types]);

  return types;
};
export default useGetTypes;
