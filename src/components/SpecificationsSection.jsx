// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, Wrench, Battery, Zap, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

export function SpecificationsSection({
  t,
  currentLang,
  selectedProduct,
  handleProductSelect
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
  return <section id="specifications" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D7E9C]/3 via-transparent to-[#01847E]/3" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#0D7E9C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#01847E]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.specifications.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.specifications.subtitle}</p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {t.specifications.products.map((product, index) => {
          const isSelected = selectedProduct === product.name;
          return <div key={index} className={`group relative ${isSelected ? 'scale-105' : ''} transition-all duration-500`}>
                {/* Selection glow effect */}
                {isSelected && <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/30 to-[#01847E]/30 rounded-3xl blur-xl animate-pulse" />}
                
                {/* Main card */}
                <div onClick={() => handleProductSelect(product.name)} className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 overflow-hidden border-2 cursor-pointer ${isSelected ? 'border-[#0D7E9C]' : 'border-white/50'}`}>
                  
                  {/* Top gradient bar */}
                  <div className={`h-1 ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gradient-to-r from-gray-300 to-gray-400'} transition-all duration-300`} />
                  
                  {/* Product header */}
                  <div className="relative p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 font-medium mb-3">{product.tagline}</p>
                      </div>
                      
                      {/* Product number */}
                      <div className={`text-3xl font-bold ${isSelected ? 'text-[#0D7E9C]/30' : 'text-gray-200'} transition-colors`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Product image placeholder */}
                    <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6 overflow-hidden group">
                      <div className={`absolute inset-0 ${isSelected ? 'bg-gradient-to-br from-[#0D7E9C]/10 to-[#01847E]/10' : 'bg-gradient-to-br from-gray-100/50 to-gray-200/50'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className={`w-24 h-24 mx-auto mb-4 ${isSelected ? 'bg-[#0D7E9C]/10' : 'bg-white/80'} backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 ${isSelected ? 'border-[#0D7E9C]/20' : 'border-gray-200'}`}>
                            <Package className={`w-12 h-12 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-400'}`} />
                          </div>
                          <p className="text-sm text-gray-500 font-medium">{product.name}</p>
                          <p className="text-xs text-gray-400 mt-1">Product Image</p>
                        </div>
                      </div>
                      {/* Corner decorations */}
                      <div className={`absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 ${isSelected ? 'border-[#0D7E9C]/30' : 'border-gray-300'} rounded-tr-2xl`} />
                      <div className={`absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 ${isSelected ? 'border-[#01847E]/30' : 'border-gray-300'} rounded-bl-2xl`} />
                    </div>

                    {/* Specifications grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="flex items-center mb-1">
                          <Wrench className={`w-4 h-4 mr-2 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                          <span className="text-xs text-gray-500">{currentLang === 'zh' ? '驱动系统' : 'Drive'}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{product.specs.drive}</div>
                      </div>
                      
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="flex items-center mb-1">
                          <Battery className={`w-4 h-4 mr-2 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                          <span className="text-xs text-gray-500">{currentLang === 'zh' ? '电池容量' : 'Battery'}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{product.specs.battery}</div>
                      </div>
                      
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="flex items-center mb-1">
                          <Zap className={`w-4 h-4 mr-2 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                          <span className="text-xs text-gray-500">{currentLang === 'zh' ? '扭矩' : 'Torque'}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{product.specs.torque}</div>
                      </div>
                      
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="flex items-center mb-1">
                          <Settings className={`w-4 h-4 mr-2 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                          <span className="text-xs text-gray-500">{currentLang === 'zh' ? '功率' : 'Power'}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{product.specs.power}</div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2">
                      {product.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gray-300'} mr-3`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>

        {/* Mobile: Horizontal Scroll Layout */}
        <div className="lg:hidden">
          {/* Scroll Controls */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => scrollContainer('specifications-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
            <button onClick={() => scrollContainer('specifications-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div id="specifications-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: {
            display: 'none'
          }
        }}>
            {t.specifications.products.map((product, index) => {
            const isSelected = selectedProduct === product.name;
            return <div key={index} className={`group relative flex-none w-80 ${isSelected ? 'scale-105' : ''} transition-all duration-500`}>
                  {/* Selection glow effect */}
                  {isSelected && <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/30 to-[#01847E]/30 rounded-3xl blur-xl animate-pulse" />}
                  
                  {/* Main card */}
                  <div onClick={() => handleProductSelect(product.name)} className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 overflow-hidden border-2 cursor-pointer ${isSelected ? 'border-[#0D7E9C]' : 'border-white/50'}`}>
                    
                    {/* Top gradient bar */}
                    <div className={`h-1 ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gradient-to-r from-gray-300 to-gray-400'} transition-all duration-300`} />
                    
                    {/* Product header */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-xs text-gray-600 font-medium mb-2">{product.tagline}</p>
                        </div>
                        
                        {/* Product number */}
                        <div className={`text-2xl font-bold ${isSelected ? 'text-[#0D7E9C]/30' : 'text-gray-200'} transition-colors`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Product image placeholder */}
                      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 overflow-hidden group">
                        <div className={`absolute inset-0 ${isSelected ? 'bg-gradient-to-br from-[#0D7E9C]/10 to-[#01847E]/10' : 'bg-gradient-to-br from-gray-100/50 to-gray-200/50'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`w-20 h-20 mx-auto mb-3 ${isSelected ? 'bg-[#0D7E9C]/10' : 'bg-white/80'} backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 ${isSelected ? 'border-[#0D7E9C]/20' : 'border-gray-200'}`}>
                              <Package className={`w-10 h-10 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-400'}`} />
                            </div>
                            <p className="text-xs text-gray-500 font-medium">{product.name}</p>
                            <p className="text-xs text-gray-400 mt-1">Product Image</p>
                          </div>
                        </div>
                        {/* Corner decorations */}
                        <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 ${isSelected ? 'border-[#0D7E9C]/30' : 'border-gray-300'} rounded-tr-xl`} />
                        <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 ${isSelected ? 'border-[#01847E]/30' : 'border-gray-300'} rounded-bl-xl`} />
                      </div>

                      {/* Specifications grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className="flex items-center mb-1">
                            <Wrench className={`w-3 h-3 mr-1 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                            <span className="text-xs text-gray-500">{currentLang === 'zh' ? '驱动' : 'Drive'}</span>
                          </div>
                          <div className="text-xs font-semibold text-gray-900">{product.specs.drive}</div>
                        </div>
                        
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className="flex items-center mb-1">
                            <Battery className={`w-3 h-3 mr-1 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                            <span className="text-xs text-gray-500">{currentLang === 'zh' ? '电池' : 'Battery'}</span>
                          </div>
                          <div className="text-xs font-semibold text-gray-900">{product.specs.battery}</div>
                        </div>
                        
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className="flex items-center mb-1">
                            <Zap className={`w-3 h-3 mr-1 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                            <span className="text-xs text-gray-500">{currentLang === 'zh' ? '扭矩' : 'Torque'}</span>
                          </div>
                          <div className="text-xs font-semibold text-gray-900">{product.specs.torque}</div>
                        </div>
                        
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'}`}>
                          <div className="flex items-center mb-1">
                            <Settings className={`w-3 h-3 mr-1 ${isSelected ? 'text-[#0D7E9C]' : 'text-gray-500'}`} />
                            <span className="text-xs text-gray-500">{currentLang === 'zh' ? '功率' : 'Power'}</span>
                          </div>
                          <div className="text-xs font-semibold text-gray-900">{product.specs.power}</div>
                        </div>
                      </div>

                      {/* Features list */}
                      <div className="space-y-1">
                        {product.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gray-300'} mr-2`} />
                            <span className="text-xs text-gray-700">{feature}</span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
    </section>;
}