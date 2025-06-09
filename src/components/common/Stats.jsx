import React from 'react';

const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-8 mb-16">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
        <div className="text-gray-600">Years of Excellence</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
        <div className="text-gray-600">Team Members</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
        <div className="text-gray-600">Employee Rating</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
        <div className="text-gray-600">Retention Rate</div>
      </div>
    </div>
  );
};

export default Stats;
