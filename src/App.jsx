import React, { useEffect, useState } from "react";
import Block from "./Block";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // Initialize first block at a random position
    addBlock(null);
  }, []);

  const addBlock = (parentId) => {
    const newBlock = {
      id: blocks.length,
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      parentId,
    };

    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    if (parentId !== null) {
      setLines((prevLines) => [...prevLines, { from: parentId, to: newBlock.id }]);
    }
  };

  const moveBlock = (id, newPosition) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, position: newPosition } : block
      )
    );
  };

  return (
    <div>
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {lines.map((line, index) => {
          const fromBlock = blocks.find((block) => block.id === line.from);
          const toBlock = blocks.find((block) => block.id === line.to);
          return (
            <line
              key={index}
              x1={fromBlock.position.x}
              y1={fromBlock.position.y}
              x2={toBlock.position.x}
              y2={toBlock.position.y}
              stroke="black"
            />
          );
        })}
      </svg>
      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          position={block.position}
          onAddChild={addBlock}
          onMove={moveBlock}
        />
      ))}
    </div>
  );
}

export default App;
