// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Zap, Battery, TrendingUp, Shield } from 'lucide-react';

export function SolutionCard({
  solution,
  index,
  isSelected,
  onSelect,
  currentLang
}) {
  const getIcon = iconName => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'Battery':
        return Battery;
      case 'TrendingUp':
        return TrendingUp;
      case 'Shield':
        return Shield;
      default:
        return Zap;
    }
  };
  const IconComponent = getIcon(solution.icon);
  return <div className={`group relative cursor-pointer transition-all duration-500 ${isSelected ? 'scale-105' : ''}`} onClick={() => onSelect(solution.id)}>
      {/* Selection glow effect */}
      {isSelected && <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/30 to-[#01847E]/30 rounded-3xl blur-xl animate-pulse" />}
      
      {/* Main card */}
      <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border-2 ${isSelected ? 'border-[#0D7E9C]' : 'border-white/50'}`}>
        
        {/* Top gradient bar */}
        <div className={`h-1 ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gradient-to-r from-gray-300 to-gray-400'} transition-all duration-300`} />
        
        {/* Solution header */}
        <div className="relative p-8 pb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-sm text-gray-600 font-medium mb-3">{solution.subtitle}</p>
            </div>
            
            {/* Solution number */}
            <div className={`text-3xl font-bold ${isSelected ? 'text-[#0D7E9C]/30' : 'text-gray-200'} transition-colors`}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-2xl ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10' : 'bg-gray-100'} transition-all duration-300`}>
              <IconComponent className={`w-12 h-12 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-400'} transition-colors`} />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">{solution.description}</p>

          {/* Features list */}
          <div className="space-y-2 mb-6">
            {solution.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gray-300'} mr-3`} />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>)}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(solution.stats).map(([key, value]) => <div key={key} className={`text-center p-3 rounded-xl ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
                <div className={`text-lg font-bold ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-600'} transition-colors`}>{value}</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{key}</div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}
export function SolutionCardMobile({
  solution,
  index,
  isSelected,
  onSelect,
  currentLang
}) {
  const getIcon = iconName => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'Battery':
        return Battery;
      case 'TrendingUp':
        return TrendingUp;
      case 'Shield':
        return Shield;
      default:
        return Zap;
    }
  };
  const IconComponent = getIcon(solution.icon);
  return <div className={`group relative flex-none w-80 cursor-pointer transition-all duration-500 ${isSelected ? 'scale-105' : ''}`} onClick={() => onSelect(solution.id)}>
      {/* Selection glow effect */}
      {isSelected && <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/30 to-[#01847E]/30 rounded-3xl blur-xl animate-pulse" />}
      
      {/* Main card */}
      <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border-2 ${isSelected ? 'border-[#0D7E9C]' : 'border-white/50'}`}>
        
        {/* Top gradient bar */}
        <div className={`h-1 ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gradient-to-r from-gray-300 to-gray-400'} transition-all duration-300`} />
        
        {/* Solution header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{solution.title}</h3>
              <p className="text-xs text-gray-600 font-medium mb-2">{solution.subtitle}</p>
            </div>
            
            {/* Solution number */}
            <div className={`text-2xl font-bold ${isSelected ? 'text-[#0D7E9C]/30' : 'text-gray-200'} transition-colors`}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-2xl ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10' : 'bg-gray-100'} transition-all duration-300`}>
              <IconComponent className={`w-10 h-10 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-400'} transition-colors`} />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed text-sm">{solution.description}</p>

          {/* Features list */}
          <div className="space-y-1 mb-4">
            {solution.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center">
                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gray-300'} mr-2`} />
                <span className="text-xs text-gray-700">{feature}</span>
              </div>)}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(solution.stats).map(([key, value]) => <div key={key} className={`text-center p-2 rounded-lg ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
                <div className={`text-sm font-bold ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-600'} transition-colors`}>{value}</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{key}</div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}