import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color"; // Import color picker
import Card from "./Card"; // Import the default export from Card.jsx

const Forground = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("cards");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [newCardData, setNewCardData] = useState({
    desc: "",
    date: new Date().toLocaleDateString(),
    tagTitle: "",
    tagColor: "#00bfff", // Default color
    close: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [charLimitError, setCharLimitError] = useState(false); // Track character limit error

  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "desc") {
      if (value.length <= 200) {
        setCharLimitError(false);
        setNewCardData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        setCharLimitError(true);
      }
    } else {
      setNewCardData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddCard = () => {
    if (!newCardData.desc || !newCardData.date || !newCardData.tagTitle) {
      alert("Please fill out all fields!");
      return;
    }

    const newCard = {
      id: Date.now(),
      ...newCardData,
      tag: {
        isOpen: true,
        tagTitle: newCardData.tagTitle,
        tagColor: newCardData.tagColor,
      },
    };

    const updatedData = [...data, newCard];
    setData(updatedData);

    localStorage.setItem("cards", JSON.stringify(updatedData));

    setIsModalOpen(false);

    setNewCardData({
      desc: "",
      date: new Date().toLocaleDateString(),
      tagTitle: "",
      tagColor: "#00bfff",
      close: true,
    });
  };

  const handleCloseCard = (id) => {
    const updatedData = data.filter((card) => card.id !== id);
    setData(updatedData);
    localStorage.setItem("cards", JSON.stringify(updatedData));
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-screen flex gap-10 flex-wrap p-5 overflow-auto"
      >
        {data.map((item) => (
          <Card
            key={item.id}
            data={item}
            onClose={() => handleCloseCard(item.id)}
            reference={containerRef}
          />
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="z-[999] absolute bottom-10 right-10 p-3 bg-blue-500 text-white rounded-full shadow-lg"
      >
        Add Card
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="text-center text-xl font-semibold mb-4">
              Add New Card
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="desc"
                placeholder="Description (max 200 characters)"
                value={newCardData.desc}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
              />
              {charLimitError && (
                <p className="text-red-500 text-sm">
                  Description cannot exceed 200 characters.
                </p>
              )}
              <input
                type="text"
                name="date"
                placeholder="Date (MM/DD/YYYY)"
                value={newCardData.date}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
              />
              <input
                type="text"
                name="tagTitle"
                placeholder="Title"
                value={newCardData.tagTitle}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
              />
              <div>
                <h4>Select Tag Color</h4>
                <SketchPicker
                  color={newCardData.tagColor}
                  onChangeComplete={(color) =>
                    setNewCardData((prevState) => ({
                      ...prevState,
                      tagColor: color.hex,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCard}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Forground;
