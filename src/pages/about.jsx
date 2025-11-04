// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, Mail, Phone, MapPin, Globe, Linkedin, Twitter } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { TeamSection } from '@/components/TeamSection';
import { TimelineSection } from '@/components/TimelineSection';
import { CompanyIntro } from '@/components/CompanyIntro';
import { CorporateCulture } from '@/components/CorporateCulture';
export default function About(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentLang, setCurrentLang] = useState('zh');

  // 从localStorage读取语言设置，如果没有则使用默认值
  // 从localStorage读取语言设置，如果没有则使用默认值
  useEffect(() => {
    const savedLang = localStorage.getItem('website-language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setCurrentLang(savedLang);
    }
  }, []);

  // 监听语言变化事件
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
    // 监听自定义语言变化事件
    window.addEventListener('languageChange', handleLanguageChange);
    // 清理事件监听器
    // 清理事件监听器
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // 语言切换时保存到localStorage
  // 语言切换时保存到localStorage
  const handleLanguageChange = lang => {
    setCurrentLang(lang);
    localStorage.setItem('website-language', lang);

    // 触发自定义事件，通知其他组件语言已变化
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
        title: '关于汉势',
        subtitle: '引领新能源革命，创造可持续未来',
        description: '汉势致力于通过创新技术推动新能源革命，为全球客户提供高效、可靠、可持续的新能源解决方案。'
      },
      company: {
        title: '公司简介',
        description: '汉势新能源科技有限公司成立于2020年，是一家专注于新能源技术研发与应用的高科技企业。公司以"创新、绿色、共享"为核心理念，致力于为全球客户提供高效、可靠、可持续的新能源解决方案。',
        mission: '我们的使命',
        missionText: '通过创新技术推动新能源革命，创造可持续发展的美好未来。',
        vision: '我们的愿景',
        visionText: '成为全球领先的新能源解决方案提供商，为地球的可持续发展贡献力量。',
        values: {
          title: '核心价值观',
          items: [{
            title: '创新',
            description: '持续创新，引领技术发展'
          }, {
            title: '绿色',
            description: '保护环境，推动可持续发展'
          }, {
            title: '共享',
            description: '合作共赢，共享发展成果'
          }, {
            title: '责任',
            description: '承担责任，回馈社会'
          }]
        }
      },
      culture: {
        title: '企业文化',
        description: '汉势以"创新、绿色、共享"为核心理念，打造开放、包容、进取的企业文化。',
        values: [{
          title: '创新驱动',
          description: '鼓励创新思维，推动技术突破',
          icon: 'Zap'
        }, {
          title: '绿色发展',
          description: '坚持环保理念，推动可持续发展',
          icon: 'Leaf'
        }, {
          title: '团队协作',
          description: '强调团队合作，实现共同目标',
          icon: 'Users'
        }, {
          title: '客户至上',
          description: '以客户需求为导向，提供优质服务',
          icon: 'Heart'
        }]
      },
      team: {
        title: '核心团队',
        subtitle: '汇聚行业精英，共创美好未来',
        members: [{
          name: '张明',
          position: '首席执行官',
          description: '拥有15年新能源行业经验，曾在多家知名企业担任高管职位。',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        }, {
          name: '李华',
          position: '首席技术官',
          description: '电驱动技术专家，拥有多项国际专利，在新能源领域有深厚的技术积累。',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
        }, {
          name: '王强',
          position: '首席运营官',
          description: '运营管理专家，擅长企业战略规划和团队建设，具有丰富的管理经验。',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        }, {
          name: '刘洋',
          position: '首席财务官',
          description: '财务专家，曾在多家上市公司担任财务总监，具有丰富的财务管理经验。',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
        }]
      },
      timeline: {
        title: '发展历程',
        events: [{
          year: '2020',
          title: '公司成立',
          description: '汉势新能源科技有限公司正式成立，开始新能源技术研发。'
        }, {
          year: '2021',
          title: '技术突破',
          description: '成功研发第一代ECOSYN电驱系统，获得多项技术专利。'
        }, {
          year: '2022',
          title: '市场拓展',
          description: '产品成功进入市场，与多家知名企业建立合作关系。'
        }, {
          year: '2023',
          title: '规模化发展',
          description: '实现规模化生产，产品远销海外市场，获得客户广泛认可。'
        }, {
          year: '2024',
          title: '创新升级',
          description: '推出第二代ECOSYN系统，技术性能达到国际领先水平。'
        }]
      },
      contact: {
        title: '联系我们',
        subtitle: '期待与您的合作',
        description: '如果您对我们的产品或服务有任何疑问，欢迎随时与我们联系。',
        info: {
          address: '上海市闵行区上海交通大学国家大学科技园955号基地',
          phone: '+86 755-8888-8888',
          email: 'sales@hill-sea.com / service@hill-sea.com',
          website: 'www.hill-sea.com'
        },
        form: {
          title: '发送消息',
          fields: {
            name: '姓名',
            email: '邮箱',
            subject: '主题',
            message: '消息内容'
          },
          button: '发送消息'
        }
      },
      cta: {
        title: '加入我们',
        subtitle: '与汉势一起，共创美好未来',
        button: '查看职位'
      }
    },
    en: {
      hero: {
        title: 'About HILLSEA',
        subtitle: 'Leading the New Energy Revolution, Creating a Sustainable Future',
        description: 'HILLSEA is committed to promoting the new energy revolution through innovative technology, providing efficient, reliable, and sustainable new energy solutions for global customers.'
      },
      company: {
        title: 'Company Profile',
        description: 'HILLSEA New Energy Technology Co., Ltd. was established in 2020 as a high-tech enterprise focusing on new energy technology R&D and application. With "innovation, green, sharing" as our core philosophy, we are committed to providing efficient, reliable, and sustainable new energy solutions for global customers.',
        mission: 'Our Mission',
        missionText: 'To promote the new energy revolution through innovative technology and create a beautiful future for sustainable development.',
        vision: 'Our Vision',
        visionText: 'To become a globally leading provider of new energy solutions and contribute to the sustainable development of the Earth.',
        values: {
          title: 'Core Values',
          items: [{
            title: 'Innovation',
            description: 'Continuous innovation, leading technological development'
          }, {
            title: 'Green',
            description: 'Protecting the environment, promoting sustainable development'
          }, {
            title: 'Sharing',
            description: 'Win-win cooperation, sharing development achievements'
          }, {
            title: 'Responsibility',
            description: 'Taking responsibility, giving back to society'
          }]
        }
      },
      culture: {
        title: 'Corporate Culture',
        description: 'HILLSEA takes "innovation, green, sharing" as its core philosophy, creating an open, inclusive, and progressive corporate culture.',
        values: [{
          title: 'Innovation Driven',
          description: 'Encourage innovative thinking, promote technological breakthroughs',
          icon: 'Zap'
        }, {
          title: 'Green Development',
          description: 'Adhere to environmental protection concepts, promote sustainable development',
          icon: 'Leaf'
        }, {
          title: 'Team Collaboration',
          description: 'Emphasize teamwork, achieve common goals',
          icon: 'Users'
        }, {
          title: 'Customer First',
          description: 'Customer-oriented, provide quality services',
          icon: 'Heart'
        }]
      },
      team: {
        title: 'Core Team',
        subtitle: 'Bringing together industry elites to create a better future',
        members: [{
          name: 'Zhang Ming',
          position: 'Chief Executive Officer',
          description: 'With 15 years of experience in the new energy industry, has held senior management positions in many well-known enterprises.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        }, {
          name: 'Li Hua',
          position: 'Chief Technology Officer',
          description: 'Electric drive technology expert with multiple international patents and deep technical accumulation in the new energy field.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
        }, {
          name: 'Wang Qiang',
          position: 'Chief Operating Officer',
          description: 'Operations management expert, skilled in corporate strategic planning and team building with rich management experience.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        }, {
          name: 'Liu Yang',
          position: 'Chief Financial Officer',
          description: 'Finance expert, has served as CFO in many listed companies with rich financial management experience.',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
        }]
      },
      timeline: {
        title: 'Development History',
        events: [{
          year: '2020',
          title: 'Company Established',
          description: 'HILLSEA New Energy Technology Co., Ltd. was officially established, starting new energy technology R&D.'
        }, {
          year: '2021',
          title: 'Technological Breakthrough',
          description: 'Successfully developed the first-generation ECOSYN electric drive system, obtaining multiple technology patents.'
        }, {
          year: '2022',
          title: 'Market Expansion',
          description: 'Products successfully entered the market, establishing cooperative relationships with many well-known enterprises.'
        }, {
          year: '2023',
          title: 'Scale Development',
          description: 'Achieved large-scale production, products sold to overseas markets, gaining wide customer recognition.'
        }, {
          year: '2024',
          title: 'Innovation Upgrade',
          description: 'Launched the second-generation ECOSYN system, with technical performance reaching international leading level.'
        }]
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'Looking forward to cooperating with you',
        description: 'If you have any questions about our products or services, please feel free to contact us.',
        info: {
          address: 'Base 955, National University Science and Technology Park, Shanghai Jiao Tong University, Minhang District, Shanghai',
          phone: '+86 755-8888-8888',
          email: 'sales@hill-sea.com / service@hill-sea.com',
          website: 'www.hill-sea.com'
        },
        form: {
          title: 'Send Message',
          fields: {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
          },
          button: 'Send Message'
        }
      },
      cta: {
        title: 'Join Us',
        subtitle: 'Create a better future together with HILLSEA',
        button: 'View Positions'
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
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <Navigation currentPage="about" onNavigate={handleNavigate} onLanguageChange={handleLanguageChange} currentLang={currentLang} />

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
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight my-[80px]">
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

      {/* Company Introduction */}
      <CompanyIntro currentLang={currentLang} />

      {/* Corporate Culture */}
      <CorporateCulture currentLang={currentLang} />

      {/* Team Section */}
      <TeamSection currentLang={currentLang} />

      {/* Timeline Section */}
      <TimelineSection currentLang={currentLang} />

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <p className="text-xl text-gray-600 mb-2">{t.contact.subtitle}</p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">{t.contact.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentLang === 'zh' ? '联系信息' : 'Contact Information'}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#0D7E9C] mr-4" />
                    <span className="text-gray-700">{t.contact.info.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#0D7E9C] mr-4" />
                    <span className="text-gray-700">{t.contact.info.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#0D7E9C] mr-4" />
                    <span className="text-gray-700">{t.contact.info.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-[#0D7E9C] mr-4" />
                    <span className="text-gray-700">{t.contact.info.website}</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentLang === 'zh' ? '关注我们' : 'Follow Us'}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-[#0D7E9C]/5 to-[#01847E]/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.form.title}</h3>
              <ContactForm currentLang={currentLang} />
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
            
            <Button onClick={() => handleNavigate('home')} className="bg-white text-[#0D7E9C] px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
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
      `}</style>
    </div>;
}