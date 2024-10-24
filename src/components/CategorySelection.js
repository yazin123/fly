// src/components/CategorySelection.js
'use client'
import React from 'react';
import { FaBrain, FaChartLine, FaBullhorn, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';

const categories = [
  {
    id: 'strategist',
    title: 'Best Strategist',
    icon: FaBrain,
    description: 'Test your strategic thinking and planning abilities'
  },
  {
    id: 'financial',
    title: 'Best Financial Talent',
    icon: FaChartLine,
    description: 'Showcase your financial management expertise'
  },
  {
    id: 'marketer',
    title: 'Best Marketer',
    icon: FaBullhorn,
    description: 'Demonstrate your marketing and branding skills'
  },
  {
    id: 'leadership',
    title: 'Best Leadership Talent',
    icon: FaUsers,
    description: 'Prove your leadership capabilities'
  },
  {
    id: 'pitch',
    title: 'Best Business Pitch',
    icon: FaLightbulb,
    description: 'Present your business ideas effectively'
  },
  {
    id: 'human-management',
    title: 'Best Human Management',
    icon: FaHandshake,
    description: 'Show your people management skills'
  }
];

export default function CategorySelection({ onSelect }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Select Your Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.title)}
                className="bg-gray-700 p-6 rounded-lg text-white hover:bg-gray-600 transition-colors flex flex-col items-center text-center"
              >
                <Icon className="text-3xl mb-3 text-red-500" />
                <h3 className="font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-gray-300">{category.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}