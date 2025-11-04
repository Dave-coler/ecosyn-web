// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Truck, Battery, Shield, TrendingUp } from 'lucide-react';

export function ApplicationCard({
  scenario,
  index,
  currentLang
}) {
  const getIcon = iconName => {
    switch (iconName) {
      case 'Truck':
        return Truck;
      case 'Battery':
        return Battery;
      case 'Shield':
        return Shield;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Truck;
    }
  };
  const IconComponent = getIcon(scenario.icon);
  return <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Main card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={scenario.image} alt={scenario.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Icon overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl">
              <IconComponent className="w-6 h-6 text-[#0D7E9C]" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{scenario.title}</h3>
          <p className="text-gray-700 leading-relaxed">{scenario.description}</p>
        </div>
      </div>
    </div>;
}
export function ApplicationCardMobile({
  scenario,
  index,
  currentLang
}) {
  const getIcon = iconName => {
    switch (iconName) {
      case 'Truck':
        return Truck;
      case 'Battery':
        return Battery;
      case 'Shield':
        return Shield;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Truck;
    }
  };
  const IconComponent = getIcon(scenario.icon);
  return <div className="group relative flex-none w-72">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Main card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
        
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img src={scenario.image} alt={scenario.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Icon overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="p-2 bg-white/90 backdrop-blur-sm rounded-xl">
              <IconComponent className="w-5 h-5 text-[#0D7E9C]" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{scenario.title}</h3>
          <p className="text-gray-700 leading-relaxed text-sm">{scenario.description}</p>
        </div>
      </div>
    </div>;
}