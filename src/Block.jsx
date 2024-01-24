import React, { useEffect, useState } from "react";

function Block({ id, onAddChild, onMove, position }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrag = (e) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      onMove(id, { x: newX, y: newY });
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', endDrag);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
    };
  }, [isDragging, onDrag, endDrag]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y + "px",
        left: position.x + "px",
        cursor: isDragging ? "grabbing" : "grab",
        borderRadius: "5px",
        padding: "2rem",
        background: "red",
      }}
      onMouseDown={startDrag}
    >
      <button  style={{
        background: "lightpink",
        border: "none",
        padding: "0.5rem 2rem",
      }} onClick={() => onAddChild(id)}>+</button>
    </div>
  );
}

export default Block;
