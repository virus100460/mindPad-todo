import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const Card = ({ data = {}, reference, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={reference} // Apply the constraints to the parent container
      whileDrag={{ scale: 1.05 }} // Slightly scale up the card while dragging
      dragElastic={0.2} // Set how elastic the drag is
      onDragStart={() => setIsDragging(true)} // Update state when dragging starts
      onDragEnd={() => setIsDragging(false)} // Reset state when dragging ends
      className="relative flex-shrink-0 w-full sm:w-60 md:w-72 lg:w-80 h-auto sm:h-80 md:h-96 rounded-[40px] bg-zinc-900/90 text-white px-6 py-8 sm:px-8 sm:py-10 overflow-hidden"
      style={{
        // Only apply z-index when dragging
        zIndex: isDragging ? 1000 : "3",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white bg-zinc-800 rounded-full p-2 hover:bg-zinc-700"
        aria-label="Close card"
      >
        <IoClose size="1.5em" />
      </button>

      <FaRegFileAlt />
      <p className="break-all text-xs sm:text-sm md:text-base leading-tight mt-5 font-semibold">
        {data.desc || "No description available"}
      </p>

      {/* Footer */}
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between px-6 sm:px-8 py-3 mb-3">
          <h5 className="text-xs sm:text-sm">
            {data.date || "No date available"}
          </h5>
        </div>

        {data.tag?.isOpen && (
          <div
            className="tag w-full py-4 flex items-center justify-center"
            style={{ backgroundColor: data.tag?.tagColor || "#00bfff" }}
          >
            <h3 className="text-xs sm:text-sm md:text-base font-semibold">
              {data.tag?.tagTitle || "No title"}
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
