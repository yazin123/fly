import React, { useState } from 'react';
import { FaBrain, FaChartLine, FaBullhorn, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { X, CheckCircle } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleConfirm = () => {
    if (selectedCategory) {
      onSelect(selectedCategory.title);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="relative bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Select Your Category</h2>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory?.id === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`group p-6 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.02] 
                    flex flex-col items-center text-center relative
                    ${isSelected ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {isSelected && (
                    <CheckCircle className="absolute top-2 right-2 w-6 h-6" />
                  )}
                  <Icon className={`text-3xl mb-3 ${isSelected ? 'text-white' : 'text-red-500'} group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-300">{category.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {selectedCategory && (
          <div className="p-6 border-t border-gray-700">
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 
                       transition-colors font-semibold text-lg flex items-center justify-center gap-2"
            >
              Let's Go!
              <span className="text-2xl">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}