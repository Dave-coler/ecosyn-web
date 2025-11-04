// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Menu, X, Globe } from 'lucide-react';

export function Navigation({
  currentPage = 'home',
  onNavigate,
  onLanguageChange,
  currentLang = 'zh'
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 从localStorage读取语言设置，如果没有则使用默认值
  useEffect(() => {
    const savedLang = localStorage.getItem('website-language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      // 如果传入的currentLang与localStorage中的不同，更新语言状态
      if (savedLang !== currentLang && onLanguageChange) {
        onLanguageChange(savedLang);
      }
    }
  }, [currentLang, onLanguageChange]);

  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = event => {
      const {
        lang
      } = event.detail;
      if (lang && (lang === 'zh' || lang === 'en')) {
        // 语言变化时的处理逻辑
        if (onLanguageChange) {
          onLanguageChange(lang);
        }
      }
    };

    // 监听自定义语言变化事件
    window.addEventListener('languageChange', handleLanguageChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [onLanguageChange]);

  // 导航菜单文本
  const navigationTexts = {
    zh: {
      logo: 'HILLSEA',
      menu: {
        home: '首页',
        solutions: '解决方案',
        services: '服务',
        about: '关于我们'
      }
    },
    en: {
      logo: 'HILLSEA',
      menu: {
        home: 'Home',
        solutions: 'Solutions',
        services: 'Services',
        about: 'About Us'
      }
    }
  };
  const t = navigationTexts[currentLang];

  // 处理语言切换
  const handleLanguageToggle = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  // 处理导航点击
  const handleNavClick = page => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMenuOpen(false);
  };

  // 导航菜单项
  const menuItems = [{
    key: 'home',
    label: t.menu.home,
    page: 'home'
  }, {
    key: 'solutions',
    label: t.menu.solutions,
    page: 'solutions'
  }, {
    key: 'services',
    label: t.menu.services,
    page: 'services'
  }, {
    key: 'about',
    label: t.menu.about,
    page: 'about'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="flex items-center space-x-2 text-2xl font-bold text-[#0D7E9C] hover:text-[#01847E] transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HS</span>
              </div>
              <span>{t.logo}</span>
            </button>
          </div>

          {/* Desktop Navigation - 桌面端显示完整导航 */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map(item => <button key={item.key} onClick={() => handleNavClick(item.page)} className={`text-sm font-medium transition-colors hover:text-[#0D7E9C] ${currentPage === item.page ? 'text-[#0D7E9C] border-b-2 border-[#0D7E9C]' : 'text-gray-700'}`}>
                {item.label}
              </button>)}

            {/* Desktop Language Switcher - 桌面端直接切换按钮 */}
            <button onClick={handleLanguageToggle} className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-[#0D7E9C] transition-colors px-3 py-1 rounded-lg hover:bg-gray-100">
              <Globe className="w-4 h-4" />
              <span>{currentLang === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>

          {/* Mobile menu button - 移动端显示汉堡菜单 */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language Switcher - 移动端语言切换按钮 */}
            <button onClick={handleLanguageToggle} className="p-2 rounded-lg text-gray-700 hover:text-[#0D7E9C] hover:bg-gray-100 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg text-gray-700 hover:text-[#0D7E9C] hover:bg-gray-100 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - 移动端下拉菜单 */}
        {isMenuOpen && <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map(item => <button key={item.key} onClick={() => handleNavClick(item.page)} className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === item.page ? 'text-[#0D7E9C] bg-[#0D7E9C]/10' : 'text-gray-700 hover:text-[#0D7E9C] hover:bg-gray-100'}`}>
                  {item.label}
                </button>)}
            </div>
          </div>}
      </div>
    </nav>;
}