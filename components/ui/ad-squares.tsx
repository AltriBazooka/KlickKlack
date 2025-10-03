import Image from 'next/image';
import React from 'react';

export function AdSquares({ className, imageSrc }: { className?: string; imageSrc?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 shadow-sm text-black dark:text-white text-2xl font-bold cursor-pointer overflow-hidden ${className}`}>
      {imageSrc ? (
        <Image src={imageSrc} alt="Ad" layout="fill" objectFit="cover" />
      ) : (
        "AD"
      )}
    </div>
  );
}