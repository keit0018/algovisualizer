import React from 'react';

const Navbar = ({ algorithms, selectedAlgorithm, onSelectAlgorithm, arraySize, onArraySizeChange, onSubmit }) => {
  return (
    <nav className="navbar">
      <select value={selectedAlgorithm} onChange={onSelectAlgorithm}>
        {algorithms.map((algorithm, index) => (
          <option key={index} value={algorithm}>
            {algorithm}
          </option>
        ))}
      </select>
      <input type="range" min="5" max="100" value={arraySize} onChange={onArraySizeChange} />
      <button onClick={onSubmit}>Visualize</button>
    </nav>
  );
};

export default Navbar;