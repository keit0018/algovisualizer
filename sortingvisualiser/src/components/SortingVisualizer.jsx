import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState([]);

  const algorithms = ['Bubble Sort', 'Merge Sort', 'Quick Sort'];

  const generateRandomArray = (size) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 5);
    }
    console.log(newArray);
    return newArray;
  };

  useEffect(() => {
    setArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleArraySizeChange = (e) => {
    setArraySize(parseInt(e.target.value));
  };

  const bubbleSort = async () => {
    const arrayCopy = [...array]; // Create a copy of the array to track changes

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        // Highlight elements being compared
        // Update arrayCopy to visualize swapping elements
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          let temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          // Update state to reflect changes in the visualization
          setArray([...arrayCopy]);
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 50) // Adjust speed of visualization (in milliseconds)
          );
        }
      }
    }
  };

  // Merge Sort algorithm implementation
  const mergeSort = async (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const leftSorted = await mergeSort(left);
    const rightSorted = await mergeSort(right);

    return merge(leftSorted, rightSorted);
  };

  const merge = async (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // Add remaining elements from left and right subarrays
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    // Update array to visualize merging
    for (let i = 0; i < result.length; i++) {
      array[i] = result[i];
      await new Promise((resolve) =>
        setTimeout(() => {
          setArray([...array]);
          resolve();
        }, 100) // Adjust speed of visualization (in milliseconds)
      );
    }

    return result;
  };


  const quickSort = async (arr, start, end) => {
    if (start >= end) {
      return;
    }

    let index = await partition(arr, start, end);
    await quickSort(arr, start, index - 1);
    await quickSort(arr, index + 1, end);
  };

  const partition = async (arr, start, end) => {
    let pivot = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      if (arr[i] < pivot) {
        // Swap elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

        // Update state to visualize swapping
        setArray([...arr]);

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 100) // Adjust speed of visualization (in milliseconds)
        );

        pivotIndex++;
      }
    }

    // Swap pivot with pivotIndex element
    [arr[end], arr[pivotIndex]] = [arr[pivotIndex], arr[end]];

    // Update state to visualize final placement of pivot
    setArray([...arr]);

    return pivotIndex;
  };


  const handleSubmit = async () => {
    // Algorithm visualization logic
    // Update 'array' state to visualize sorting process

    if (selectedAlgorithm === 'Bubble Sort') {
        await bubbleSort();
    }

    if (selectedAlgorithm === 'Merge Sort') {
        await mergeSort(array);
    }

    if (selectedAlgorithm === 'Quick Sort') {
        await quickSort(array, 0, array.length - 1);
    }

  };

  return (
    <div className="sorting-visualizer">
        <h2>Sorting Visualizer</h2>
      <Navbar
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={handleAlgorithmChange}
        arraySize={arraySize}
        onArraySizeChange={handleArraySizeChange}
        onSubmit={handleSubmit}
      />
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;