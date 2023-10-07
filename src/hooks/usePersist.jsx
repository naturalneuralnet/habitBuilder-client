// using localstorage to persist state

/// very much like a local storage component

// just for persisting

import { useState, useEffect } from "react";

const usePersist = () => {
  /// sets the persist from localstorage

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  ); // if persist changes it sets the changed persist in localstorage

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
