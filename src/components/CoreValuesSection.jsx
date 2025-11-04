// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { TrendingUp, Zap, Shield, CheckCircle, BarChart3, Cpu, Activity, Sparkles, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';

export function CoreValuesSection({
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
  return <section id="coreValues" className="py-20 bg-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/5 via-transparent to-[#01847E]/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0D7E9C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#01847E]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.coreValues.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.coreValues.subtitle}</p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {t.coreValues.advantages.map((advantage, index) => {
          const Icon = advantage.icon;
          return <div key={index} className="group relative h-full">
                {/* 3D effect with multiple shadows and transforms */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/20 to-[#01847E]/20 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-500 group-hover:scale-105" />
                
                {/* Main card with frosted glass effect */}
                <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden">
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/5 via-white/50 to-[#01847E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Header with consistent brand colors */}
                  <div className="relative p-6 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                    
                    <div className="relative flex items-center justify-between mb-4">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-white/80" />
                        <div className="text-2xl font-bold">{index + 1}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{advantage.title}</h3>
                    <p className="text-white/90 font-medium flex items-center">
                      <Gauge className="w-4 h-4 mr-2" />
                      {advantage.subtitle}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <p className="text-gray-700 mb-6 leading-relaxed">{advantage.description}</p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {advantage.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center group/item">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{feature}</span>
                        </div>)}
                    </div>

                    {/* Special Content based on advantage type */}
                    {advantage.chartData && <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-inner">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-600">{advantage.chartData.label}</span>
                          <BarChart3 className="w-4 h-4 text-[#0D7E9C]" />
                        </div>
                        <div className="flex items-end space-x-2 h-20">
                          <div className="flex-1 bg-gradient-to-t from-[#852E01] to-[#852E01]/80 rounded-t relative overflow-hidden group" style={{
                      height: '100%'
                    }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#852E01]/20 to-transparent" />
                            {/* 隐藏百分比数值 */}
                            <div className="text-center text-xs font-bold text-white pt-1 relative z-10 opacity-0">
                              {advantage.chartData.before}%
                            </div>
                          </div>
                          <div className="flex-1 bg-gradient-to-t from-[#01847E] to-[#01847E]/80 rounded-t relative overflow-hidden group" style={{
                      height: '20%'
                    }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#01847E]/20 to-transparent" />
                            {/* 隐藏百分比数值 */}
                            <div className="text-center text-xs font-bold text-white pt-1 relative z-10 opacity-0">
                              {advantage.chartData.after}%
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>{currentLang === 'zh' ? '使用前' : 'Before'}</span>
                          <span>{currentLang === 'zh' ? '使用后' : 'After'}</span>
                        </div>
                      </div>}

                    {advantage.techSpecs && <div className="space-y-2">
                        {advantage.techSpecs.map((spec, specIndex) => <div key={specIndex} className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-100 hover:border-[#0D7E9C]/30 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 flex items-center justify-center mr-3">
                                <Cpu className="w-4 h-4 text-[#0D7E9C]" />
                              </div>
                              <span className="text-sm text-gray-700">{spec.split(':')[0]}</span>
                            </div>
                            <span className="text-sm font-bold bg-gradient-to-r from-[#0D7E9C] to-[#01847E] bg-clip-text text-transparent">{spec.split(':')[1]}</span>
                          </div>)}
                      </div>}

                    {advantage.safetyMetrics && <div className="grid grid-cols-1 gap-2">
                        {advantage.safetyMetrics.map((metric, metricIndex) => <div key={metricIndex} className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-100 hover:border-[#0D7E9C]/30 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 flex items-center justify-center mr-3">
                              <Activity className="w-4 h-4 text-[#0D7E9C]" />
                            </div>
                            <span className="text-sm text-gray-700">{metric}</span>
                          </div>)}
                      </div>}

                    {/* Highlight with brand gradient */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-xl border border-[#0D7E9C]/20 backdrop-blur-sm">
                      <div className="flex items-start">
                        <Sparkles className="w-5 h-5 text-[#0D7E9C] mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium text-gray-800 leading-relaxed">{advantage.highlight}</p>
                      </div>
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
            <button onClick={() => scrollContainer('coreValues-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
            <button onClick={() => scrollContainer('coreValues-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div id="coreValues-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: {
            display: 'none'
          }
        }}>
            {t.coreValues.advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return <div key={index} className="group relative flex-none w-80 h-full">
                  {/* 3D effect with multiple shadows and transforms */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/20 to-[#01847E]/20 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-500 group-hover:scale-105" />
                  
                  {/* Main card with frosted glass effect */}
                  <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden">
                    
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/5 via-white/50 to-[#01847E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Header with consistent brand colors */}
                    <div className="relative p-6 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                      
                      <div className="relative flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-5 h-5 text-white/80" />
                          <div className="text-2xl font-bold">{index + 1}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                      <p className="text-white/90 font-medium flex items-center text-sm">
                        <Gauge className="w-4 h-4 mr-2" />
                        {advantage.subtitle}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      <p className="text-gray-700 mb-4 leading-relaxed text-sm">{advantage.description}</p>

                      {/* Features List */}
                      <div className="space-y-2 mb-4">
                        {advantage.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center group/item">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] flex items-center justify-center mr-2 group-hover/item:scale-110 transition-transform">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors text-sm">{feature}</span>
                          </div>)}
                      </div>

                      {/* Special Content based on advantage type */}
                      {advantage.chartData && <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-inner">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">{advantage.chartData.label}</span>
                            <BarChart3 className="w-3 h-3 text-[#0D7E9C]" />
                          </div>
                          <div className="flex items-end space-x-1 h-16">
                            <div className="flex-1 bg-gradient-to-t from-[#852E01] to-[#852E01]/80 rounded-t relative overflow-hidden group" style={{
                        height: '100%'
                      }}>
                              <div className="absolute inset-0 bg-gradient-to-t from-[#852E01]/20 to-transparent" />
                              {/* 隐藏百分比数值 */}
                              <div className="text-center text-xs font-bold text-white pt-1 relative z-10 opacity-0">
                                {advantage.chartData.before}%
                              </div>
                            </div>
                            <div className="flex-1 bg-gradient-to-t from-[#01847E] to-[#01847E]/80 rounded-t relative overflow-hidden group" style={{
                        height: '20%'
                      }}>
                              <div className="absolute inset-0 bg-gradient-to-t from-[#01847E]/20 to-transparent" />
                              {/* 隐藏百分比数值 */}
                              <div className="text-center text-xs font-bold text-white pt-1 relative z-10 opacity-0">
                                {advantage.chartData.after}%
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>{currentLang === 'zh' ? '使用前' : 'Before'}</span>
                            <span>{currentLang === 'zh' ? '使用后' : 'After'}</span>
                          </div>
                        </div>}

                      {advantage.techSpecs && <div className="space-y-1">
                          {advantage.techSpecs.map((spec, specIndex) => <div key={specIndex} className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-gray-100 hover:border-[#0D7E9C]/30 transition-colors">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 flex items-center justify-center mr-2">
                                  <Cpu className="w-3 h-3 text-[#0D7E9C]" />
                                </div>
                                <span className="text-xs text-gray-700">{spec.split(':')[0]}</span>
                              </div>
                              <span className="text-xs font-bold bg-gradient-to-r from-[#0D7E9C] to-[#01847E] bg-clip-text text-transparent">{spec.split(':')[1]}</span>
                            </div>)}
                        </div>}

                      {advantage.safetyMetrics && <div className="grid grid-cols-1 gap-1">
                          {advantage.safetyMetrics.map((metric, metricIndex) => <div key={metricIndex} className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-gray-100 hover:border-[#0D7E9C]/30 transition-colors">
                              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 flex items-center justify-center mr-2">
                                <Activity className="w-3 h-3 text-[#0D7E9C]" />
                              </div>
                              <span className="text-xs text-gray-700">{metric}</span>
                            </div>)}
                        </div>}

                      {/* Highlight with brand gradient */}
                      <div className="mt-4 p-3 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-xl border border-[#0D7E9C]/20 backdrop-blur-sm">
                        <div className="flex items-start">
                          <Sparkles className="w-4 h-4 text-[#0D7E9C] mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-xs font-medium text-gray-800 leading-relaxed">{advantage.highlight}</p>
                        </div>
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