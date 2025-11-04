// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export function JourneySection({
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
  return <section id="journey" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D7E9C]/3 via-transparent to-[#01847E]/3" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#0D7E9C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#01847E]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.journey.title}</h2>
        </div>

        {/* Desktop: Timeline Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0D7E9C] to-[#01847E]" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {t.journey.milestones.map((milestone, index) => <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-[#0D7E9C] mr-2" />
                        <span className="text-lg font-bold text-gray-900">{milestone.year}</span>
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#0D7E9C] rounded-full shadow-lg" />
                </div>)}
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal Scroll Layout */}
        <div className="lg:hidden">
          {/* Scroll Controls */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => scrollContainer('journey-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
            <button onClick={() => scrollContainer('journey-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div id="journey-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: {
            display: 'none'
          }
        }}>
            {t.journey.milestones.map((milestone, index) => <div key={index} className="group relative flex-none w-72">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-full mr-4">
                          <Calendar className="w-6 h-6 text-[#0D7E9C]" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">{milestone.year}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>
                </div>)}
          </div>
        </div>
      </div>
    </section>;
}