// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Users, Target } from 'lucide-react';

export function CompanyIntro({
  currentLang
}) {
  const texts = {
    zh: {
      intro: {
        title: '企业介绍',
        content: '以工程为本、创新驱动，助力客户实现商业价值与可持续目标。以智能算法、电驱技术和高密度储能驱动能源转型，让每一吨能量都更高效、更清洁、更可持续。'
      },
      mission: {
        title: '品牌使命',
        content: '加速高能耗场景向可持续能源转型。我们的目标：帮助客户实现 ESG 合规与零排放目标。'
      }
    },
    en: {
      intro: {
        title: 'Company Introduction',
        content: 'Engineering-first and innovation-driven, we help clients achieve commercial value and sustainability goals. Driving energy transition with intelligent algorithms, electric drive technology and high-density energy storage.'
      },
      mission: {
        title: 'Brand Mission',
        content: 'Accelerating the transition to sustainable energy in high-consumption scenarios. Our goal: Helping clients achieve ESG compliance and zero-emission goals.'
      }
    }
  };
  const t = texts[currentLang];
  return <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-[#0D7E9C] mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">{t.intro.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{t.intro.content}</p>
          </div>

          <div className="bg-gradient-to-br from-[#0D7E9C] to-[#01847E] rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-white mr-3" />
              <h2 className="text-3xl font-bold">{t.mission.title}</h2>
            </div>
            <p className="text-lg leading-relaxed">{t.mission.content}</p>
          </div>
        </div>
      </div>
    </section>;
}