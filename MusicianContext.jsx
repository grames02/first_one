// src/MusicianContext.js
import React, { createContext, useEffect, useState } from "react";

export const MusicianContext = createContext();

const musicians = [
  "Billy Joel",
  "The Beatles",
  "The Beach Boys",
  "The Killers",
  "Bruce Springsteen",
  "Electric Light Orchestra",
  "Simon and Garfunkel",
  "Michael Jackson",
  "Fleetwood Mac",
  "Oasis"
];

function getTodayString() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export const MusicianProvider = ({ children }) => {
  const [musician, setMusician] = useState("");

  useEffect(() => {
    const today = getTodayString();
    const storedDate = localStorage.getItem("musicianDate");
    const storedIndex = localStorage.getItem("musicianIndex");

    let index;

    if (storedDate !== today) {
      const previousIndex = storedIndex !== null ? parseInt(storedIndex) : -1;
      do {
        index = Math.floor(Math.random() * musicians.length);
      } while (index === previousIndex);

      localStorage.setItem("musicianDate", today);
      localStorage.setItem("musicianIndex", index);
    } else {
      index = parseInt(storedIndex);
    }

    setMusician(musicians[index]);
  }, []);

  return (
    <MusicianContext.Provider value={{ musician }}>
      {children}
    </MusicianContext.Provider>
  );
};
