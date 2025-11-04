// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Wifi, Settings, Power, Battery, Database, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export function TechnologySection({
  t,
  currentLang
}) {
  // 横向滚动控制
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 320; // 每次滚动的距离
      if (direction === 'left') {
        container.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };
  return <section id="technology" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D7E9C]/3 via-transparent to-[#01847E]/3" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#0D7E9C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#01847E]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.technology.title}</h2>
          <h3 className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">{t.technology.subtitle}</h3>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {t.technology.systems.map((system, index) => {
          const Icon = system.icon;
          return <div key={index} className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Main card with unique design */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
                  
                  {/* Top decorative gradient */}
                  <div className="h-2 bg-gradient-to-r from-[#0D7E9C] via-[#01847E] to-[#0D7E9C]" />
                  
                  {/* System header with icon */}
                  <div className="relative p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                          <div className="relative p-4 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-2xl text-white">
                            <Icon className="w-8 h-8" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-3xl font-bold text-gray-900 mb-1">{system.name}</div>
                          <div className="text-lg font-semibold text-[#0D7E9C]">{system.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{system.subtitle}</div>
                        </div>
                      </div>
                      
                      {/* System number */}
                      <div className="text-4xl font-bold text-gray-200 group-hover:text-[#0D7E9C]/20 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Product image placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-3 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                            <Database className="w-10 h-10 text-[#0D7E9C]" />
                          </div>
                          <p className="text-sm text-gray-500 font-medium">零部件产品图</p>
                          <p className="text-xs text-gray-400 mt-1">{system.name} System</p>
                        </div>
                      </div>
                      {/* Corner decorations */}
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#0D7E9C]/20 rounded-tr-lg" />
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#01847E]/20 rounded-bl-lg" />
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                      {system.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center group/feature">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] mr-3 group-hover/feature:scale-150 transition-transform" />
                          <span className="text-gray-700 group-hover/feature:text-gray-900 transition-colors">{feature}</span>
                        </div>)}
                    </div>
                  </div>

                  {/* Bottom highlight section */}
                  <div className="relative px-8 pb-8">
                    <div className="bg-gradient-to-r from-[#0D7E9C]/8 to-[#01847E]/8 rounded-2xl p-4 border border-[#0D7E9C]/10">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#0D7E9C]/20 to-[#01847E]/20 flex items-center justify-center mr-3 mt-0.5">
                          <Sparkles className="w-3 h-3 text-[#0D7E9C]" />
                        </div>
                        <p className="text-sm font-medium text-gray-800 leading-relaxed">{system.highlight}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D7E9C]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>;
        })}
        </div>

        {/* Mobile: Horizontal Scroll Layout */}
        <div className="lg:hidden">
          {/* Scroll Controls */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => scrollContainer('technology-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
            <button onClick={() => scrollContainer('technology-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div id="technology-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: {
            display: 'none'
          }
        }}>
            {t.technology.systems.map((system, index) => {
            const Icon = system.icon;
            return <div key={index} className="group relative flex-none w-80">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Main card with unique design */}
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
                    
                    {/* Top decorative gradient */}
                    <div className="h-2 bg-gradient-to-r from-[#0D7E9C] via-[#01847E] to-[#0D7E9C]" />
                    
                    {/* System header with icon */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="relative p-3 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-2xl text-white">
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-xl font-bold text-gray-900 mb-1">{system.name}</div>
                            <div className="text-sm font-semibold text-[#0D7E9C]">{system.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{system.subtitle}</div>
                          </div>
                        </div>
                        
                        {/* System number */}
                        <div className="text-2xl font-bold text-gray-200 group-hover:text-[#0D7E9C]/20 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Product image placeholder */}
                      <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                              <Database className="w-8 h-8 text-[#0D7E9C]" />
                            </div>
                            <p className="text-xs text-gray-500 font-medium">零部件产品图</p>
                            <p className="text-xs text-gray-400 mt-1">{system.name} System</p>
                          </div>
                        </div>
                        {/* Corner decorations */}
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#0D7E9C]/20 rounded-tr-lg" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#01847E]/20 rounded-bl-lg" />
                      </div>

                      {/* Features list */}
                      <div className="space-y-2">
                        {system.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center group/feature">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] mr-2 group-hover/feature:scale-150 transition-transform" />
                            <span className="text-gray-700 group-hover/feature:text-gray-900 transition-colors text-sm">{feature}</span>
                          </div>)}
                      </div>
                    </div>

                    {/* Bottom highlight section */}
                    <div className="relative px-6 pb-6">
                      <div className="bg-gradient-to-r from-[#0D7E9C]/8 to-[#01847E]/8 rounded-2xl p-3 border border-[#0D7E9C]/10">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-[#0D7E9C]/20 to-[#01847E]/20 flex items-center justify-center mr-2 mt-0.5">
                            <Sparkles className="w-2 h-2 text-[#0D7E9C]" />
                          </div>
                          <p className="text-xs font-medium text-gray-800 leading-relaxed">{system.highlight}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D7E9C]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
    </section>;
}