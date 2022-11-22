import React, { useState, useEffect } from "react";

const useGetShinyArray = () => {
  const [shinyArray, setShinyArray] = useState(
    JSON.parse(localStorage.getItem("shinyArray")) || []
  );

  useEffect(() => {
    try {
      localStorage.setItem("shinyArray", JSON.stringify(shinyArray || []));
    } catch (e) {}
  }, [shinyArray]);

  return { shinyArray, setShinyArray };
};
export default useGetShinyArray;
