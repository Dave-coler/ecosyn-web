// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ROICalculator } from '@/components/ROICalculator';
import { HeroSection } from '@/components/HeroSection';
import { CoreValuesSection } from '@/components/CoreValuesSection';
import { TechnologySection } from '@/components/TechnologySection';
import { SpecificationsSection } from '@/components/SpecificationsSection';
import { ApplicationsSection } from '@/components/ApplicationsSection';
import { JourneySection } from '@/components/JourneySection';
import { CTASection } from '@/components/CTASection';
export default function Home(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentLang, setCurrentLang] = useState('zh');
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        title: 'ECOSYN：为公路长距运输重塑低碳未来',
        subtitle: '全球首个为长距离公路列车量身定制的智能电驱产品。即插即用，立减80%燃料成本，零改装即可上路。',
        highlights: ['≥80% 燃料成本立减', '2400 kWh 超长续航', '0% 现有车队改装需求'],
        cta1: '立即计算 ROI',
        cta2: '预约技术演示'
      },
      coreValues: {
        title: 'ECOSYN 架构：由数据和电驱动主导的变革',
        subtitle: '以成本削减、智能兼容与安全稳定三大核心优势，定义下一代新能源公路列车的标准。',
        advantages: [{
          title: '成本削减引擎',
          subtitle: '燃油效益飞跃80%+',
          description: 'ECOSYN的纯电动驱动单元主动承担公路列车大部分牵引负荷，将柴油消耗从根本上削减。凭借2400 kWh的最大容量，实现更低OPEX和更高的盈利边际。',
          features: ['主动承担80%+牵引负荷', '2400 kWh超大容量', '降低OPEX运营成本', '提升盈利边际'],
          highlight: 'AI优化的能量管理系统(VIS)最大化制动能量回收效率',
          icon: 'TrendingUp',
          primaryColor: '#0D7E9C',
          secondaryColor: '#01847E',
          chartData: {
            before: 100,
            after: 20,
            label: '燃料消耗对比'
          }
        }, {
          title: '智能兼容，零门槛集成',
          subtitle: '革命性即插即用技术',
          description: '我们的智能感应系统(VIS)实现毫秒级响应，与任何主流牵引车实现完美兼容。消除昂贵的定制化改装和漫长的停机时间——加挂即走。',
          features: ['毫秒级响应速度', '完美兼容主流牵引车', '零定制化改装', '加挂即走'],
          highlight: 'VIS(Versatile Integration System)智能传感器实现精准扭矩控制与功能分配',
          icon: 'Zap',
          primaryColor: '#0D7E9C',
          secondaryColor: '#01847E',
          techSpecs: ['响应时间: <10ms', '兼容车型: 95%+', '安装时间: <30分钟']
        }, {
          title: '增强安全与稳定性',
          subtitle: '智能电子稳定系统',
          description: 'ECOSYN集成EASR(电子防滑系统)和IESS(智能电子车身稳定系统)，实时横摆阻尼控制，消除挂车摇摆和弯道侧翻风险，全面提升车辆安全和轮胎寿命。',
          features: ['EASR电子防滑系统', 'IESS智能车身稳定', '实时横摆阻尼控制', '提升轮胎寿命'],
          highlight: 'EDC(Electronic Differential Controller)提供全方位安全防护',
          icon: 'Shield',
          primaryColor: '#0D7E9C',
          secondaryColor: '#01847E',
          safetyMetrics: ['侧翻风险降低85%', '轮胎寿命延长40%', '制动距离缩短25%']
        }]
      },
      technology: {
        title: '技术的力量：四大系统协同定义公路长途运输新能源标准',
        subtitle: '从智能识别到分布式驱动，每一处设计都源自对极限工况的理解。',
        systems: [{
          name: 'VIS',
          title: '智能集成控制',
          subtitle: 'Versatile Integration System',
          features: ['智能感知系统', '驾驶意图识别', '实时扭矩动态分配', '状态监测和故障处理'],
          highlight: '让传统柴油车头与电驱挂车实现毫秒级协同。',
          icon: 'Wifi',
          image: '/images/vis-system.jpg'
        }, {
          name: 'EDC',
          title: '电差速控制',
          subtitle: 'Electronic Differential Controller',
          features: ['EASR 防滑控制', 'IESS 车身稳定系统', 'MEDS 多轴差速控制', 'IRBS 智能制动能量回收'],
          highlight: '实时动态分配扭矩，让安全性与能效并行。',
          icon: 'Settings',
          image: '/images/edc-system.jpg'
        }, {
          name: 'DDS',
          title: '分布式驱动系统',
          subtitle: 'Distributed Driveaxle System',
          features: ['双电驱桥 / 三电驱桥配置', '峰值扭矩 80,000–120,000 Nm', '峰值功率 700–1050 kW', '制动能量回收，大幅降低燃油消耗'],
          highlight: '多电驱桥布局，澎湃动力输出，助力重载高效爬坡。',
          icon: 'Power',
          image: '/images/dds-system.jpg'
        }, {
          name: 'ESS',
          title: '动力储能系统',
          subtitle: 'Energy Storage System',
          features: ['配置选项：800 kWh / 1600 kWh / 2400 kWh', '模块化储能架构，兼容快换方案', '能量密度提升45%', '电池循环寿命>8年'],
          highlight: 'Drop-and-Hook 快速更换模式，无需等待充电，终结续航焦虑。',
          icon: 'Battery',
          image: '/images/ess-system.jpg'
        }]
      },
      specifications: {
        title: '产品参数',
        subtitle: '选择适合您工作强度需求的ECOSYN产品配置',
        products: [{
          name: 'EcoSyn One',
          tagline: '较低工作强度场景解决方案',
          specs: {
            drive: '双电驱桥',
            battery: '800 kWh',
            torque: '80,000 Nm',
            power: '700 kW',
            vis: '标配',
            edc: '选配'
          },
          features: ['适合中短途运输', '性价比最优', '快速安装', '基础智能控制'],
          recommended: false,
          image: '/images/ecosyn-one.jpg'
        }, {
          name: 'EcoSyn Pro',
          tagline: '一般工作强度场景解决方案',
          specs: {
            drive: '双电驱桥',
            battery: '1600 kWh',
            torque: '80,000 Nm',
            power: '700 kW',
            vis: '标配',
            edc: '标配'
          },
          features: ['适合长途重载', '平衡性能与成本', '全功能智能控制', '增强安全系统'],
          recommended: false,
          image: '/images/ecosyn-pro.jpg'
        }, {
          name: 'EcoSyn Max',
          tagline: '高工作强度场景解决方案',
          specs: {
            drive: '三电驱桥',
            battery: '2400 kWh',
            torque: '120,000 Nm',
            power: '1050 kW',
            vis: '标配',
            edc: '标配'
          },
          features: ['超长续航能力', '极限重载性能', '顶级安全配置', '智能预测维护'],
          recommended: false,
          image: '/images/ecosyn-max.jpg'
        }]
      },
      applications: {
        title: '应用场景',
        subtitle: '让能源转型发生在每一公里',
        scenarios: [{
          title: '公路列车场景',
          subtitle: '长距离重载运输的绿色革命',
          description: '在长距离高载运输中，ECOSYN 以纯电分布式电驱承担主牵引力，有效削减柴油消耗 80% 以上。为物流企业带来显著的成本节约和环境效益。',
          benefits: ['80% 燃料削减', '提升运营效率', '增加利润空间'],
          icon: 'Truck',
          backgroundImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310a?w=1200&h=600&fit=crop',
          stats: {
            fuel: '80%',
            efficiency: '40%',
            range: '2400kWh'
          }
        }, {
          title: '电能配送场景',
          subtitle: '绿色能源的智能运输网络',
          description: 'ECOSYN 支持绿色能源的灵活运输，将风电、光伏或富余电能从电厂送往负载边缘。构建清洁能源的高效配送体系，助力碳中和目标实现。',
          benefits: ['绿色能源运输', '离网解决方案', '灵活配送'],
          icon: 'Battery',
          backgroundImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop',
          stats: {
            capacity: '2400kWh',
            flexibility: '95%',
            emission: '0%'
          }
        }]
      },
      journey: {
        title: '产品发展历程',
        milestones: [{
          year: '2022',
          event: 'ECOSYN 1.0 交付美国市场'
        }, {
          year: '2023',
          event: 'ECOSYN 1.5 完成开发迭代'
        }, {
          year: '2024',
          event: 'ECOSYN 1.0 完成10万公里路试'
        }, {
          year: '2025',
          event: 'ECOSYN 2.0 完成平台产品开发'
        }]
      },
      cta: {
        title: 'HILLSEA：高能耗场景新能源科技先驱',
        subtitle: '专注于为公路、矿山、港口等高能耗场景提供整体新能源解决方案',
        mission: '加速高能耗场景向可持续能源转型',
        goal: '帮助客户实现 ESG 合规与零排放目标',
        button: '联系我们'
      }
    },
    en: {
      hero: {
        title: 'ECOSYN: Redefining low-carbon long-haul transport',
        subtitle: 'The world\'s first intelligent electric drive system designed for long-distance road trains — plug & play, 80% fuel savings, zero modification required.',
        highlights: ['≥80% Fuel Cost Reduction', 'Up to 2400 kWh Range', '0% Retrofit Required'],
        cta1: 'Calculate ROI Now',
        cta2: 'Schedule Demo'
      },
      coreValues: {
        title: 'ECOSYN Architecture: A revolution driven by data and electric power',
        subtitle: 'Cost reduction, smart compatibility, and enhanced stability — defining the next standard for electric road trains.',
        advantages: [{
          title: 'Cost Reduction Engine',
          subtitle: 'Fuel efficiency leap 80%+',
          description: 'ECOSYN\'s pure electric drive unit actively handles most of the road train\'s traction load, fundamentally reducing diesel consumption. With 2400 kWh maximum capacity, achieve lower OPEX and higher profit margins.',
          features: ['Actively handles 80%+ traction load', '2400 kWh ultra-large capacity', 'Reduces OPEX costs', 'Increases profit margins'],
          highlight: 'AI-optimized energy management system (VIS) maximizes regenerative braking efficiency',
          icon: 'TrendingUp',
          primaryColor: '#0D7E9C',
          secondaryColor: '#01847E',
          chartData: {
            before: 100,
            after: 20,
            label: 'Fuel Consumption Comparison'
          }
        }, {
          title: 'Smart Compatibility, Zero-Barrier Integration',
          subtitle: 'Revolutionary plug & play technology',
          description: 'Our Versatile Integration System (VIS) enables millisecond response and perfect compatibility with any mainstream tractor. Eliminates expensive custom modifications and long downtime — hook and go.',
          features: ['Millisecond response speed', 'Perfect compatibility with mainstream tractors', 'Zero custom modification', 'Hook and go'],
          highlight: 'VIS (Versatile Integration System) smart sensors enable precise torque control and function distribution',
          icon: 'Zap',
          primaryColor: '#0D7E9C',
          secondaryColor: '#01847E',
          techSpecs: ['Response Time: <10ms', 'Compatible Models: 95%+', 'Installation Time: <30min']
        }, {
          title: 'Enhanced Safety & Stability',
          subtitle: 'Intelligent electronic stability system',
          description: 'ECOSYN integrates EASR and IESS for real-time yaw damping control, eliminating trailer swing and rollover risks, comprehensively improving vehicle safety and tire life.',
          features: ['EASR electronic anti-slip system', 'IESS intelligent body stability', 'Real-time yaw damping control', 'Extends tire life'],
          highlight: 'EDC (Electronic Differential Controller) provides comprehensive safety protection',
          icon: 'Shield',
          primaryColor: '#0D7E9C',
          secondaryColor: '#01847E',
          safetyMetrics: ['85% reduction in rollover risk', '40% extension in tire life', '25% reduction in braking distance']
        }]
      },
      technology: {
        title: 'The Power of Technology: Four Systems Collaboratively Defining New Energy Standards for Long-Haul Transport',
        subtitle: 'From intelligent recognition to distributed drive, every design originates from understanding extreme operating conditions.',
        systems: [{
          name: 'VIS',
          title: 'Versatile Integration System',
          subtitle: 'Intelligent Integration Control',
          features: ['Intelligent sensing system', 'Driving intent recognition', 'Real-time dynamic torque distribution', 'Condition monitoring and fault handling'],
          highlight: 'Enabling millisecond-level collaboration between traditional diesel tractors and electric drive trailers.',
          icon: 'Wifi',
          image: '/images/vis-system.jpg'
        }, {
          name: 'EDC',
          title: 'Electronic Differential Controller',
          subtitle: 'Electronic Differential Control',
          features: ['EASR anti-slip control', 'IESS body stability system', 'MEDS multi-axle differential control', 'IRBS intelligent regenerative braking'],
          highlight: 'Real-time dynamic torque distribution, enabling parallel safety and efficiency.',
          icon: 'Settings',
          image: '/images/edc-system.jpg'
        }, {
          name: 'DDS',
          title: 'Distributed Driveaxle System',
          subtitle: 'Distributed Drive System',
          features: ['Dual/triple electric drive axle configuration', 'Peak torque 80,000–120,000 Nm', 'Peak power 700–1050 kW', 'Regenerative braking, significantly reducing fuel consumption'],
          highlight: 'Multi-drive axle layout, powerful output, assisting heavy-load efficient climbing.',
          icon: 'Power',
          image: '/images/dds-system.jpg'
        }, {
          name: 'ESS',
          title: 'Energy Storage System',
          subtitle: 'Power Storage System',
          features: ['Configuration options: 800 kWh / 1600 kWh / 2400 kWh', 'Modular storage architecture, compatible with quick swap solutions', '45% increase in energy density', 'Battery cycle life >8 years'],
          highlight: 'Drop-and-Hook quick replacement mode, no waiting for charging, ending range anxiety.',
          icon: 'Battery',
          image: '/images/ess-system.jpg'
        }]
      },
      specifications: {
        title: 'Specifications',
        subtitle: 'Choose the ECOSYN product configuration that suits your work intensity needs',
        products: [{
          name: 'EcoSyn One',
          tagline: 'Low Work Intensity Scenario Solution',
          specs: {
            drive: 'Dual electric drive axle',
            battery: '800 kWh',
            torque: '80,000 Nm',
            power: '700 kW',
            vis: 'Standard',
            edc: 'Optional'
          },
          features: ['Suitable for medium-short haul', 'Best cost performance', 'Quick installation', 'Basic intelligent control'],
          recommended: false,
          image: '/images/ecosyn-one.jpg'
        }, {
          name: 'EcoSyn Pro',
          tagline: 'Moderate Work Intensity Scenario Solution',
          specs: {
            drive: 'Dual electric drive axle',
            battery: '1600 kWh',
            torque: '80,000 Nm',
            power: '700 kW',
            vis: 'Standard',
            edc: 'Standard'
          },
          features: ['Suitable for long-haul heavy load', 'Balanced performance and cost', 'Full-function intelligent control', 'Enhanced safety system'],
          recommended: false,
          image: '/images/ecosyn-pro.jpg'
        }, {
          name: 'EcoSyn Max',
          tagline: 'High Work Intensity Scenario Solution',
          specs: {
            drive: 'Triple electric drive axle',
            battery: '2400 kWh',
            torque: '120,000 Nm',
            power: '1050 kW',
            vis: 'Standard',
            edc: 'Standard'
          },
          features: ['Ultra-long range capability', 'Extreme heavy-load performance', 'Top-level safety configuration', 'Intelligent predictive maintenance'],
          recommended: false,
          image: '/images/ecosyn-max.jpg'
        }]
      },
      applications: {
        title: 'Applications',
        subtitle: 'Making energy transition happen every kilometer',
        scenarios: [{
          title: 'Road Train Scenario',
          subtitle: 'Green Revolution in Long-Distance Heavy Transport',
          description: 'In long-distance heavy-haul transport, ECOSYN\'s fully electric distributed drive handles primary traction, reducing diesel consumption by over 80%. Bringing significant cost savings and environmental benefits to logistics companies.',
          benefits: ['80% fuel reduction', 'improved operational efficiency', 'increased profitability'],
          icon: 'Truck',
          backgroundImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310a?w=1200&h=600&fit=crop',
          stats: {
            fuel: '80%',
            efficiency: '40%',
            range: '2400kWh'
          }
        }, {
          title: 'Energy Delivery Scenario',
          subtitle: 'Intelligent Transport Network for Green Energy',
          description: 'ECOSYN supports flexible transportation of renewable energy — moving wind, solar, or surplus power from generation to the load edge. Building an efficient distribution system for clean energy, helping achieve carbon neutrality goals.',
          benefits: ['renewable energy transport', 'off-grid solutions', 'flexible delivery'],
          icon: 'Battery',
          backgroundImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop',
          stats: {
            capacity: '2400kWh',
            flexibility: '95%',
            emission: '0%'
          }
        }]
      },
      journey: {
        title: 'Product Journey',
        milestones: [{
          year: '2022',
          event: 'ECOSYN 1.0 delivered to the U.S. market'
        }, {
          year: '2023',
          event: 'ECOSYN 1.5 development iteration completed'
        }, {
          year: '2024',
          event: 'ECOSYN 1.0 completed 100,000 km road tests'
        }, {
          year: '2025',
          event: 'ECOSYN 2.0 platform product development completed'
        }]
      },
      cta: {
        title: 'HILLSEA: Pioneer in new energy technology for high-consumption scenarios',
        subtitle: 'Focusing on integrated new energy solutions for highways, mines, ports and other high-consumption scenarios',
        mission: 'Accelerating the transition to sustainable energy in high-consumption scenarios',
        goal: 'Helping clients achieve ESG compliance and zero-emission goals',
        button: 'Contact Us'
      }
    }
  };
  const t = texts[currentLang];
  const handleNavigate = page => {
    if (page === 'home' || page === 'ecosyn') {
      // 滚动到页面顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      $w.utils.navigateTo({
        pageId: page,
        params: {}
      });
    }
  };
  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleProductSelect = productName => {
    setSelectedProduct(productName);
    toast({
      title: currentLang === 'zh' ? '产品选择' : 'Product Selection',
      description: `${productName} ${currentLang === 'zh' ? '已选择' : 'selected'}`
    });
  };

  // 处理预约技术演示按钮点击
  const handleScheduleDemo = () => {
    const subject = encodeURIComponent(currentLang === 'zh' ? 'ECOSYN技术演示预约' : 'ECOSYN Technical Demo Request');
    const body = encodeURIComponent(currentLang === 'zh' ? '请描述您的运营场景、设备需求或者其他可以帮助我们判断您需求的信息' : 'Please describe your operating scenarios, equipment requirements, or other information that can help us understand your needs');
    window.location.href = `mailto:sales@hill-sea.com?subject=${subject}&body=${body}`;
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'coreValues', 'technology', 'specifications', 'applications', 'journey', 'roi', 'cta'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={handleNavigate} onLanguageChange={handleLanguageChange} currentLang={currentLang} />

      {/* Hero Section */}
      <HeroSection currentLang={currentLang} />

      {/* Core Values Section */}
      <CoreValuesSection t={t} currentLang={currentLang} />

      {/* Technology Section */}
      <TechnologySection t={t} currentLang={currentLang} />

      {/* Specifications Section */}
      <SpecificationsSection t={t} currentLang={currentLang} selectedProduct={selectedProduct} handleProductSelect={handleProductSelect} />

      {/* Applications Section */}
      <ApplicationsSection t={t} currentLang={currentLang} />

      {/* Journey Section */}
      <JourneySection t={t} currentLang={currentLang} />

      {/* ROI Calculator Section */}
      <section id="roi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ROICalculator currentLang={currentLang} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection t={t} currentLang={currentLang} handleNavigate={handleNavigate} />

      {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>;
}