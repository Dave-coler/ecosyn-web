// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Award } from 'lucide-react';

export function CorporateCulture({
  currentLang
}) {
  const texts = {
    zh: {
      title: '企业文化',
      subtitle: '创新为核，责任为本',
      content: '我们以科学精神、工程严谨与商业责任为核心，致力于打造高效、可持续的能源系统。拥抱变化、快速迭代、以客户价值为导向是我们的工作方式。'
    },
    en: {
      title: 'Corporate Culture',
      subtitle: 'Innovation at the core, responsibility at the heart',
      content: 'With scientific rigor and engineering discipline, we build efficient and sustainable energy systems. We embrace change, iterate quickly, and put customer value first.'
    }
  };
  const t = texts[currentLang];
  return <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Award className="w-12 h-12 text-[#0D7E9C]" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-[#0D7E9C] font-semibold mb-8">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 shadow-lg border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{t.content}</p>
          </div>
        </div>
      </div>
    </section>;
}