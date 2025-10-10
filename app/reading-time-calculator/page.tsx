import ReadingTimeCalculator from '@/components/calculators/ReadingTimeCalculator';

const ReadingTimeCalculatorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <ReadingTimeCalculator />
      </main>
    </div>
  );
};

export default ReadingTimeCalculatorPage;