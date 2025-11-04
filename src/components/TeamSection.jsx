// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Users, Award, Target, Lightbulb } from 'lucide-react';

export function TeamSection({
  currentLang = 'zh'
}) {
  const teamData = {
    zh: {
      title: '核心团队',
      subtitle: '经验丰富的专业团队，致力于新能源技术创新',
      members: [{
        name: '周道武',
        position: '创始人 & CEO',
        description: '拥有10+年新能源行业经验，专注于电驱动系统和储能技术的研发与创新。曾担任航天氢能总工程师&产品总监、博雷顿 (01333.HK)联合创始人&技术副总裁等。',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        expertise: ['战略规划', '技术创新', '团队管理', '商业模式']
      }, {
        name: '杨林',
        position: '教授 首席科学家',
        description: '上海交通大学汽车电子技术研究所所长、徐工集团独立董事、中国能源学会常务理事、中国自动化学会车辆控制与智能化专委会委员。',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        expertise: ['智能控制', 'AI算法']
      }, {
        name: '李刚',
        position: '首席顾问',
        description: '上海财经大学 硕士，15+年产业投融资经验，曾任远东宏信、平安国际融资租赁高管，精通新能源项目金融结构与资本运作。',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        expertise: ['商业模型', '资产运营', '资产证券化']
      }, {
        name: '董悦航',
        position: 'CTO',
        description: '上海交通大学机械与动力工程学院博士，20+年整车与动力系统研发经验，曾任吉利汽车动力集成开发部新能源总工，也曾就职于哈弗汽车、麦格纳斯太尔上汽商用车等。',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        expertise: ['产品开发', '技术创新', '团队建设', '电驱技术', '储能技术']
      }, {
        name: '蓝天',
        position: 'CFO',
        description: '澳洲迪肯大学硕士，10+年券商投行、美元基金，私募股权基金及外企财务经验。曾担任海德投资（HK）联合创始人，历任光大证券业务发展部经理，知名私募基金风控总监。',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        expertise: ['财务模型', '风控', '融资']
      }],
      values: {
        title: '团队价值观',
        items: [{
          icon: 'Target',
          title: '创新驱动',
          description: '持续技术创新，引领行业发展'
        }, {
          icon: 'Users',
          title: '团队协作',
          description: '跨部门协作，共同创造价值'
        }, {
          icon: 'Award',
          title: '品质至上',
          description: '严格质量标准，确保产品可靠性'
        }, {
          icon: 'Lightbulb',
          title: '客户导向',
          description: '以客户需求为中心，提供定制化解决方案'
        }]
      }
    },
    en: {
      title: 'Core Team',
      subtitle: 'Experienced professional team dedicated to new energy technology innovation',
      members: [{
        name: 'Zhou Daowu',
        position: 'Founder & CEO',
        description: 'With 10+ years of experience in the new energy industry, focusing on R&D and innovation of electric drive systems and energy storage technology. Previously served as Chief Engineer & Product Director at Aerospace Hydrogen Energy, Co-founder & Technical Vice President at Boretton (01333.HK).',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        expertise: ['Strategic Planning', 'Technical Innovation', 'Team Management', 'Business Model']
      }, {
        name: 'Yang Lin',
        position: 'Professor Chief Scientist',
        description: 'Director of Automotive Electronics Technology Research Institute at Shanghai Jiao Tong University, Independent Director of XCMG Group, Executive Director of China Energy Society, Committee Member of Vehicle Control and Intelligence Committee of China Automation Society.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        expertise: ['Intelligent Control', 'AI Algorithms']
      }, {
        name: 'Li Gang',
        position: 'Chief Advisor',
        description: 'Master from Shanghai University of Finance and Economics, 15+ years of industrial investment and financing experience, previously served as executive at Far East Horizons, Ping An International Financial Leasing, proficient in new energy project financial structure and capital operation.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        expertise: ['Business Model', 'Asset Operation', 'Asset Securitization']
      }, {
        name: 'Dong Yuehang',
        position: 'CTO',
        description: 'PhD from School of Mechanical and Power Engineering, Shanghai Jiao Tong University, 20+ years of R&D experience in vehicles and power systems, previously served as New Energy Chief Engineer at Geely Automotive Power Integration Development Department, also worked at Haval Automotive, Magna Steyr SAIC Commercial Vehicles.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        expertise: ['Product Development', 'Technical Innovation', 'Team Building', 'Electric Drive Technology', 'Energy Storage Technology']
      }, {
        name: 'Lan Tian',
        position: 'CFO',
        description: 'Master from Deakin University, Australia, 10+ years of experience in securities investment banking, US dollar funds, private equity funds and foreign enterprise finance. Previously served as co-founder of Haide Investment (HK), Business Development Manager at China Everbright Securities, Risk Control Director at a well-known private equity fund.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        expertise: ['Financial Model', 'Risk Control', 'Financing']
      }],
      values: {
        title: 'Team Values',
        items: [{
          icon: 'Target',
          title: 'Innovation Driven',
          description: 'Continuous technological innovation, leading industry development'
        }, {
          icon: 'Users',
          title: 'Team Collaboration',
          description: 'Cross-departmental collaboration, creating value together'
        }, {
          icon: 'Award',
          title: 'Quality First',
          description: 'Strict quality standards, ensuring product reliability'
        }, {
          icon: 'Lightbulb',
          title: 'Customer Oriented',
          description: 'Customer-centric approach, providing customized solutions'
        }]
      }
    }
  };
  const t = teamData[currentLang];
  const getIcon = iconName => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'Award':
        return Award;
      case 'Target':
        return Target;
      case 'Lightbulb':
        return Lightbulb;
      default:
        return Users;
    }
  };
  return <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {t.members.map((member, index) => <div key={index} className="group">
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-full">
                {/* Member Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Member Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#0D7E9C] mb-3 leading-tight">{member.position}</p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-4">{member.description}</p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => <span key={skillIndex} className="px-2 py-1 bg-[#0D7E9C]/10 text-[#0D7E9C] text-xs rounded-full font-medium">
                        {skill}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* Team Values */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.values.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.items.map((value, index) => {
            const IconComponent = getIcon(value.icon);
            return <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0D7E9C]/10 to-[#01847E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-[#0D7E9C]/20 group-hover:to-[#01847E]/20 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-[#0D7E9C]" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>;
          })}
          </div>
        </div>
      </div>
    </section>;
}