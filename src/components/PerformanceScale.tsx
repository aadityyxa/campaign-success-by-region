import React from 'react';

const PerformanceScale: React.FC = () => {
  const colors = [
    { color: "#EBF5FF", label: "Low" },
    { color: "#BFDBFE", label: "" },
    { color: "#60A5FA", label: "Medium" },
    { color: "#2563EB", label: "" },
    { color: "#1E40AF", label: "High" }
  ];

  return (
    <div className="flex items-center text-xs">
      <span className="mr-2 text-gray-600 font-medium">Performance:</span>
      <div className="flex items-center">
        {colors.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-6 h-4 border border-gray-300" 
              style={{ backgroundColor: item.color }}
            />
            {item.label && (
              <span className="text-[10px] text-gray-600 mt-1">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceScale;