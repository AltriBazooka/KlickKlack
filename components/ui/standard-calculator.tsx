import React, { useState } from 'react';

interface StandardCalculatorProps {
  // Define props here if needed
}

const StandardCalculator: React.FC<StandardCalculatorProps> = () => {
  const [input, setInput] = useState<string>('0');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);
  const [memory, setMemory] = useState<number>(0);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('0');
      setCurrentValue('');
      setOperator(null);
    } else if (value === 'CE') {
      setInput('0');
    } else if (value === 'backspace') {
      setInput(input.length > 1 ? input.slice(0, -1) : '0');
    } else if (value === '=') {
      if (currentValue && operator && input !== '0') {
        try {
          let result: number;
          const prev = parseFloat(currentValue);
          const current = parseFloat(input);

          switch (operator) {
            case '+':
              result = prev + current;
              break;
            case '-':
              result = prev - current;
              break;
            case '×':
              result = prev * current;
              break;
            case '÷':
              result = prev / current;
              break;
            case '%':
              result = prev % current;
              break;
            default:
              result = current;
          }
          setInput(result.toString());
          setCurrentValue('');
          setOperator(null);
        } catch (error) {
          setInput('Error');
        }
      }
    } else if (['+', '-', '×', '÷', '%'].includes(value)) {
      if (currentValue && operator && input !== '0') {
        // If there's a pending operation, calculate it first
        try {
          let result: number;
          const prev = parseFloat(currentValue);
          const current = parseFloat(input);

          switch (operator) {
            case '+':
              result = prev + current;
              break;
            case '-':
              result = prev - current;
              break;
            case '×':
              result = prev * current;
              break;
            case '÷':
              result = prev / current;
              break;
            case '%':
              result = prev % current;
              break;
            default:
              result = current;
          }
          setCurrentValue(result.toString());
          setInput('0');
          setOperator(value);
        } catch (error) {
          setInput('Error');
        }
      } else {
        setCurrentValue(input);
        setOperator(value);
        setInput('0');
      }
    } else if (value === '+/-') {
      setInput((parseFloat(input) * -1).toString());
    } else if (value === '1/x') {
      setInput((1 / parseFloat(input)).toString());
    } else if (value === 'x²') {
      setInput((parseFloat(input) * parseFloat(input)).toString());
    } else if (value === '³√x') {
      setInput(Math.cbrt(parseFloat(input)).toString());
    } else if (value === 'MC') {
      setMemory(0);
    } else if (value === 'MR') {
      setInput(memory.toString());
    } else if (value === 'M+') {
      setMemory(memory + parseFloat(input));
    } else if (value === 'M-') {
      setMemory(memory - parseFloat(input));
    } else if (value === 'MS') {
      setMemory(parseFloat(input));
    } else if (value === 'M^') {
      // This button's functionality is unclear from the image. Assuming it's for memory clear.
      // If it has a different function, it needs to be clarified.
      setMemory(0);
    } else {
      if (input === '0' && value !== '.') {
        setInput(value);
      } else {
        setInput(input + value);
      }
    }
  };

  const buttons = [
    { label: 'MC', value: 'MC', className: 'text-gray-600 dark:text-gray-300' },
    { label: 'MR', value: 'MR', className: 'text-gray-600 dark:text-gray-300' },
    { label: 'M+', value: 'M+', className: 'text-gray-600 dark:text-gray-300' },
    { label: 'M-', value: 'M-', className: 'text-gray-600 dark:text-gray-300' },
    { label: 'MS', value: 'MS', className: 'text-gray-600 dark:text-gray-300' },
    { label: 'M^', value: 'M^', className: 'text-gray-600 dark:text-gray-300' },

    { label: '%', value: '%' },
    { label: 'CE', value: 'CE' },
    { label: 'C', value: 'C' },
    { label: '⌫', value: 'backspace', icon: true },

    { label: '1/x', value: '1/x' },
    { label: 'x²', value: 'x²' },
    { label: '³√x', value: '³√x' },
    { label: '÷', value: '÷' },

    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '×', value: '×' },

    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '-', value: '-' },

    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '+', value: '+' },

    { label: '+/-', value: '+/-' },
    { label: '0', value: '0' },
    { label: '.', value: '.' },
    { label: '=', value: '=', className: 'col-span-1 bg-blue-500 hover:bg-blue-600' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Calculator display */}
      <div className="col-span-4 bg-gray-200 dark:bg-gray-700 p-4 rounded-md text-right text-black dark:text-white text-3xl font-mono mb-2">
        <div className="text-gray-500 dark:text-gray-400 text-sm">{currentValue} {operator}</div>
        <div>{input}</div>
      </div>

      {/* Calculator buttons */}
      {buttons.map((button) => (
        <button
          key={button.label}
          onClick={() => handleButtonClick(button.value)}
          className={`col-span-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 p-4 rounded-md text-black dark:text-white text-xl ${button.className || ''}`}
        >
          {button.icon ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" /></svg> : button.label}
        </button>
      ))}
    </div>
  );
};

export default StandardCalculator;