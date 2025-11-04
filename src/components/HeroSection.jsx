// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowRight, Play, Pause, TrendingDown, Battery, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export function HeroSection({
  currentLang = 'zh'
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const cardsContainerRef = useRef(null);

  // 多媒体资源数组 - 包含视频和图片
  const mediaItems = [{
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&h=1080&fit=crop',
    title: 'ECOSYN电驱系统',
    description: '智能电驱技术',
    isDark: true
  }, {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&h=1080&fit=crop',
    title: '公路运输',
    description: '长距离运输解决方案',
    isDark: true
  }, {
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1559302995-f1d524fd22f2?w=1920&h=1080&fit=crop',
    title: '智能电驱',
    description: '零改装上路',
    isDark: true
  }, {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&h=1080&fit=crop',
    title: '绿色运输',
    description: '低碳未来',
    isDark: true
  }];
  const heroData = {
    zh: {
      title: 'ECOSYN：为公路长距运输重塑低碳未来',
      subtitle: '全球首个为长距离公路列车量身定制的智能电驱产品',
      description: '即插即用，立减80%燃料成本，零改装即可上路。',
      dataCards: [{
        icon: 'TrendingDown',
        value: '≥80%',
        label: '燃料成本立减'
      }, {
        icon: 'Battery',
        value: '2400 kWh',
        label: '超长续航'
      }, {
        icon: 'Zap',
        value: '0%',
        label: '现有车队改装需求'
      }],
      buttons: {
        primary: '立即计算 ROI',
        secondary: '预约技术演示'
      }
    },
    en: {
      title: 'ECOSYN: Reshaping the Low-Carbon Future for Long-Haul Road Transport',
      subtitle: 'The world\'s first intelligent electric drive product tailored for long-haul road trains',
      description: 'Plug and play, instantly reduce fuel costs by 80%, hit the road with zero modifications.',
      dataCards: [{
        icon: 'TrendingDown',
        value: '≥80%',
        label: 'Instant Fuel Cost Reduction'
      }, {
        icon: 'Battery',
        value: '2400 kWh',
        label: 'Extended Range'
      }, {
        icon: 'Zap',
        value: '0%',
        label: 'Fleet Modification Required'
      }],
      buttons: {
        primary: 'Calculate ROI Now',
        secondary: 'Book Tech Demo'
      }
    }
  };
  const t = heroData[currentLang];

  // 自动轮播背景
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentMediaIndex(prevIndex => (prevIndex + 1) % mediaItems.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, [isPlaying, mediaItems.length]);

  // 更新背景状态
  useEffect(() => {
    setIsDarkBackground(mediaItems[currentMediaIndex]?.isDark ?? true);
  }, [currentMediaIndex, mediaItems]);

  // 预加载媒体资源
  useEffect(() => {
    const preloadMedia = () => {
      mediaItems.forEach(item => {
        if (item.type === 'image') {
          const img = new Image();
          img.src = item.src;
        } else if (item.type === 'video') {
          const video = document.createElement('video');
          video.src = item.src;
          video.preload = 'auto';
        }
      });
      setIsLoaded(true);
    };
    preloadMedia();
  }, [mediaItems]);

  // 卡片自动轮播（仅在小屏幕下）
  useEffect(() => {
    const isSmallScreen = window.innerWidth < 640;
    if (!isSmallScreen || isDragging) return;
    const interval = setInterval(() => {
      setCurrentCardIndex(prevIndex => (prevIndex + 1) % t.dataCards.length);
    }, 3000); // 每3秒切换一次

    return () => clearInterval(interval);
  }, [t.dataCards.length, isDragging]);

  // 触摸事件处理
  const handleTouchStart = e => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  const handleTouchMove = e => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50; // 滑动阈值
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else if (translateX < 0 && currentCardIndex < t.dataCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
    setTranslateX(0);
  };

  // 鼠标事件处理（桌面端）
  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else if (translateX < 0 && currentCardIndex < t.dataCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
    setTranslateX(0);
  };
  const handleROI = () => {
    // 滚动到ROI计算器部分
    const roiSection = document.getElementById('roi-calculator');
    if (roiSection) {
      roiSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleDemo = () => {
    // 构建邮件内容
    const subject = encodeURIComponent('ECOSYN技术演示预约 - ECOSYN Tech Demo Booking');
    const body = encodeURIComponent('您好，我希望预约ECOSYN产品的技术演示，了解更多关于智能电驱系统的详细信息。\n\nHello, I would like to book a technical demonstration of the ECOSYN product to learn more about the intelligent electric drive system.');

    // 创建mailto链接
    const mailtoLink = `mailto:sales@hill-sea.com?subject=${subject}&body=${body}`;

    // 打开邮件客户端
    window.location.href = mailtoLink;
  };
  const handleDotClick = index => {
    setCurrentMediaIndex(index);
  };
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const getIcon = iconName => {
    switch (iconName) {
      case 'TrendingDown':
        return TrendingDown;
      case 'Battery':
        return Battery;
      case 'Zap':
        return Zap;
      default:
        return Zap;
    }
  };
  const currentMedia = mediaItems[currentMediaIndex];

  // 根据背景颜色设置文字颜色 - 去掉描白边效果，保持渐变填充
  const titleStyle = {
    background: 'linear-gradient(135deg, #0D7E9C 0%, #01847E 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };
  const textColorClass = isDarkBackground ? 'text-white' : '';
  const subTextColorClass = isDarkBackground ? 'text-white/90' : 'text-gray-800';
  const descTextColorClass = isDarkBackground ? 'text-white/80' : 'text-gray-600';
  const cardBgClass = isDarkBackground ? 'bg-white/10 border-white/20' : 'bg-white/90 border-gray-200';
  const cardTextClass = isDarkBackground ? 'text-white' : 'text-gray-800';
  const cardSubTextClass = isDarkBackground ? 'text-white/80' : 'text-gray-600';
  const buttonPrimaryClass = isDarkBackground ? 'bg-white text-[#0D7E9C] hover:bg-gray-100' : 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white hover:from-[#0B6B80] hover:to-[#016F6A]';
  // "预约技术演示"按钮固定使用蓝绿渐变，悬停时保持白色字体
  const buttonSecondaryClass = 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white hover:from-[#0B6B80] hover:to-[#016F6A] hover:text-white';
  const controlButtonClass = isDarkBackground ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-black/20 text-gray-800 hover:bg-black/30';
  const dotClass = isDarkBackground ? 'bg-white/50 hover:bg-white/70' : 'bg-gray-400 hover:bg-gray-600';
  const activeDotClass = isDarkBackground ? 'bg-white' : 'bg-[#0D7E9C]';
  return <section className="relative h-screen overflow-hidden">
      {/* 多媒体背景 */}
      <div className="absolute inset-0">
        {mediaItems.map((item, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentMediaIndex ? 'opacity-100' : 'opacity-0'}`}>
            {item.type === 'video' ? <video className="w-full h-full object-cover" autoPlay={index === currentMediaIndex && isPlaying} muted loop playsInline poster={item.poster}>
                <source src={item.src} type="video/mp4" />
                您的浏览器不支持视频播放
              </video> : <img src={item.src} alt={item.title} className="w-full h-full object-cover" />}
            {/* 渐变遮罩 - 根据背景调整透明度 */}
            <div className={`absolute inset-0 ${isDarkBackground ? 'bg-gradient-to-r from-black/70 via-black/50 to-transparent' : 'bg-gradient-to-r from-white/70 via-white/50 to-transparent'}`} />
          </div>)}
      </div>

      {/* 播放控制按钮 */}
      <button onClick={togglePlayPause} className={`absolute bottom-8 right-8 z-20 ${controlButtonClass} backdrop-blur-sm p-3 rounded-full transition-all duration-300`} aria-label={isPlaying ? '暂停' : '播放'}>
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      {/* 轮播指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {mediaItems.map((_, index) => <button key={index} onClick={() => handleDotClick(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentMediaIndex ? `${activeDotClass} w-8` : dotClass}`} aria-label={`切换到第${index + 1}个媒体`} />)}
      </div>

      {/* 内容覆盖层 - 完全居中，增强响应式设计 */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <div className="w-full max-w-6xl mx-auto">
            {/* 主标题 - 去掉描白边效果，保持渐变填充和加粗 */}
            <h1 className={`font-black mb-3 sm:mb-4 md:mb-6 leading-tight ${textColorClass} 
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl
              px-2 sm:px-4 md:px-0 animate-fade-in-up`} style={titleStyle}>
              {t.title}
            </h1>
            
            {/* 副标题 - 响应式字体大小 */}
            <p className={`font-medium mb-2 sm:mb-3 md:mb-4 ${subTextColorClass}
              text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
              px-4 sm:px-6 md:px-8 lg:px-0 animate-fade-in-up animation-delay-200`}>
              {t.subtitle}
            </p>
            
            {/* 描述 - 响应式字体大小和间距 */}
            <p className={`leading-relaxed mb-4 sm:mb-6 md:mb-8
              text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
              max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 ${descTextColorClass} animate-fade-in-up animation-delay-400`}>
              {t.description}
            </p>

            {/* 数据亮点卡片 - 响应式布局，支持滑动 */}
            <div className={`mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto px-2 sm:px-4 md:px-0`}>
              {/* 桌面端：网格布局 */}
              <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {t.dataCards.map((card, index) => {
                const IconComponent = getIcon(card.icon);
                return <div key={index} className={`${cardBgClass} backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animation-delay-${index * 200}`}>
                    <div className="flex items-center justify-center mb-2 sm:mb-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-12 md:w-12 md:h-12 ${isDarkBackground ? 'bg-white/20' : 'bg-gradient-to-r from-[#0D7E9C]/20 to-[#01847E]/20'} rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 md:mr-4`}>
                        <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${cardTextClass}`} />
                      </div>
                      <div className="text-left">
                        <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${cardTextClass}`}>{card.value}</div>
                        <div className={`text-xs sm:text-sm ${cardSubTextClass}`}>{card.label}</div>
                      </div>
                    </div>
                  </div>;
              })}
              </div>

              {/* 移动端：左右滑动布局 */}
              <div className="sm:hidden relative">
                <div ref={cardsContainerRef} className="overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                  <div className="flex transition-transform duration-300 ease-out" style={{
                  transform: `translateX(calc(-${currentCardIndex * 100}% + ${translateX}px))`
                }}>
                    {t.dataCards.map((card, index) => {
                    const IconComponent = getIcon(card.icon);
                    return <div key={index} className={`w-full flex-shrink-0 px-2 ${cardBgClass} backdrop-blur-md rounded-xl p-4 border hover:shadow-xl transition-all duration-300`}>
                        <div className="flex items-center justify-center">
                          <div className={`w-10 h-10 ${isDarkBackground ? 'bg-white/20' : 'bg-gradient-to-r from-[#0D7E9C]/20 to-[#01847E]/20'} rounded-xl flex items-center justify-center mr-3`}>
                            <IconComponent className={`w-5 h-5 ${cardTextClass}`} />
                          </div>
                          <div className="text-left">
                            <div className={`text-xl font-bold ${cardTextClass}`}>{card.value}</div>
                            <div className={`text-sm ${cardSubTextClass}`}>{card.label}</div>
                          </div>
                        </div>
                      </div>;
                  })}
                  </div>
                </div>

                {/* 卡片指示器 */}
                <div className="flex justify-center mt-3 space-x-2">
                  {t.dataCards.map((_, index) => <button key={index} onClick={() => setCurrentCardIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentCardIndex ? `${activeDotClass} w-6` : dotClass}`} />)}
                </div>
              </div>
            </div>

            {/* CTA按钮组 - 响应式布局 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4 sm:px-6 md:px-0 animate-fade-in-up animation-delay-800">
              <Button onClick={handleROI} className={`${buttonPrimaryClass} px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base md:text-lg w-full sm:w-auto`}>
                {t.buttons.primary}
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Button>
              <Button onClick={handleDemo} variant="outline" className={`${buttonSecondaryClass} px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base md:text-lg w-full sm:w-auto`}>
                {t.buttons.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 滚动指示器 - 响应式位置 */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className={`w-5 h-8 sm:w-6 h-10 border-2 ${isDarkBackground ? 'border-white/50' : 'border-gray-400'} rounded-full flex justify-center`}>
            <div className={`w-1 h-2 sm:h-3 ${isDarkBackground ? 'bg-white/50' : 'bg-gray-400'} rounded-full mt-1 sm:mt-2 animate-pulse`}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </section>;
}