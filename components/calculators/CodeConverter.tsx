import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CodeConverter = () => {
  const [sourceLanguage, setSourceLanguage] = useState('javascript');
  const [targetLanguage, setTargetLanguage] = useState('python');
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'rust', label: 'Rust' },
    { value: 'cpp', label: 'C++' },
  ];

  const handleConvert = async () => {
      if (!sourceCode) {
        setConvertedCode('Please enter some code to convert.');
        return;
      }

      let result = '';

      const jsToPython = (code: string) => {
        let convertedCode = code;
        // Variable declarations (let, const, var to nothing)
        convertedCode = convertedCode.replace(/(let|const|var)\s+/g, '');
        // Console.log to print
        convertedCode = convertedCode.replace(/console\.log\((.*)\);/g, 'print($1)');
        // Function definitions (function name(args) { to def name(args):)
        convertedCode = convertedCode.replace(/function\s*([a-zA-Z0-9_]+)\s*\((.*)\)\s*\{/g, 'def $1($2):');
        // If/else statements (if (condition) { to if condition:)
        convertedCode = convertedCode.replace(/if\s*\((.*)\)\s*\{/g, 'if $1:');
        convertedCode = convertedCode.replace(/else\s*\{/g, 'else:');
        // For loops (for (let i = 0; i < n; i++) { to for i in range(n):) - very basic
        convertedCode = convertedCode.replace(/for\s*\(let\s*([a-zA-Z0-9_]+)\s*=\s*0;\s*\1\s*<\s*([a-zA-Z0-9_]+);\s*\1\+\+\)\s*\{/g, 'for $1 in range($2):');
        // While loops (while (condition) { to while condition:)
        convertedCode = convertedCode.replace(/while\s*\((.*)\)\s*\{/g, 'while $1:');
        // Remove closing braces
        convertedCode = convertedCode.replace(/\}/g, '');
        // Basic indentation (needs significant improvement for complex blocks)
        convertedCode = convertedCode.split('\n').map(line => {
          if (line.includes(':')) {
            return line;
          }
          return '    ' + line; // Simple indent for lines after a colon
        }).join('\n');
        return convertedCode;
      };

      const pythonToJs = (code: string) => {
        let convertedCode = code;
        // Print to console.log
        convertedCode = convertedCode.replace(/print\((.*)\)/g, 'console.log($1);');
        // Function definitions (def name(args): to function name(args) {)
        convertedCode = convertedCode.replace(/def\s*([a-zA-Z0-9_]+)\s*\((.*)\):/g, 'function $1($2) {');
        // If/else statements (if condition: to if (condition) {)
        convertedCode = convertedCode.replace(/if\s*(.*):/g, 'if ($1) {');
        convertedCode = convertedCode.replace(/else:/g, 'else {');
        // For loops (for i in range(n): to for (let i = 0; i < n; i++) {) - very basic
        convertedCode = convertedCode.replace(/for\s*([a-zA-Z0-9_]+)\s*in\s*range\((.*)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {');
        // While loops (while condition: to while (condition) {)
        convertedCode = convertedCode.replace(/while\s*(.*):/g, 'while ($1) {');
        // Add closing braces and semicolons (very rudimentary)
        convertedCode = convertedCode.split('\n').map(line => {
          if (line.trim().startsWith('function') || line.trim().startsWith('if') || line.trim().startsWith('else') || line.trim().startsWith('for') || line.trim().startsWith('while')) {
            return line;
          }
          if (line.trim() !== '' && !line.trim().endsWith('{') && !line.trim().endsWith('}')) {
            return line + ';';
          }
          return line;
        }).join('\n');
        convertedCode = convertedCode.replace(/(\s*)(function|if|else|for|while)(.*)\{/g, '$1$2$3{\n$1    '); // Basic indentation
        convertedCode = convertedCode.replace(/^(\s*[^\s{}]*);$/gm, (match, p1) => {
          if (p1.trim().startsWith('console.log')) {
            return match;
          }
          return p1 + ';';
        });
        convertedCode = convertedCode.replace(/(\s*)\}$/gm, '$1}'); // Ensure closing braces are on their own line
        return convertedCode;
      };

      if (sourceLanguage === 'javascript' && targetLanguage === 'python') {
        const scriptRegex = /<script>([\s\S]*?)<\/script>/;
        const match = sourceCode.match(scriptRegex);
        if (match && match[1]) {
          const jsCode = match[1];
          const pythonCode = jsToPython(jsCode);
          result = sourceCode.replace(scriptRegex, `<script type="text/python">\n${pythonCode}\n<\/script>`);
        } else {
          result = jsToPython(sourceCode);
        }
      } else if (sourceLanguage === 'python' && targetLanguage === 'javascript') {
        // For Python to JS, we assume the input is pure Python or Python within a specific tag if needed.
        // For now, let's assume pure Python for simplicity.
        result = pythonToJs(sourceCode);
      } else {
        result = `// Conversion from ${sourceLanguage} to ${targetLanguage} not supported yet.`;
      }
      setConvertedCode(result);
    };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-black dark:text-white">Code Converter</CardTitle>
        <CardDescription className="text-center">Convert code between different programming languages.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="sourceLanguage" className="text-gray-700 dark:text-gray-300">Source Language</Label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                <SelectValue placeholder="Select source language" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="targetLanguage" className="text-gray-700 dark:text-gray-300">Target Language</Label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="sourceCode" className="text-gray-700 dark:text-gray-300">Source Code</Label>
          <Textarea
            id="sourceCode"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Enter your code here..."
            rows={10}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>

        <Button
          onClick={handleConvert}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Convert Code
        </Button>

        <div>
          <Label htmlFor="convertedCode" className="text-gray-700 dark:text-gray-300">Converted Code</Label>
          <Textarea
            id="convertedCode"
            value={convertedCode}
            readOnly
            rows={10}
            className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeConverter;