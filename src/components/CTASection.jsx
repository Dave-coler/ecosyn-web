// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

export function CTASection({
  currentLang = 'zh'
}) {
  const ctaData = {
    zh: {
      title: '准备好开启新能源之旅了吗？',
      subtitle: '联系我们获取专业的新能源解决方案咨询',
      features: [{
        icon: 'Zap',
        title: '高效节能',
        description: '先进的能源管理技术，显著降低运营成本'
      }, {
        icon: 'Shield',
        title: '安全可靠',
        description: '多重安全保障，确保系统稳定运行'
      }, {
        icon: 'TrendingUp',
        title: '智能优化',
        description: 'AI驱动的智能优化，持续提升能源效率'
      }],
      buttons: {
        primary: '立即咨询'
      }
    },
    en: {
      title: 'Ready to Start Your New Energy Journey?',
      subtitle: 'Contact us for professional new energy solution consulting',
      features: [{
        icon: 'Zap',
        title: 'High Efficiency',
        description: 'Advanced energy management technology significantly reduces operating costs'
      }, {
        icon: 'Shield',
        title: 'Safe & Reliable',
        description: 'Multiple safety measures ensure stable system operation'
      }, {
        icon: 'TrendingUp',
        title: 'Smart Optimization',
        description: 'AI-driven intelligent optimization continuously improves energy efficiency'
      }],
      buttons: {
        primary: 'Get Started'
      }
    }
  };
  const t = ctaData[currentLang];
  const getIcon = iconName => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'Shield':
        return Shield;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Zap;
    }
  };
  const handleContact = () => {
    // 构建邮件内容
    const subject = encodeURIComponent('新能源解决方案咨询 - New Energy Solution Consulting');
    const body = encodeURIComponent('您好，我对贵公司的新能源解决方案感兴趣，希望能获得更多信息和专业咨询。\n\nHello, I am interested in your new energy solutions and would like to get more information and professional consulting.');

    // 创建mailto链接
    const mailtoLink = `mailto:sales@hill-sea.com?subject=${subject}&body=${body}`;

    // 打开邮件客户端
    window.location.href = mailtoLink;
  };
  return <section className="py-16 bg-gradient-to-br from-[#0D7E9C] to-[#01847E] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/20" />)}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">{t.subtitle}</p>
          
          {/* Single Button - Centered */}
          <div className="flex justify-center">
            <Button onClick={handleContact} className="bg-white text-[#0D7E9C] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
              {t.buttons.primary}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {t.features.map((feature, index) => {
          const IconComponent = getIcon(feature.icon);
          return <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </div>;
        })}
        </div>
      </div>
    </section>;
}