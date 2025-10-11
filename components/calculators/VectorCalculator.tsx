import React, { useState } from 'react';

const VectorCalculator = () => {
  const [vector1, setVector1] = useState<number[]>([0, 0, 0]);
  const [vector2, setVector2] = useState<number[]>([0, 0, 0]);
  const [dimension, setDimension] = useState<2 | 3>(2);

  const parseVectorInput = (input: string): number[] => {
    return input.split(',').map(Number).filter(n => !isNaN(n));
  };

  const handleVectorChange = (e: React.ChangeEvent<HTMLInputElement>, vectorNum: 1 | 2) => {
    const parsed = parseVectorInput(e.target.value);
    if (vectorNum === 1) {
      setVector1(parsed);
    } else {
      setVector2(parsed);
    }
  };

  const calculateMagnitude = (vec: number[]): number => {
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  };

  const addVectors = (vecA: number[], vecB: number[]): number[] => {
    return vecA.map((val, i) => val + (vecB[i] || 0));
  };

  const subtractVectors = (vecA: number[], vecB: number[]): number[] => {
    return vecA.map((val, i) => val - (vecB[i] || 0));
  };

  const dotProduct = (vecA: number[], vecB: number[]): number => {
    return vecA.reduce((sum, val, i) => sum + val * (vecB[i] || 0), 0);
  };

  const crossProduct = (vecA: number[], vecB: number[]): number[] => {
    if (vecA.length !== 3 || vecB.length !== 3) {
      return []; // Cross product is only defined for 3D vectors
    }
    return [
      vecA[1] * vecB[2] - vecA[2] * vecB[1],
      vecA[2] * vecB[0] - vecA[0] * vecB[2],
      vecA[0] * vecB[1] - vecA[1] * vecB[0],
    ];
  };

  const angleBetweenVectors = (vecA: number[], vecB: number[]): number => {
    const dp = dotProduct(vecA, vecB);
    const magA = calculateMagnitude(vecA);
    const magB = calculateMagnitude(vecB);
    if (magA === 0 || magB === 0) return 0; // Avoid division by zero
    return Math.acos(dp / (magA * magB)) * (180 / Math.PI); // Angle in degrees
  };

  const displayVector = (vec: number[]) => {
    return `(${vec.slice(0, dimension).join(', ')})`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vector Calculator</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Dimension:</label>
        <select
          value={dimension}
          onChange={(e) => setDimension(Number(e.target.value) as 2 | 3)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value={2}>2D</option>
          <option value={3}>3D</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Vector 1 (e.g., 1,2 or 1,2,3):</label>
        <input
          type="text"
          value={vector1.slice(0, dimension).join(',')}
          onChange={(e) => handleVectorChange(e, 1)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., 1,2 or 1,2,3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Vector 2 (e.g., 4,5 or 4,5,6):</label>
        <input
          type="text"
          value={vector2.slice(0, dimension).join(',')}
          onChange={(e) => handleVectorChange(e, 2)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., 4,5 or 4,5,6"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Results:</h2>
        <p><strong>Vector 1:</strong> {displayVector(vector1)}</p>
        <p><strong>Vector 2:</strong> {displayVector(vector2)}</p>
        <p><strong>Magnitude of Vector 1:</strong> {calculateMagnitude(vector1.slice(0, dimension)).toFixed(2)}</p>
        <p><strong>Magnitude of Vector 2:</strong> {calculateMagnitude(vector2.slice(0, dimension)).toFixed(2)}</p>
        <p><strong>Vector 1 + Vector 2:</strong> {displayVector(addVectors(vector1.slice(0, dimension), vector2.slice(0, dimension)))}</p>
        <p><strong>Vector 1 - Vector 2:</strong> {displayVector(subtractVectors(vector1.slice(0, dimension), vector2.slice(0, dimension)))}</p>
        <p><strong>Dot Product:</strong> {dotProduct(vector1.slice(0, dimension), vector2.slice(0, dimension)).toFixed(2)}</p>
        {dimension === 3 && (
          <p><strong>Cross Product:</strong> {displayVector(crossProduct(vector1, vector2))}</p>
        )}
        <p><strong>Angle Between Vectors:</strong> {angleBetweenVectors(vector1.slice(0, dimension), vector2.slice(0, dimension)).toFixed(2)} degrees</p>
      </div>
    </div>
  );
};

export default VectorCalculator;