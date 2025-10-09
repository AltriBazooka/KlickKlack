'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CopyIcon } from "lucide-react";

const NumberGenerator = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [allowRepeats, setAllowRepeats] = useState(false);
  const [generateMultiple, setGenerateMultiple] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    const newResults: number[] = [];
    const availableNumbers: number[] = [];
    for (let i = min; i <= max; i++) {
      availableNumbers.push(i);
    }

    if (!allowRepeats && generateMultiple > (max - min + 1)) {
      alert("Cannot generate more unique numbers than the range allows.");
      return;
    }

    for (let i = 0; i < generateMultiple; i++) {
      if (availableNumbers.length === 0 && !allowRepeats) {
        break;
      }
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const randomNumber = allowRepeats ? Math.floor(Math.random() * (max - min + 1)) + min : availableNumbers[randomIndex];
      newResults.push(randomNumber);

      if (!allowRepeats) {
        availableNumbers.splice(randomIndex, 1);
      }
    }
    setResults(newResults);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Number Generator 🔢</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="min">Min</Label>
            <Input
              id="min"
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="max">Max</Label>
            <Input
              id="max"
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowRepeats"
              checked={allowRepeats}
              onCheckedChange={(checked) => setAllowRepeats(checked as boolean)}
            />
            <Label htmlFor="allowRepeats">Allow Repeats</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="generateMultiple">Generate Multiple</Label>
            <Input
              id="generateMultiple"
              type="number"
              min="1"
              value={generateMultiple}
              onChange={(e) => setGenerateMultiple(Number(e.target.value))}
            />
          </div>
          <Button onClick={generateNumbers}>Generate</Button>
          {results.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="text-lg font-semibold">Results:</h3>
              <p>{results.join(', ')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const NameGenerator = () => {
  const [nameList, setNameList] = useState("John, Jane, Peter, Mary");
  const [result, setResult] = useState<string | null>(null);

  const generateName = () => {
    const names = nameList.split(',').map(name => name.trim()).filter(name => name !== '');
    if (names.length === 0) {
      setResult("Please enter some names.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    setResult(names[randomIndex]);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Name Generator 👤</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nameList">Names (comma-separated)</Label>
            <Textarea
              id="nameList"
              value={nameList}
              onChange={(e) => setNameList(e.target.value)}
              placeholder="Enter names separated by commas"
            />
          </div>
          <Button onClick={generateName}>Generate Name</Button>
          {result && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="text-lg font-semibold">Result:</h3>
              <p>{result}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CoinDiceGenerator = () => {
  const [mode, setMode] = useState('coin');
  const [diceSides, setDiceSides] = useState(6);
  const [numDice, setNumDice] = useState(1);
  const [result, setResult] = useState<string | null>(null);

  const generate = () => {
    if (mode === 'coin') {
      setResult(Math.random() < 0.5 ? 'Heads' : 'Tails');
    } else {
      let diceResults: number[] = [];
      let total = 0;
      for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * diceSides) + 1;
        diceResults.push(roll);
        total += roll;
      }
      setResult(`${diceResults.join(' + ')} = ${total}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Coin Flip / Dice Roll 🪙🎲</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="coinDiceMode">Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger id="coinDiceMode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coin">Coin Flip</SelectItem>
                <SelectItem value="dice">Dice Roll</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mode === 'dice' && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="numDice">Number of Dice</Label>
                <Input
                  id="numDice"
                  type="number"
                  min="1"
                  value={numDice}
                  onChange={(e) => setNumDice(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diceSides">Sides per Die</Label>
                <Input
                  id="diceSides"
                  type="number"
                  min="2"
                  value={diceSides}
                  onChange={(e) => setDiceSides(Number(e.target.value))}
                />
              </div>
            </div>
          )}

          <Button onClick={generate}>Generate</Button>
          {result && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="text-lg font-semibold">Result:</h3>
              <p>{result}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ColorGenerator = () => {
  const [color, setColor] = useState('#000000');

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };

  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard!`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Color Generator 🎨</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button onClick={generateRandomColor}>Generate Random Color</Button>
          <div className="flex items-center justify-center h-20 rounded-md" style={{ backgroundColor: color }}></div>
          <div className="grid gap-2">
            <Label>HEX</Label>
            <div className="flex items-center space-x-2">
              <Input type="text" value={color} readOnly />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(color)}>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>RGB</Label>
            <div className="flex items-center space-x-2">
              <Input type="text" value={hexToRgb(color)} readOnly />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(hexToRgb(color))}>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmojiGenerator = () => {
  const emojiCategories = {
    faces: ["😀", "😂", "😍", "🤩", "🤔", "🥳", "😇", "😎", "😭", "😡"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"],
    food: ["🍎", "🍌", "🍓", "🍕", "🍔", "🍟", "🍣", "🍦", "🍩", "☕"],
    objects: ["💡", "📱", "💻", "⌚", "📸", "📚", "🎁", "🎈", "💰", "🔑"],
    travel: ["🚗", "✈️", "🚢", "🚀", "🗺️", "🏖️", "🗼", "🗽", "🌉", "🏞️"],
    activities: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🎮", "🎲", "🎯", "🎸"],
    symbols: ["❤️", "✨", "⭐", "✅", "❌", "❓", "❗", "💯", "⚠️", "♻️"],
  };

  const [selectedCategory, setSelectedCategory] = useState<keyof typeof emojiCategories>('faces');
  const [generatedEmoji, setGeneratedEmoji] = useState<string>('');

  const generateEmoji = () => {
    const emojis = emojiCategories[selectedCategory];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setGeneratedEmoji(emojis[randomIndex]);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Emoji Generator 😜</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="emojiCategory">Category</Label>
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as keyof typeof emojiCategories)}>
              <SelectTrigger id="emojiCategory">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(emojiCategories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateEmoji}>Generate Emoji</Button>
          {generatedEmoji && (
            <div className="flex items-center justify-center text-6xl h-20 rounded-md border border-dashed">
              {generatedEmoji}
            </div>
          )}{generatedEmoji}
        </div>
      </CardContent>
    </Card>
  );
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?";

    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }
    setGeneratedPassword(password);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Password Generator 🔐</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="passwordLength">Length: {length}</Label>
            <Input
              id="passwordLength"
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeUppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
            />
            <Label htmlFor="includeUppercase">Include Uppercase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeNumbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
            />
            <Label htmlFor="includeNumbers">Include Numbers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeSymbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
            />
            <Label htmlFor="includeSymbols">Include Symbols</Label>
          </div>
          <Button onClick={generatePassword}>Generate Password</Button>
          {generatedPassword && (
            <div className="grid gap-2">
              <Label>Generated Password</Label>
              <Input type="text" value={generatedPassword} readOnly />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const WordGenerator = () => {
  const words = {
    noun: ["cat", "dog", "house", "car", "tree", "book", "computer", "phone", "city", "river"],
    verb: ["run", "jump", "eat", "sleep", "walk", "read", "write", "sing", "dance", "talk"],
    adjective: ["happy", "sad", "big", "small", "red", "blue", "fast", "slow", "loud", "quiet"],
  };

  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<keyof typeof words>('noun');
  const [generatedWord, setGeneratedWord] = useState<string>('');

  const generateWord = () => {
    const wordList = words[selectedPartOfSpeech];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setGeneratedWord(wordList[randomIndex]);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Word Generator ✍️</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="partOfSpeech">Part of Speech</Label>
            <Select value={selectedPartOfSpeech} onValueChange={(value) => setSelectedPartOfSpeech(value as keyof typeof words)}>
              <SelectTrigger id="partOfSpeech">
                <SelectValue placeholder="Select part of speech" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(words).map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos.charAt(0).toUpperCase() + pos.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateWord}>Generate Word</Button>
          {generatedWord && (
            <div className="flex items-center justify-center text-4xl h-20 rounded-md border border-dashed">
              {generatedWord}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CustomListGenerator = () => {
  const [listInput, setListInput] = useState('');
  const [generatedItem, setGeneratedItem] = useState('');

  const generateItem = () => {
    const items = listInput.split('\n').map(item => item.trim()).filter(item => item !== '');
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setGeneratedItem(items[randomIndex]);
    } else {
      setGeneratedItem('Please enter items in the list.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Custom List Generator 🧾</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="customList">Enter your list (one item per line)</Label>
            <Textarea
              id="customList"
              placeholder="Item 1\nItem 2\nItem 3"
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
              rows={5}
            />
          </div>
          <Button onClick={generateItem}>Pick Random Item</Button>
          {generatedItem && (
            <div className="flex items-center justify-center text-xl h-20 rounded-md border border-dashed">
              {generatedItem}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const UniversalRandomGenerator = () => {
  const [generatorType, setGeneratorType] = useState('number');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Universal Random Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="generatorType">Select Generator</Label>
            <Select value={generatorType} onValueChange={setGeneratorType}>
              <SelectTrigger id="generatorType">
                <SelectValue placeholder="Select a generator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number Generator 🔢</SelectItem>
                <SelectItem value="name">Name Generator 👤</SelectItem>
                <SelectItem value="coinDice">Coin Flip / Dice Roll 🪙🎲</SelectItem>
                <SelectItem value="color">Color Generator 🎨</SelectItem>
                <SelectItem value="emoji">Emoji Generator 😜</SelectItem>
                <SelectItem value="password">Password Generator 🔐</SelectItem>
                <SelectItem value="word">Word Generator ✍️</SelectItem>
                <SelectItem value="customList">Custom List Generator 🧾</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {generatorType === 'number' && <NumberGenerator />}
          {generatorType === 'name' && <NameGenerator />}
          {generatorType === 'coinDice' && <CoinDiceGenerator />}
          {generatorType === 'color' && <ColorGenerator />}
          {generatorType === 'emoji' && <EmojiGenerator />}
          {generatorType === 'password' && <PasswordGenerator />}
          {generatorType === 'word' && <WordGenerator />}
          {generatorType === 'customList' && <CustomListGenerator />}
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalRandomGenerator;