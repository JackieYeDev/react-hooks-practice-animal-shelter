import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFindPetsClick() {
    let url =
      filters.type === "all"
        ? `http://localhost:3001/pets`
        : `http://localhost:3001/pets?type=${filters.type}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setPets(data));
  }

  function handleChangeType(e) {
    setFilters({ type: e.target.value });
  }

  function onAdoptPet(id) {
    console.log(`[${id}] : Adopt fired!`);
    const selectedPet = pets.find(pet => pet.id === id);
    selectedPet.isAdopted = true;
    setPets([...pets, selectedPet]);
  }

  return (
    <div className='ui container'>
      <header>
        <h1 className='ui dividing header'>React Animal Shelter</h1>
      </header>
      <div className='ui container'>
        <div className='ui grid'>
          <div className='four wide column'>
            <Filters
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className='twelve wide column'>
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
