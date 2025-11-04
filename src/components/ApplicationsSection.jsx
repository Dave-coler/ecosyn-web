// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Truck, Battery, ChevronLeft, ChevronRight } from 'lucide-react';

export function ApplicationsSection({
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
  return <section id="applications" className="py-20 bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/5 via-transparent to-[#01847E]/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0D7E9C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#01847E]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.applications.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.applications.subtitle}</p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {t.applications.scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          return <div key={index} className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Main card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
                  
                  {/* Background image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0">
                      <img src={scenario.backgroundImage} alt={scenario.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-end p-8">
                      <div className="text-white">
                        <div className="flex items-center mb-3">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mr-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{scenario.title}</h3>
                            <p className="text-white/90 font-medium">{scenario.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8">
                    <p className="text-gray-700 mb-6 leading-relaxed">{scenario.description}</p>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{currentLang === 'zh' ? '核心优势' : 'Key Benefits'}</h4>
                      <div className="space-y-2">
                        {scenario.benefits.map((benefit, benefitIndex) => <div key={benefitIndex} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] mr-3" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>)}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(scenario.stats).map(([key, value]) => <div key={key} className="text-center p-4 bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 rounded-xl border border-[#0D7E9C]/10">
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#0D7E9C] to-[#01847E] bg-clip-text text-transparent">{value}</div>
                          <div className="text-xs text-gray-600 mt-1 capitalize">{key}</div>
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
            <button onClick={() => scrollContainer('applications-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
            <button onClick={() => scrollContainer('applications-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div id="applications-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: {
            display: 'none'
          }
        }}>
            {t.applications.scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return <div key={index} className="group relative flex-none w-80">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
                    
                    {/* Background image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0">
                        <img src={scenario.backgroundImage} alt={scenario.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 flex items-end p-6">
                        <div className="text-white">
                          <div className="flex items-center mb-2">
                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mr-3">
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold mb-1">{scenario.title}</h3>
                              <p className="text-white/90 font-medium text-sm">{scenario.subtitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      <p className="text-gray-700 mb-4 leading-relaxed text-sm">{scenario.description}</p>

                      {/* Benefits */}
                      <div className="mb-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-2">{currentLang === 'zh' ? '核心优势' : 'Key Benefits'}</h4>
                        <div className="space-y-1">
                          {scenario.benefits.map((benefit, benefitIndex) => <div key={benefitIndex} className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] mr-2" />
                              <span className="text-gray-700 text-sm">{benefit}</span>
                            </div>)}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(scenario.stats).map(([key, value]) => <div key={key} className="text-center p-3 bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 rounded-xl border border-[#0D7E9C]/10">
                            <div className="text-lg font-bold bg-gradient-to-r from-[#0D7E9C] to-[#01847E] bg-clip-text text-transparent">{value}</div>
                            <div className="text-xs text-gray-600 mt-1 capitalize">{key}</div>
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