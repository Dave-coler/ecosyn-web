// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SolutionCard, SolutionCardMobile } from '@/components/SolutionCard';
import { ApplicationCard, ApplicationCardMobile } from '@/components/ApplicationCard';
export default function Solutions(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentLang, setCurrentLang] = useState('zh');
  const [selectedSolution, setSelectedSolution] = useState(null);

  // 从localStorage读取语言设置，如果没有则使用默认值
  useEffect(() => {
    const savedLang = localStorage.getItem('website-language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setCurrentLang(savedLang);
    }
  }, []);

  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = event => {
      const {
        lang
      } = event.detail;
      if (lang && (lang === 'zh' || lang === 'en')) {
        setCurrentLang(lang);
      }
    };

    // 监听自定义语言变化事件
    window.addEventListener('languageChange', handleLanguageChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // 语言切换时保存到localStorage
  const handleLanguageChange = lang => {
    setCurrentLang(lang);
    localStorage.setItem('website-language', lang);

    // 触发自定义事件，通知其他组件语言已变化
    window.dispatchEvent(new CustomEvent('languageChange', {
      detail: {
        lang
      }
    }));
    toast({
      title: lang === 'zh' ? '语言已切换' : 'Language changed',
      description: lang === 'zh' ? '已切换到中文' : 'Switched to English'
    });
  };
  const texts = {
    zh: {
      hero: {
        title: '智能解决方案',
        subtitle: '为高能耗场景提供定制化的新能源解决方案',
        description: '基于先进的电驱动技术、高安全高能量密度的动力电池、智能控制系统，以及大功率MW超充技术，我们为公路运输、港口设备、矿山设备、能源配送等场景提供高效可靠的新能源解决方案。'
      },
      solutions: [{
        id: 'ecosyn',
        title: 'ECOSYN 电驱系统',
        subtitle: '长距离公路列车的电动化革命',
        description: '全球首个为长距离公路列车量身定制的智能电驱产品，即插即用，立减80%燃料成本。',
        features: ['80% 燃料成本削减', '2400 kWh 超长续航', '零改装需求', '智能兼容系统'],
        icon: 'Zap',
        color: '#0D7E9C',
        stats: {
          fuel: '80%',
          range: '2400kWh',
          efficiency: '40%'
        }
      }, {
        id: 'energy-storage',
        title: '智能储能系统',
        subtitle: '灵活高效的能源管理方案',
        description: '模块化储能架构，支持快速更换，为各种应用场景提供可靠的能源保障。',
        features: ['模块化设计', '快速更换', '高能量密度', '长循环寿命'],
        icon: 'Battery',
        color: '#01847E',
        stats: {
          capacity: '2400kWh',
          flexibility: '95%',
          lifespan: '8+年'
        }
      }, {
        id: 'flexible-charging',
        title: '柔性超充系统',
        subtitle: 'MW级大功率快速补能解决方案',
        description: '直流液冷，全柔性分配架构，支持光储直连，为大电量电池系统实现快速补能。',
        features: ['MW级超充', '全柔性分配', '全液冷', '适应多种充电标准'],
        icon: 'Zap',
        color: '#0D7E9C',
        stats: {
          power: '2400kW',
          efficiency: '96%',
          flexibility: '100%'
        }
      }, {
        id: 'smart-control',
        title: '智能控制系统',
        subtitle: 'AI驱动的能源优化管理',
        description: '先进的智能感应系统和AI算法，实现能源的智能分配和优化管理。',
        features: ['AI优化算法', '实时监控', '预测维护', '智能调度'],
        icon: 'TrendingUp',
        color: '#0D7E9C',
        stats: {
          efficiency: '35%',
          uptime: '99.5%',
          maintenance: '50%'
        }
      }],
      applications: {
        title: '应用场景',
        subtitle: '多场景适配，全方位覆盖',
        scenarios: [{
          title: '公路列车运输',
          description: '长距离重载运输的绿色革命',
          icon: 'Truck',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310a?w=800&h=400&fit=crop'
        }, {
          title: '能源配送网络',
          description: '绿色能源的智能运输',
          icon: 'Battery',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop'
        }, {
          title: '港口物流',
          description: '港口作业的电动化升级',
          icon: 'Shield',
          image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&h=400&fit=crop'
        }, {
          title: '矿山运输',
          description: '重型装备的绿色转型',
          icon: 'TrendingUp',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop'
        }]
      },
      cta: {
        title: '定制化解决方案',
        subtitle: '根据您的具体需求，我们提供量身定制的新能源解决方案',
        button: '联系我们'
      }
    },
    en: {
      hero: {
        title: 'Intelligent Solutions',
        subtitle: 'Customized new energy solutions for high-consumption scenarios',
        description: 'Based on advanced electric drive technology, high-safety high-energy-density power batteries, intelligent control systems, and high-power MW ultra-fast charging technology, we provide efficient and reliable new energy solutions for road transport, port equipment, mining equipment, and energy distribution scenarios.'
      },
      solutions: [{
        id: 'ecosyn',
        title: 'ECOSYN Electric Drive System',
        subtitle: 'Electric revolution for long-distance road trains',
        description: 'The world\'s first intelligent electric drive product tailored for long-distance road trains — plug & play, 80% fuel cost reduction.',
        features: ['80% fuel cost reduction', 'Up to 2400 kWh range', 'Zero modification required', 'Smart compatibility system'],
        icon: 'Zap',
        color: '#0D7E9C',
        stats: {
          fuel: '80%',
          range: '2400kWh',
          efficiency: '40%'
        }
      }, {
        id: 'energy-storage',
        title: 'Smart Energy Storage System',
        subtitle: 'Flexible and efficient energy management solution',
        description: 'Modular storage architecture with quick swap support, providing reliable energy security for various application scenarios.',
        features: ['Modular design', 'Quick swap', 'High energy density', 'Long cycle life'],
        icon: 'Battery',
        color: '#01847E',
        stats: {
          capacity: '2400kWh',
          flexibility: '95%',
          lifespan: '8+ years'
        }
      }, {
        id: 'flexible-charging',
        title: 'Flexible Ultra-Fast Charging System',
        subtitle: 'MW-level high-power rapid energy replenishment solution',
        description: 'DC liquid cooling, fully flexible distribution architecture, supports direct PV-storage connection, achieving rapid energy replenishment for large-capacity battery systems.',
        features: ['MW-level ultra-fast charging', 'Fully flexible distribution', 'Full liquid cooling', 'Adaptable to multiple charging standards'],
        icon: 'Zap',
        color: '#0D7E9C',
        stats: {
          power: '2400kW',
          efficiency: '96%',
          flexibility: '100%'
        }
      }, {
        id: 'smart-control',
        title: 'Intelligent Control System',
        subtitle: 'AI-driven energy optimization management',
        description: 'Advanced intelligent sensing systems and AI algorithms for intelligent energy distribution and optimization management.',
        features: ['AI optimization algorithms', 'Real-time monitoring', 'Predictive maintenance', 'Smart scheduling'],
        icon: 'TrendingUp',
        color: '#0D7E9C',
        stats: {
          efficiency: '35%',
          uptime: '99.5%',
          maintenance: '50%'
        }
      }],
      applications: {
        title: 'Applications',
        subtitle: 'Multi-scenario adaptation, comprehensive coverage',
        scenarios: [{
          title: 'Road Train Transport',
          description: 'Green revolution in long-distance heavy transport',
          icon: 'Truck',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310a?w=800&h=400&fit=crop'
        }, {
          title: 'Energy Distribution Network',
          description: 'Intelligent transport of green energy',
          icon: 'Battery',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop'
        }, {
          title: 'Port Logistics',
          description: 'Electrification upgrade of port operations',
          icon: 'Shield',
          image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&h=400&fit=crop'
        }, {
          title: 'Mining Transport',
          description: 'Green transformation of heavy equipment',
          icon: 'TrendingUp',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop'
        }]
      },
      cta: {
        title: 'Customized Solutions',
        subtitle: 'We provide tailored new energy solutions based on your specific needs',
        button: 'Contact Us'
      }
    }
  };
  const t = texts[currentLang];
  const handleNavigate = page => {
    $w.utils.navigateTo({
      pageId: page,
      params: {}
    });
  };
  const handleSolutionSelect = solutionId => {
    setSelectedSolution(solutionId);
    const solution = t.solutions.find(s => s.id === solutionId);
    toast({
      title: currentLang === 'zh' ? '解决方案选择' : 'Solution Selected',
      description: solution.title
    });
  };

  // 横向滚动控制
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 320;
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
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <Navigation currentPage="solutions" onNavigate={handleNavigate} onLanguageChange={handleLanguageChange} currentLang={currentLang} />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D7E9C]/10 to-[#01847E]/10" />
        <div className="absolute inset-0">
          <div className="particles-container">
            {[...Array(30)].map((_, i) => <div key={i} className="particle absolute w-1 h-1 bg-[#0D7E9C]/30 rounded-full animate-pulse" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />)}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 增加主标题的段前间距 */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight pt-16 md:pt-24 lg:pt-32">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentLang === 'zh' ? '核心解决方案' : 'Core Solutions'}
            </h2>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {t.solutions.map((solution, index) => <SolutionCard key={solution.id} solution={solution} index={index} isSelected={selectedSolution === solution.id} onSelect={handleSolutionSelect} currentLang={currentLang} />)}
          </div>

          {/* Mobile: Horizontal Scroll Layout */}
          <div className="lg:hidden">
            {/* Scroll Controls */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => scrollContainer('solutions-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 font-medium">
                {currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}
              </span>
              <button onClick={() => scrollContainer('solutions-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div id="solutions-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: {
              display: 'none'
            }
          }}>
              {t.solutions.map((solution, index) => <SolutionCardMobile key={solution.id} solution={solution} index={index} isSelected={selectedSolution === solution.id} onSelect={handleSolutionSelect} currentLang={currentLang} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.applications.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.applications.subtitle}</p>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {t.applications.scenarios.map((scenario, index) => <ApplicationCard key={index} scenario={scenario} index={index} currentLang={currentLang} />)}
          </div>

          {/* Mobile: Horizontal Scroll Layout */}
          <div className="lg:hidden">
            {/* Scroll Controls */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => scrollContainer('applications-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 font-medium">
                {currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}
              </span>
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
              {t.applications.scenarios.map((scenario, index) => <ApplicationCardMobile key={index} scenario={scenario} index={index} currentLang={currentLang} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0D7E9C] to-[#01847E] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => <div key={i} className="particle absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />)}
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{t.cta.subtitle}</p>
            
            <Button onClick={() => handleNavigate('about')} className="bg-white text-[#0D7E9C] px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
              {t.cta.button}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      <style jsx>{`
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>;
}