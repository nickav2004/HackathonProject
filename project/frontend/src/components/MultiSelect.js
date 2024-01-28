import React, { useState, useEffect } from "react";

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [chatResponse, setChatResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/materials")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          selected: false, // Assuming each item has at least an 'id' and 'name'
        }));
        setMaterials(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  const handleCheck = (id) => {
    const updatedMaterials = materials.map((material) => {
      if (material.id === id) {
        return { ...material, selected: !material.selected };
      }
      return material;
    });
    setMaterials(updatedMaterials);
  };

  const handleSubmit = () => {
    setLoading(true);

    const selectedMaterials = materials.filter((material) => material.selected);
    console.log("Selected Materials:", selectedMaterials);
    fetch("http://127.0.0.1:8000/api/get-projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ materials: selectedMaterials }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the project ideas state with the data returned from the API
        setChatResponse(data.chatResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setLoading(false);
  };

  return (
    <div className="container">
      {materials.map((material) => (
        <div key={material.id}>
          <input
            type="checkbox"
            id={`material-${material.id}`}
            checked={material.selected}
            onChange={() => handleCheck(material.id)}
          />
          <label htmlFor={`material-${material.id}`}>{material.name}</label>
        </div>
      ))}
      <br />
      <button className="btn btn-dark" onClick={handleSubmit}>
        Generate
      </button>
      <br />
      <br />
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: chatResponse }}></div>
        )}
      </div>
    </div>
  );
}

export default MaterialList;
