"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function WordCounterCalculator() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    calculateCounts(text);
  }, [text]);

  const calculateCounts = (inputText: string) => {
    // Character count
    setCharCount(inputText.length);

    // Word count
    const words = inputText.match(/\b\w+\b/g);
    setWordCount(words ? words.length : 0);

    // Sentence count (simple approach: count periods, exclamation marks, question marks)
    const sentences = inputText.split(/[.!?]+\s*/).filter(s => s.trim().length > 0);
    setSentenceCount(sentences.length);

    // Paragraph count (simple approach: count double newlines)
    const paragraphs = inputText.split(/\n\s*\n/g).filter(p => p.trim().length > 0);
    setParagraphCount(paragraphs.length);

    // Page count (estimate: 250 words per page)
    setPageCount(wordCount > 0 ? parseFloat((wordCount / 250).toFixed(1)) : 0);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const counts = {
    words: wordCount,
    characters: charCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    pages: pageCount,
  };

  const renderMetricCard = (title: string, value: string | number) => (
    <MetricCard title={title} value={value} />
  );

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 shadow-sm p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold p-4 border-b border-gray-300 dark:border-gray-700">Word Counter Calculator</CardTitle>
        <CardDescription className="text-center">
          Count words, characters, sentences, and paragraphs in your text.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="text-input" className="text-gray-700 dark:text-gray-300">Enter your text here:</Label>
          <Textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Start typing or paste your text here..."
            rows={10}
            className="mt-1 p-2 border rounded-md w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {renderMetricCard("WORDS", counts.words)}
          {renderMetricCard("CHARACTERS", counts.characters)}
          {renderMetricCard("SENTENCES", counts.sentences)}
          {renderMetricCard("PARAGRAPHS", counts.paragraphs)}
          {renderMetricCard("PAGES", counts.pages)}
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => (
  <Card className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
  </Card>
);
