import React from "react";

export default function Loading() {
  return (
    <div className="pt-32 bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg h-64 w-full flex flex-col p-4 shadow-md"
            >
              <div className="bg-gray-300 h-32 w-full rounded mb-4" />
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 