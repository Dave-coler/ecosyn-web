// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar } from 'lucide-react';

export function TimelineSection({
  currentLang
}) {
  const texts = {
    zh: {
      title: '企业历程',
      events: [{
        year: '2018',
        event: '团队率先完成国内首批纯电公路重卡批量交付，并在-30°C完成极寒测试。'
      }, {
        year: '2020',
        event: '率先完成国内首批纯电矿用卡车批量交付，并开展封闭区无人驾驶测试。'
      }, {
        year: '2022',
        event: '推出10kV接入1200kW超级充电站产品，启动ECOSYN 1.0样机交付。'
      }, {
        year: '2023',
        event: '在多个港口完成200+台批量交付，ECOSYN 1.5研发完成。'
      }, {
        year: '2024',
        event: '推出充储一体机并完成ECOSYN 1.0的100,000公里路试，开启ECOSYN 2.0开发。'
      }]
    },
    en: {
      title: 'Company Timeline',
      events: [{
        year: '2018',
        event: 'First batch of electric heavy trucks delivered and extreme cold tests at -30°C.'
      }, {
        year: '2020',
        event: 'First batch of electric mining trucks delivered; closed-area autonomous trials initiated.'
      }, {
        year: '2022',
        event: 'Launched 10kV 1200kW ultra-charging stations and ECOSYN 1.0 prototype deliveries.'
      }, {
        year: '2023',
        event: 'Over 200 units delivered across ports; ECOSYN 1.5 development completed.'
      }, {
        year: '2024',
        event: 'Launched integrated charge-storage units; ECOSYN 1.0 reached 100,000 km road testing.'
      }]
    }
  };
  const t = texts[currentLang];
  return <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-[#0D7E9C]" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#0D7E9C] to-[#01847E]"></div>
          {t.events.map((event, index) => <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold text-[#0D7E9C] mb-2">{event.year}</div>
                  <div className="text-gray-700">{event.event}</div>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#0D7E9C] rounded-full border-4 border-white"></div>
            </div>)}
        </div>
      </div>
    </section>;
}