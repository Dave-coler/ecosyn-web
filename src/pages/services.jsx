// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, CheckCircle, Wrench, Settings, Battery, Zap, Shield, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
export default function Services(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentLang, setCurrentLang] = useState('zh');
  const [selectedService, setSelectedService] = useState(null);

  // 从localStorage读取语言设置，如果没有则使用默认值
  useEffect(() => {
    const savedLang = localStorage.getItem('website-language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setCurrentLang(savedLang);
    }
  }, []);

  // 语言切换时保存到localStorage
  const handleLanguageChange = lang => {
    setCurrentLang(lang);
    localStorage.setItem('website-language', lang);
    toast({
      title: lang === 'zh' ? '语言已切换' : 'Language changed',
      description: lang === 'zh' ? '已切换到中文' : 'Switched to English'
    });
  };
  const texts = {
    zh: {
      hero: {
        title: '专业服务',
        subtitle: '全方位的技术支持与服务保障',
        description: '从咨询规划到实施维护，我们提供全生命周期的专业服务，确保您的系统高效稳定运行。'
      },
      services: [{
        id: 'consulting',
        title: '咨询服务',
        subtitle: '专业的技术咨询与方案设计',
        description: '基于丰富的行业经验，为您提供专业的技术咨询和定制化解决方案设计。',
        features: ['需求分析与评估', '方案设计与优化', '技术可行性分析', '投资回报分析'],
        icon: 'Users',
        color: '#0D7E9C',
        duration: '1-2周',
        price: '定制报价'
      }, {
        id: 'implementation',
        title: '实施服务',
        subtitle: '高效的系统集成与部署',
        description: '专业的实施团队，确保系统快速部署和稳定运行，最小化对业务的影响。',
        features: ['现场勘察与规划', '设备安装调试', '系统集成测试', '用户培训'],
        icon: 'Settings',
        color: '#01847E',
        duration: '2-4周',
        price: '项目制'
      }, {
        id: 'maintenance',
        title: '维护服务',
        subtitle: '全生命周期的运维保障',
        description: '提供7x24小时的技术支持和预防性维护，确保系统持续高效运行。',
        features: ['24/7技术支持', '预防性维护', '故障快速响应', '系统升级优化'],
        icon: 'Wrench',
        color: '#0D7E9C',
        duration: '长期',
        price: '年度服务'
      }, {
        id: 'training',
        title: '培训服务',
        subtitle: '专业的技术培训与知识转移',
        description: '系统的培训课程，帮助您的团队快速掌握系统操作和维护技能。',
        features: ['操作培训', '维护培训', '安全培训', '认证考核'],
        icon: 'Shield',
        color: '#01847E',
        duration: '1-2周',
        price: '课程制'
      }],
      process: {
        title: '服务流程',
        subtitle: '标准化的服务流程，确保服务质量',
        steps: [{
          title: '需求沟通',
          description: '深入了解客户需求和业务场景',
          icon: 'Users'
        }, {
          title: '方案设计',
          description: '制定定制化的解决方案',
          icon: 'Settings'
        }, {
          title: '项目实施',
          description: '专业团队执行项目部署',
          icon: 'Zap'
        }, {
          title: '验收交付',
          description: '系统验收和知识转移',
          icon: 'CheckCircle'
        }, {
          title: '持续支持',
          description: '长期的技术支持和维护',
          icon: 'Shield'
        }]
      },
      advantages: {
        title: '服务优势',
        subtitle: '为什么选择我们的服务',
        items: [{
          title: '专业团队',
          description: '拥有丰富行业经验的专业技术团队',
          icon: 'Users'
        }, {
          title: '快速响应',
          description: '7x24小时快速响应机制',
          icon: 'Clock'
        }, {
          title: '质量保证',
          description: '严格的质量管理体系',
          icon: 'Shield'
        }, {
          title: '成本优势',
          description: '高性价比的服务方案',
          icon: 'Zap'
        }]
      },
      cta: {
        title: '立即咨询',
        subtitle: '联系我们，获取专业的服务方案',
        button: '立即咨询'
      }
    },
    en: {
      hero: {
        title: 'Professional Services',
        subtitle: 'Comprehensive technical support and service assurance',
        description: 'From consulting and planning to implementation and maintenance, we provide full lifecycle professional services to ensure your system runs efficiently and stably.'
      },
      services: [{
        id: 'consulting',
        title: 'Consulting Services',
        subtitle: 'Professional technical consulting and solution design',
        description: 'Based on rich industry experience, we provide professional technical consulting and customized solution design.',
        features: ['Requirement analysis and assessment', 'Solution design and optimization', 'Technical feasibility analysis', 'Return on investment analysis'],
        icon: 'Users',
        color: '#0D7E9C',
        duration: '1-2 weeks',
        price: 'Custom quote'
      }, {
        id: 'implementation',
        title: 'Implementation Services',
        subtitle: 'Efficient system integration and deployment',
        description: 'Professional implementation team ensures rapid system deployment and stable operation with minimal business impact.',
        features: ['Site survey and planning', 'Equipment installation and debugging', 'System integration testing', 'User training'],
        icon: 'Settings',
        color: '#01847E',
        duration: '2-4 weeks',
        price: 'Project-based'
      }, {
        id: 'maintenance',
        title: 'Maintenance Services',
        subtitle: 'Full lifecycle operation and maintenance support',
        description: 'Providing 7x24 hours technical support and preventive maintenance to ensure continuous efficient system operation.',
        features: ['24/7 technical support', 'Preventive maintenance', 'Rapid fault response', 'System upgrade and optimization'],
        icon: 'Wrench',
        color: '#0D7E9C',
        duration: 'Long-term',
        price: 'Annual service'
      }, {
        id: 'training',
        title: 'Training Services',
        subtitle: 'Professional technical training and knowledge transfer',
        description: 'Systematic training courses to help your team quickly master system operation and maintenance skills.',
        features: ['Operation training', 'Maintenance training', 'Safety training', 'Certification assessment'],
        icon: 'Shield',
        color: '#01847E',
        duration: '1-2 weeks',
        price: 'Course-based'
      }],
      process: {
        title: 'Service Process',
        subtitle: 'Standardized service process to ensure service quality',
        steps: [{
          title: 'Requirement Communication',
          description: 'Deep understanding of customer needs and business scenarios',
          icon: 'Users'
        }, {
          title: 'Solution Design',
          description: 'Develop customized solutions',
          icon: 'Settings'
        }, {
          title: 'Project Implementation',
          description: 'Professional team executes project deployment',
          icon: 'Zap'
        }, {
          title: 'Acceptance and Delivery',
          description: 'System acceptance and knowledge transfer',
          icon: 'CheckCircle'
        }, {
          title: 'Continuous Support',
          description: 'Long-term technical support and maintenance',
          icon: 'Shield'
        }]
      },
      advantages: {
        title: 'Service Advantages',
        subtitle: 'Why choose our services',
        items: [{
          title: 'Professional Team',
          description: 'Professional technical team with rich industry experience',
          icon: 'Users'
        }, {
          title: 'Rapid Response',
          description: '7x24 hours rapid response mechanism',
          icon: 'Clock'
        }, {
          title: 'Quality Assurance',
          description: 'Strict quality management system',
          icon: 'Shield'
        }, {
          title: 'Cost Advantage',
          description: 'Cost-effective service solutions',
          icon: 'Zap'
        }]
      },
      cta: {
        title: 'Consult Now',
        subtitle: 'Contact us for professional service solutions',
        button: 'Consult Now'
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
  const handleServiceSelect = serviceId => {
    setSelectedService(serviceId);
    const service = t.services.find(s => s.id === serviceId);
    toast({
      title: currentLang === 'zh' ? '服务选择' : 'Service Selected',
      description: service.title
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
      <Navigation currentPage="services" onNavigate={handleNavigate} onLanguageChange={handleLanguageChange} currentLang={currentLang} />

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

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentLang === 'zh' ? '核心服务' : 'Core Services'}</h2>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {t.services.map((service, index) => {
            const IconComponent = service.icon === 'Users' ? Users : service.icon === 'Settings' ? Settings : service.icon === 'Wrench' ? Wrench : Shield;
            return <div key={service.id} className={`group relative cursor-pointer transition-all duration-500 ${selectedService === service.id ? 'scale-105' : ''}`} onClick={() => handleServiceSelect(service.id)}>
                  {/* Selection glow effect */}
                  {selectedService === service.id && <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/30 to-[#01847E]/30 rounded-3xl blur-xl animate-pulse" />}
                  
                  {/* Main card */}
                  <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border-2 ${selectedService === service.id ? 'border-[#0D7E9C]' : 'border-white/50'}`}>
                    
                    {/* Top gradient bar */}
                    <div className={`h-1 ${selectedService === service.id ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gradient-to-r from-gray-300 to-gray-400'} transition-all duration-300`} />
                    
                    {/* Service header */}
                    <div className="relative p-8 pb-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                          <p className="text-sm text-gray-600 font-medium mb-3">{service.subtitle}</p>
                        </div>
                        
                        {/* Service number */}
                        <div className={`text-3xl font-bold ${selectedService === service.id ? 'text-[#0D7E9C]/30' : 'text-gray-200'} transition-colors`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-2xl ${selectedService === service.id ? 'bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10' : 'bg-gray-100'} transition-all duration-300`}>
                          <IconComponent className={`w-12 h-12 ${selectedService === service.id ? 'text-[#0D7E9C]' : 'text-gray-400'} transition-colors`} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>

                      {/* Features list */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${selectedService === service.id ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gray-300'} mr-3`} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>)}
                      </div>

                      {/* Service info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`text-center p-3 rounded-xl ${selectedService === service.id ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
                          <div className={`text-sm font-bold ${selectedService === service.id ? 'text-[#0D7E9C]' : 'text-gray-600'} transition-colors`}>{service.duration}</div>
                          <div className="text-xs text-gray-500 mt-1">{currentLang === 'zh' ? '服务周期' : 'Duration'}</div>
                        </div>
                        <div className={`text-center p-3 rounded-xl ${selectedService === service.id ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
                          <div className={`text-sm font-bold ${selectedService === service.id ? 'text-[#0D7E9C]' : 'text-gray-600'} transition-colors`}>{service.price}</div>
                          <div className="text-xs text-gray-500 mt-1">{currentLang === 'zh' ? '价格模式' : 'Price Model'}</div>
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
              <button onClick={() => scrollContainer('services-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
              <button onClick={() => scrollContainer('services-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div id="services-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: {
              display: 'none'
            }
          }}>
              {t.services.map((service, index) => {
              const IconComponent = service.icon === 'Users' ? Users : service.icon === 'Settings' ? Settings : service.icon === 'Wrench' ? Wrench : Shield;
              return <div key={service.id} className={`group relative flex-none w-80 cursor-pointer transition-all duration-500 ${selectedService === service.id ? 'scale-105' : ''}`} onClick={() => handleServiceSelect(service.id)}>
                    {/* Selection glow effect */}
                    {selectedService === service.id && <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/30 to-[#01847E]/30 rounded-3xl blur-xl animate-pulse" />}
                    
                    {/* Main card */}
                    <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border-2 ${selectedService === service.id ? 'border-[#0D7E9C]' : 'border-white/50'}`}>
                      
                      {/* Top gradient bar */}
                      <div className={`h-1 ${selectedService === service.id ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gradient-to-r from-gray-300 to-gray-400'} transition-all duration-300`} />
                      
                      {/* Service header */}
                      <div className="relative p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                            <p className="text-xs text-gray-600 font-medium mb-2">{service.subtitle}</p>
                          </div>
                          
                          {/* Service number */}
                          <div className={`text-2xl font-bold ${selectedService === service.id ? 'text-[#0D7E9C]/30' : 'text-gray-200'} transition-colors`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className={`p-3 rounded-2xl ${selectedService === service.id ? 'bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10' : 'bg-gray-100'} transition-all duration-300`}>
                            <IconComponent className={`w-10 h-10 ${selectedService === service.id ? 'text-[#0D7E9C]' : 'text-gray-400'} transition-colors`} />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-4 leading-relaxed text-sm">{service.description}</p>

                        {/* Features list */}
                        <div className="space-y-1 mb-4">
                          {service.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center">
                              <div className={`w-1.5 h-1.5 rounded-full ${selectedService === service.id ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E]' : 'bg-gray-300'} mr-2`} />
                              <span className="text-xs text-gray-700">{feature}</span>
                            </div>)}
                        </div>

                        {/* Service info */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className={`text-center p-2 rounded-lg ${selectedService === service.id ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
                            <div className={`text-xs font-bold ${selectedService === service.id ? 'text-[#0D7E9C]' : 'text-gray-600'} transition-colors`}>{service.duration}</div>
                            <div className="text-xs text-gray-500 mt-1">{currentLang === 'zh' ? '周期' : 'Duration'}</div>
                          </div>
                          <div className={`text-center p-2 rounded-lg ${selectedService === service.id ? 'bg-[#0D7E9C]/5 border border-[#0D7E9C]/20' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
                            <div className={`text-xs font-bold ${selectedService === service.id ? 'text-[#0D7E9C]' : 'text-gray-600'} transition-colors`}>{service.price}</div>
                            <div className="text-xs text-gray-500 mt-1">{currentLang === 'zh' ? '价格' : 'Price'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.process.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.process.subtitle}</p>
          </div>

          {/* Desktop: Timeline Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0D7E9C] to-[#01847E]" />
              
              {/* Timeline items */}
              <div className="space-y-12">
                {t.process.steps.map((step, index) => {
                const IconComponent = step.icon === 'Users' ? Users : step.icon === 'Settings' ? Settings : step.icon === 'Zap' ? Zap : step.icon === 'CheckCircle' ? CheckCircle : Shield;
                return <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-full mr-3">
                            <IconComponent className="w-5 h-5 text-[#0D7E9C]" />
                          </div>
                          <span className="text-lg font-bold text-gray-900">{step.title}</span>
                        </div>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#0D7E9C] rounded-full shadow-lg" />
                  </div>;
              })}
              </div>
            </div>
          </div>

          {/* Mobile: Horizontal Scroll Layout */}
          <div className="lg:hidden">
            {/* Scroll Controls */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => scrollContainer('process-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
              <button onClick={() => scrollContainer('process-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div id="process-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: {
              display: 'none'
            }
          }}>
              {t.process.steps.map((step, index) => {
              const IconComponent = step.icon === 'Users' ? Users : step.icon === 'Settings' ? Settings : step.icon === 'Zap' ? Zap : step.icon === 'CheckCircle' ? CheckCircle : Shield;
              return <div key={index} className="group relative flex-none w-72">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    
                    {/* Main card */}
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-full mr-4">
                            <IconComponent className="w-6 h-6 text-[#0D7E9C]" />
                          </div>
                          <div>
                            <div className="text-xl font-bold text-gray-900">{step.title}</div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.advantages.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.advantages.subtitle}</p>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {t.advantages.items.map((item, index) => {
            const IconComponent = item.icon === 'Users' ? Users : item.icon === 'Clock' ? Clock : item.icon === 'Shield' ? Shield : Zap;
            return <div key={index} className="group relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
                    
                    {/* Content */}
                    <div className="relative p-8">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-2xl mr-4">
                          <IconComponent className="w-8 h-8 text-[#0D7E9C]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>;
          })}
          </div>

          {/* Mobile: Horizontal Scroll Layout */}
          <div className="lg:hidden">
            {/* Scroll Controls */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => scrollContainer('advantages-scroll', 'left')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 font-medium">{currentLang === 'zh' ? '左右滑动查看更多' : 'Swipe to see more'}</span>
              <button onClick={() => scrollContainer('advantages-scroll', 'right')} className="p-2 rounded-full bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 hover:from-[#0D7E9C]/20 hover:to-[#01847E]/20 text-[#0D7E9C] transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div id="advantages-scroll" className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: {
              display: 'none'
            }
          }}>
              {t.advantages.items.map((item, index) => {
              const IconComponent = item.icon === 'Users' ? Users : item.icon === 'Clock' ? Clock : item.icon === 'Shield' ? Shield : Zap;
              return <div key={index} className="group relative flex-none w-80">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#0D7E9C]/15 to-[#01847E]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    
                    {/* Main card */}
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden border border-white/50">
                      
                      {/* Content */}
                      <div className="relative p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-2xl mr-3">
                            <IconComponent className="w-6 h-6 text-[#0D7E9C]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>;
            })}
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
    </div>;
}