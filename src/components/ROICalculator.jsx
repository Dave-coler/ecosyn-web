// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';
// @ts-ignore;
import { Calculator, MapPin, Settings, ChevronDown, ChevronUp, Info, ArrowRight, ArrowLeft, CheckCircle, Star, Mail, TrendingUp, DollarSign, Calendar, BarChart3, Download, Share2, AlertCircle, Leaf, Target, PiggyBank, Truck, Zap } from 'lucide-react';

export function ROICalculator({
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [currentLang, setCurrentLang] = useState('zh');
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // 从localStorage读取语言设置
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('website-language') || 'zh';
      setCurrentLang(savedLang);
    };

    // 初始化语言设置
    updateLanguage();

    // 监听语言变化事件
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

    // 监听storage变化（其他标签页的语言切换）
    const handleStorageChange = e => {
      if (e.key === 'website-language') {
        updateLanguage();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 定期检查语言设置变化
    const languageCheckInterval = setInterval(() => {
      const savedLang = localStorage.getItem('website-language') || 'zh';
      if (savedLang !== currentLang) {
        setCurrentLang(savedLang);
      }
    }, 1000);

    // 清理事件监听器
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(languageCheckInterval);
    };
  }, [currentLang]);

  // 国家和地区配置
  const locationConfig = {
    China: {
      name: {
        zh: '中国',
        en: 'China'
      },
      currency: '¥',
      currencyCode: 'CNY',
      dieselPrice: {
        min: 5,
        max: 12.5,
        default: 7.5
      },
      electricityPrice: {
        min: 0,
        max: 1.4,
        default: 0.65
      },
      provinces: {
        zh: ['北京', '上海', '广东', '江苏', '浙江', '山东', '四川', '湖北', '河南', '湖南'],
        en: ['Beijing', 'Shanghai', 'Guangdong', 'Jiangsu', 'Zhejiang', 'Shandong', 'Sichuan', 'Hubei', 'Henan', 'Hunan']
      }
    },
    USA: {
      name: {
        zh: '美国',
        en: 'USA'
      },
      currency: '$',
      currencyCode: 'USD',
      dieselPrice: {
        min: 0.7,
        max: 1.75,
        default: 1.0
      },
      electricityPrice: {
        min: 0,
        max: 0.2,
        default: 0.08
      },
      states: {
        zh: ['加利福尼亚', '德克萨斯', '纽约', '佛罗里达', '伊利诺伊', '宾夕法尼亚', '俄亥俄', '乔治亚', '北卡罗来纳', '密歇根'],
        en: ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan']
      }
    },
    Australia: {
      name: {
        zh: '澳大利亚',
        en: 'Australia'
      },
      currency: 'AU$',
      currencyCode: 'AUD',
      dieselPrice: {
        min: 1.0,
        max: 2.5,
        default: 2.0
      },
      electricityPrice: {
        min: 0,
        max: 0.28,
        default: 0.1
      },
      states: {
        zh: ['新南威尔士', '维多利亚', '昆士兰', '西澳大利亚', '南澳大利亚', '塔斯马尼亚', '首都领地', '北领地'],
        en: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']
      }
    },
    Canada: {
      name: {
        zh: '加拿大',
        en: 'Canada'
      },
      currency: 'CA$',
      currencyCode: 'CAD',
      dieselPrice: {
        min: 1.0,
        max: 2.5,
        default: 1.7
      },
      electricityPrice: {
        min: 0,
        max: 0.28,
        default: 0.08
      },
      provinces: {
        zh: ['安大略', '魁北克', '不列颠哥伦比亚', '阿尔伯塔', '曼尼托巴', '萨斯喀彻温', '新斯科舍', '新不伦瑞克'],
        en: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick']
      }
    }
  };

  // 根据语言选择默认国家
  const getDefaultCountry = () => {
    return currentLang === 'zh' ? 'China' : 'Australia';
  };

  // 表单状态
  const [formData, setFormData] = useState(() => {
    const defaultCountry = getDefaultCountry();
    return {
      // 基础参数
      annualKm: 100000,
      fuelConsumption: 60,
      vehicleCount: 10,
      country: defaultCountry,
      province: '',
      city: '',
      dieselPrice: locationConfig[defaultCountry].dieselPrice.default,
      electricityPrice: locationConfig[defaultCountry].electricityPrice.default
    };
  });

  // 型号选择状态
  const [selectedModel, setSelectedModel] = useState('');
  const [cooperationMode, setCooperationMode] = useState('purchase');
  const [calculationResults, setCalculationResults] = useState(null);

  // 当语言改变时，更新默认国家（如果当前国家与新语言默认国家不同）
  useEffect(() => {
    const defaultCountry = getDefaultCountry();
    setFormData(prev => {
      // 只有当当前国家不是默认国家，且用户没有手动修改过国家时才更新
      if (prev.country === (currentLang === 'zh' ? 'Australia' : 'China')) {
        const newLocationConfig = locationConfig[defaultCountry];
        return {
          ...prev,
          country: defaultCountry,
          dieselPrice: newLocationConfig.dieselPrice.default,
          electricityPrice: newLocationConfig.electricityPrice.default,
          province: '',
          city: ''
        };
      }
      return prev;
    });
  }, [currentLang]);

  // 文本内容
  const texts = {
    zh: {
      title: '投资回报计算器',
      subtitle: '精准计算ECOSYN系统的投资回报率',
      description: '输入您的车辆运行参数，我们将为您推荐最适合的ECOSYN型号并计算投资回报。',
      steps: {
        input: '参数输入',
        model: '型号选择',
        result: '结果展示'
      },
      step1: {
        title: '基础参数',
        annualKm: {
          label: '年行驶里程',
          unit: 'km'
        },
        fuelConsumption: {
          label: '百公里油耗',
          unit: 'L/100km'
        },
        vehicleCount: {
          label: '车辆数量',
          unit: '辆'
        },
        location: {
          country: '运行所在地（国家）',
          province: '省/州',
          city: '市'
        },
        dieselPrice: {
          label: '柴油价格',
          unit: '元/L'
        },
        electricityPrice: {
          label: '平均电价',
          unit: '元/kWh'
        }
      },
      step2: {
        title: '选择ECOSYN型号',
        cooperation: {
          title: '合作方式',
          purchase: '我要购买ECOSYN',
          lease: '我要租赁ECOSYN'
        },
        custom: {
          title: '定制方案',
          subtitle: '基于您提供的参数我们不推荐您选择标准产品，我们可以提供定制化解决方案'
        }
      },
      step3: {
        title: '投资回报分析结果',
        results: {
          annualSavings: '年节省成本',
          totalSavings: '总节省成本',
          npv: '净现值 (NPV)',
          irr: '内部收益率 (IRR)',
          paybackPeriod: '投资回收期',
          roi: '投资回报率 (ROI)',
          carbonReduction: '碳减排量'
        },
        buttons: {
          getSpec: '获取完整规格书及定制化财务分析'
        }
      },
      buttons: {
        next: '下一步',
        previous: '上一步',
        submit: '提交',
        getCustom: '获取定制方案',
        consult: '立即咨询'
      },
      disclaimer: '该测算采用特定工况数据模拟，难以避免实际场景不同、设备配置不同对测算结果带来的影响，不作为商务或最终报价依据，仅作为参考。同样，该测算也未将当地补贴纳入在内。',
      placeholders: {
        selectProvince: '请选择',
        enterCity: '请输入城市名称'
      },
      units: {
        tenThousandKm: '万',
        years: '年',
        tons: '吨'
      },
      labels: {
        referencePrice: '参考价格',
        selectedSolution: '选择方案',
        cooperationMode: '合作方式',
        purchase: '购买',
        lease: '租赁',
        recommended: '智能推荐',
        calculating: '计算中...',
        getNow: '立即获取',
        annualFuelConsumption: '年燃油消耗：'
      }
    },
    en: {
      title: 'ROI Calculator',
      subtitle: 'Calculate the return on investment for ECOSYN system',
      description: 'Enter your vehicle operating parameters, and we will recommend the most suitable ECOSYN model and calculate the return on investment.',
      steps: {
        input: 'Parameter Input',
        model: 'Model Selection',
        result: 'Results'
      },
      step1: {
        title: 'Basic Parameters',
        annualKm: {
          label: 'Annual Mileage',
          unit: 'km'
        },
        fuelConsumption: {
          label: 'Fuel Consumption',
          unit: 'L/100km'
        },
        vehicleCount: {
          label: 'Vehicle Count',
          unit: 'vehicles'
        },
        location: {
          country: 'Operating Location (Country)',
          province: 'State/Province',
          city: 'City'
        },
        dieselPrice: {
          label: 'Diesel Price',
          unit: '$/L'
        },
        electricityPrice: {
          label: 'Average Electricity Price',
          unit: '$/kWh'
        }
      },
      step2: {
        title: 'Select ECOSYN Model',
        cooperation: {
          title: 'Cooperation Mode',
          purchase: 'I want to purchase ECOSYN',
          lease: 'I want to lease ECOSYN'
        },
        custom: {
          title: 'Custom Solution',
          subtitle: 'Based on the parameters you provided, we do not recommend standard products. We can provide customized solutions'
        }
      },
      step3: {
        title: 'Investment Return Analysis Results',
        results: {
          annualSavings: 'Annual Savings',
          totalSavings: 'Total Savings',
          npv: 'Net Present Value (NPV)',
          irr: 'Internal Rate of Return (IRR)',
          paybackPeriod: 'Payback Period',
          roi: 'Return on Investment (ROI)',
          carbonReduction: 'Carbon Reduction'
        },
        buttons: {
          getSpec: 'Get Complete Specifications & Customized Financial Analysis'
        }
      },
      buttons: {
        next: 'Next Step',
        previous: 'Previous Step',
        submit: 'Submit',
        getCustom: 'Get Custom Solution',
        consult: 'Consult Now'
      },
      disclaimer: 'This calculation uses specific operating condition data simulation. It is difficult to avoid the impact of different actual scenarios and equipment configurations on the calculation results. It is not used as a business or final quotation basis, only for reference. Similarly, this calculation does not include local subsidies.',
      placeholders: {
        selectProvince: 'Please select',
        enterCity: 'Enter city name'
      },
      units: {
        tenThousandKm: '10k',
        years: 'years',
        tons: 'tons'
      },
      labels: {
        referencePrice: 'Reference Price',
        selectedSolution: 'Selected Solution',
        cooperationMode: 'Cooperation Mode',
        purchase: 'Purchase',
        lease: 'Lease',
        recommended: 'Smart Recommendation',
        calculating: 'Calculating...',
        getNow: 'Get Now',
        annualFuelConsumption: 'Annual Fuel Consumption: '
      }
    }
  };
  const t = texts[currentLang];
  const currentLocationConfig = locationConfig[formData.country];

  // 型号配置
  const modelConfig = {
    'ECOSYN ONE': {
      name: 'ECOSYN ONE',
      description: {
        zh: '适用于相对轻度能耗使用场景，性价比最高的入门级解决方案',
        en: 'Suitable for relatively light energy consumption scenarios, the most cost-effective entry-level solution'
      },
      price: {
        China: 1410000,
        USA: 370000,
        Australia: 350000,
        Canada: 370000
      },
      icon: Truck,
      color: 'from-blue-500 to-cyan-500'
    },
    'ECOSYN PRO': {
      name: 'ECOSYN PRO',
      description: {
        zh: '适用于中度运营负荷、中等能耗使用场景，平衡性能与成本的专业级解决方案',
        en: 'Suitable for moderate operational load and medium energy consumption scenarios, professional solution balancing performance and cost'
      },
      price: {
        China: 2340000,
        USA: 635000,
        Australia: 570000,
        Canada: 635000
      },
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    'ECOSYN MAX': {
      name: 'ECOSYN MAX',
      description: {
        zh: '适用于高运营负荷、高能耗使用场景，高性能解决方案',
        en: 'Suitable for high operational load and high energy consumption scenarios, high-performance solution'
      },
      price: {
        China: 3340000,
        USA: 910000,
        Australia: 800000,
        Canada: 910000
      },
      icon: Settings,
      color: 'from-orange-500 to-red-500'
    }
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };

      // 当国家改变时，更新默认价格和清空省市
      if (field === 'country') {
        const newLocationConfig = locationConfig[value];
        newData.dieselPrice = newLocationConfig.dieselPrice.default;
        newData.electricityPrice = newLocationConfig.electricityPrice.default;
        newData.province = '';
        newData.city = '';
      }
      return newData;
    });
  };

  // 验证表单
  const validateForm = () => {
    if (formData.annualKm < 50000 || formData.annualKm > 300000) {
      toast({
        title: currentLang === 'zh' ? '参数错误' : 'Parameter Error',
        description: currentLang === 'zh' ? '年行驶里程应在5-30万公里之间' : 'Annual mileage should be between 50,000-300,000 km',
        variant: 'destructive'
      });
      return false;
    }
    if (formData.fuelConsumption < 30 || formData.fuelConsumption > 150) {
      toast({
        title: currentLang === 'zh' ? '参数错误' : 'Parameter Error',
        description: currentLang === 'zh' ? '百公里油耗应在30-150L之间' : 'Fuel consumption should be between 30-150L/100km',
        variant: 'destructive'
      });
      return false;
    }
    return true;
  };

  // 获取推荐型号
  const getRecommendedModel = () => {
    const annualFuelConsumption = formData.annualKm * formData.fuelConsumption / 100;
    if (annualFuelConsumption > 60000 && annualFuelConsumption <= 120000) {
      return 'ECOSYN ONE';
    } else if (annualFuelConsumption > 120000 && annualFuelConsumption <= 200000) {
      return 'ECOSYN PRO';
    } else if (annualFuelConsumption > 200000 && annualFuelConsumption <= 300000) {
      return 'ECOSYN MAX';
    } else {
      return 'custom';
    }
  };

  // 计算月租金
  const calculateMonthlyRent = modelName => {
    if (!modelConfig[modelName]) return 0;
    const price = modelConfig[modelName].price[formData.country];
    return Math.round(price / 36 / 100) * 100;
  };

  // 计算投资回报
  const calculateROI = async () => {
    setIsCalculating(true);

    // 模拟计算过程
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 基础计算
    const annualFuelL = formData.annualKm * formData.fuelConsumption / 100;
    const annualDieselCost = annualFuelL * formData.dieselPrice * formData.vehicleCount;
    const annualElecCost = annualFuelL * 0.82 * 4 * formData.electricityPrice * formData.vehicleCount;
    const annualOperatingSavings = annualDieselCost - annualElecCost;

    // 获取型号价格
    let capexTotal = 0;
    if (selectedModel !== 'custom' && modelConfig[selectedModel]) {
      capexTotal = modelConfig[selectedModel].price[formData.country] * formData.vehicleCount;
    }

    // 租赁模式计算
    let annualNetCashflow = 0;
    if (cooperationMode === 'lease') {
      const monthlyRent = calculateMonthlyRent(selectedModel);
      annualNetCashflow = annualOperatingSavings - monthlyRent * 12 * formData.vehicleCount;
    } else {
      // 购买模式计算
      const discountRate = 0.08;
      const annualizedCapex = capexTotal * (discountRate * Math.pow(1 + discountRate, 10) / (Math.pow(1 + discountRate, 10) - 1));
      annualNetCashflow = annualOperatingSavings - annualizedCapex;
    }

    // NPV计算
    let npv = -capexTotal;
    for (let year = 1; year <= 10; year++) {
      npv += annualNetCashflow / Math.pow(1 + 0.08, year);
    }

    // IRR计算（简化版）
    let irr = 0.15;
    if (annualNetCashflow > 0 && capexTotal > 0) {
      irr = Math.pow(annualNetCashflow / capexTotal, 1 / 10) - 1;
    }

    // 投资回收期
    let paybackPeriod = capexTotal / annualNetCashflow;
    if (paybackPeriod < 0) paybackPeriod = 0;

    // ROI计算
    const totalSavings = annualNetCashflow * 10;
    const roi = totalSavings / capexTotal * 100;

    // 碳减排计算
    const annualCarbonReduction = annualFuelL * 2.68 * formData.vehicleCount;
    const results = {
      annualSavings: Math.round(annualNetCashflow),
      totalSavings: Math.round(totalSavings),
      npv: Math.round(npv),
      irr: (irr * 100).toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(2),
      roi: roi.toFixed(2),
      carbonReduction: Math.round(annualCarbonReduction / 1000) // 转换为吨
    };
    setCalculationResults(results);
    setIsCalculating(false);
  };

  // 下一步
  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateForm()) return;
      const recommended = getRecommendedModel();
      setSelectedModel(recommended);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedModel) {
        toast({
          title: currentLang === 'zh' ? '请选择型号' : 'Please select a model',
          description: currentLang === 'zh' ? '请选择一个ECOSYN型号继续' : 'Please select an ECOSYN model to continue',
          variant: 'destructive'
        });
        return;
      }
      if (selectedModel === 'custom') {
        handleCustomSolution();
        return;
      }
      setCurrentStep(3);
      calculateROI();
    }
  };

  // 上一步
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 定制方案
  const handleCustomSolution = () => {
    const subject = encodeURIComponent(currentLang === 'zh' ? 'ECOSYN定制方案咨询' : 'ECOSYN Custom Solution Consultation');
    const body = encodeURIComponent(`
${currentLang === 'zh' ? '基本信息：' : 'Basic Information:'}
${currentLang === 'zh' ? '年行驶里程：' : 'Annual Mileage:'} ${formData.annualKm.toLocaleString()} km
${currentLang === 'zh' ? '百公里油耗：' : 'Fuel Consumption:'} ${formData.fuelConsumption} L/100km
${currentLang === 'zh' ? '车辆数量：' : 'Vehicle Count:'} ${formData.vehicleCount}
${currentLang === 'zh' ? '运行所在地：' : 'Operating Location:'} ${locationConfig[formData.country].name[currentLang]}
${currentLang === 'zh' ? '柴油价格：' : 'Diesel Price:'} ${formData.dieselPrice} ${currentLocationConfig.currency}/L
${currentLang === 'zh' ? '电价：' : 'Electricity Price:'} ${formData.electricityPrice} ${currentLocationConfig.currency}/kWh
    `);
    window.location.href = `mailto:contact@hillsea.com?subject=${subject}&body=${body}`;
  };

  // 获取规格书
  const handleGetSpec = () => {
    const subject = encodeURIComponent(currentLang === 'zh' ? '获取ECOSYN完整规格书' : 'Get Complete ECOSYN Specifications');
    let body = encodeURIComponent(`
${currentLang === 'zh' ? '投资回报计算结果：' : 'Investment Return Calculation Results:'}
${currentLang === 'zh' ? '选择型号：' : 'Selected Model:'} ${selectedModel}
${currentLang === 'zh' ? '合作方式：' : 'Cooperation Mode:'} ${cooperationMode === 'purchase' ? t.labels.purchase : t.labels.lease}
${currentLang === 'zh' ? '年节省成本：' : 'Annual Savings:'} ${currentLocationConfig.currency}${calculationResults?.annualSavings?.toLocaleString()}
${currentLang === 'zh' ? '总节省成本：' : 'Total Savings:'} ${currentLocationConfig.currency}${calculationResults?.totalSavings?.toLocaleString()}
${currentLang === 'zh' ? '净现值：' : 'NPV:'} ${currentLocationConfig.currency}${calculationResults?.npv?.toLocaleString()}
${currentLang === 'zh' ? '内部收益率：' : 'IRR:'} ${calculationResults?.irr}%
${currentLang === 'zh' ? '投资回收期：' : 'Payback Period:'} ${calculationResults?.paybackPeriod} ${t.units.years}
${currentLang === 'zh' ? '投资回报率：' : 'ROI:'} ${calculationResults?.roi}%
${currentLang === 'zh' ? '碳减排量：' : 'Carbon Reduction:'} ${calculationResults?.carbonReduction} ${t.units.tons}
    `);
    window.location.href = `mailto:contact@hillsea.com?subject=${subject}&body=${body}`;
  };

  // 获取货币符号
  const getCurrencySymbol = () => {
    return currentLocationConfig.currency;
  };

  // 获取省/州列表
  const getProvinceList = () => {
    const key = formData.country === 'USA' ? 'states' : 'provinces';
    return currentLocationConfig[key]?.[currentLang] || [];
  };
  return <div style={style} className={`min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Calculator className="w-12 h-12 text-[#0D7E9C] mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">{t.subtitle}</p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">{t.description}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {['input', 'model', 'result'].map((step, index) => <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${currentStep > index + 1 ? 'bg-green-500 text-white' : currentStep === index + 1 ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white' : 'bg-gray-300 text-gray-500'}`}>
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium transition-all duration-300 ${currentStep === index + 1 ? 'text-[#0D7E9C]' : 'text-gray-500'}`}>
                  {t.steps[step]}
                </span>
                {index < 2 && <div className="w-16 h-0.5 bg-gray-300 ml-4" />}
              </div>)}
          </div>
        </div>

        {/* Step 1: Parameter Input */}
        {currentStep === 1 && <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.step1.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* 年行驶里程 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.annualKm.label}
                  <span className="text-gray-500 ml-1">({t.step1.annualKm.unit})</span>
                </label>
                <div className="space-y-2">
                  <input type="range" min="50000" max="300000" step="10000" value={formData.annualKm} onChange={e => handleInputChange('annualKm', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0D7E9C]" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5{t.units.tenThousandKm}</span>
                    <span className="font-semibold text-[#0D7E9C]">{(formData.annualKm / 10000).toFixed(1)}{t.units.tenThousandKm}</span>
                    <span>30{t.units.tenThousandKm}</span>
                  </div>
                </div>
              </div>

              {/* 百公里油耗 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.fuelConsumption.label}
                  <span className="text-gray-500 ml-1">({t.step1.fuelConsumption.unit})</span>
                </label>
                <div className="space-y-2">
                  <input type="range" min="30" max="150" step="5" value={formData.fuelConsumption} onChange={e => handleInputChange('fuelConsumption', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0D7E9C]" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>30</span>
                    <span className="font-semibold text-[#0D7E9C]">{formData.fuelConsumption}</span>
                    <span>150</span>
                  </div>
                </div>
              </div>

              {/* 车辆数量 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.vehicleCount.label}
                  <span className="text-gray-500 ml-1">({t.step1.vehicleCount.unit})</span>
                </label>
                <input type="number" min="1" max="1000" value={formData.vehicleCount} onChange={e => handleInputChange('vehicleCount', parseInt(e.target.value) || 1)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent" />
              </div>

              {/* 运行所在地 - 国家 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.location.country}
                </label>
                <select value={formData.country} onChange={e => handleInputChange('country', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent">
                  {Object.entries(locationConfig).map(([key, config]) => <option key={key} value={key}>
                      {config.name[currentLang]}
                    </option>)}
                </select>
              </div>

              {/* 运行所在地 - 省/州 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.location.province}
                </label>
                <select value={formData.province} onChange={e => handleInputChange('province', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent">
                  <option value="">{t.placeholders.selectProvince}</option>
                  {getProvinceList().map(province => <option key={province} value={province}>
                      {province}
                    </option>)}
                </select>
              </div>

              {/* 运行所在地 - 城市 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.location.city}
                </label>
                <input type="text" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} placeholder={t.placeholders.enterCity} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent" />
              </div>

              {/* 柴油价格 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.dieselPrice.label}
                  <span className="text-gray-500 ml-1">({getCurrencySymbol()}{t.step1.dieselPrice.unit})</span>
                </label>
                <div className="space-y-2">
                  <input type="range" min={currentLocationConfig.dieselPrice.min} max={currentLocationConfig.dieselPrice.max} step="0.1" value={formData.dieselPrice} onChange={e => handleInputChange('dieselPrice', parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0D7E9C]" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{currentLocationConfig.dieselPrice.min}</span>
                    <span className="font-semibold text-[#0D7E9C]">{formData.dieselPrice.toFixed(1)}</span>
                    <span>{currentLocationConfig.dieselPrice.max}</span>
                  </div>
                </div>
              </div>

              {/* 电价 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.step1.electricityPrice.label}
                  <span className="text-gray-500 ml-1">({getCurrencySymbol()}{t.step1.electricityPrice.unit})</span>
                </label>
                <div className="space-y-2">
                  <input type="range" min={currentLocationConfig.electricityPrice.min} max={currentLocationConfig.electricityPrice.max} step="0.01" value={formData.electricityPrice} onChange={e => handleInputChange('electricityPrice', parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0D7E9C]" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{currentLocationConfig.electricityPrice.min}</span>
                    <span className="font-semibold text-[#0D7E9C]">{formData.electricityPrice.toFixed(2)}</span>
                    <span>{currentLocationConfig.electricityPrice.max}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={handleNext} className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                {t.buttons.next}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>}

        {/* Step 2: Model Selection */}
        {currentStep === 2 && <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(modelConfig).map(([key, model]) => {
            const Icon = model.icon;
            const isRecommended = key === getRecommendedModel();
            const isSelected = selectedModel === key;
            return <div key={key} onClick={() => setSelectedModel(key)} className={`relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-[#0D7E9C] shadow-xl' : 'hover:shadow-xl'}`}>
                  {isRecommended && <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Star className="w-5 h-5 mr-1" />
                      {t.labels.recommended}
                    </div>}
                  
                  {isSelected && <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-[#0D7E9C]" />
                    </div>}

                  <div className={`w-16 h-16 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-gray-600 mb-4">{model.description[currentLang]}</p>
                </div>;
          })}

              {/* 定制方案 */}
              <div onClick={() => setSelectedModel('custom')} className={`relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${selectedModel === 'custom' ? 'ring-2 ring-[#0D7E9C] shadow-xl' : 'hover:shadow-xl'}`}>
                {selectedModel === 'custom' && <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-[#0D7E9C]" />
                  </div>}

                <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step2.custom.title}</h3>
                <p className="text-sm text-gray-600">{t.step2.custom.subtitle}</p>
              </div>
            </div>

            {/* 合作方式 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t.step2.cooperation.title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div onClick={() => setCooperationMode('purchase')} className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${cooperationMode === 'purchase' ? 'border-[#0D7E9C] bg-[#0D7E9C]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{t.step2.cooperation.purchase}</h4>
                  </div>
                <div onClick={() => setCooperationMode('lease')} className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${cooperationMode === 'lease' ? 'border-[#0D7E9C] bg-[#0D7E9C]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{t.step2.cooperation.lease}</h4>
                  </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={handlePrevious} variant="outline" className="border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.buttons.previous}
              </Button>
              <Button onClick={handleNext} className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                {selectedModel === 'custom' ? t.buttons.getCustom : t.buttons.next}
                {selectedModel !== 'custom' && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </div>
          </div>}

        {/* Step 3: Results */}
        {currentStep === 3 && <div>
            {isCalculating ? <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D7E9C] mx-auto mb-4"></div>
                <p className="text-gray-600">{t.labels.calculating}</p>
              </div> : calculationResults && <div>
                <div className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-2xl p-6 mb-8 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{t.labels.selectedSolution}</h3>
                      <p className="text-2xl font-bold">{selectedModel}</p>
                      <p className="text-white/80">{t.labels.cooperationMode}: {cooperationMode === 'purchase' ? t.labels.purchase : t.labels.lease}</p>
                    </div>
                    <Target className="w-12 h-12 text-yellow-300" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.annualSavings}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {getCurrencySymbol()}{calculationResults.annualSavings.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                        <PiggyBank className="w-6 h-6 text-pink-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.totalSavings}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {getCurrencySymbol()}{calculationResults.totalSavings.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.npv}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {getCurrencySymbol()}{calculationResults.npv.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.irr}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {calculationResults.irr}%
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.paybackPeriod}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {calculationResults.paybackPeriod} {t.units.years}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.roi}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {calculationResults.roi}%
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.step3.results.carbonReduction}</h3>
                    <p className="text-3xl font-bold text-[#0D7E9C]">
                      {calculationResults.carbonReduction.toLocaleString()} {t.units.tons}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-2xl p-8 text-center text-white mb-8">
                  <h3 className="text-2xl font-bold mb-4">{t.step3.buttons.getSpec}</h3>
                  <Button onClick={handleGetSpec} className="bg-white text-[#0D7E9C] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                    <Mail className="w-5 h-5 mr-2" />
                    {t.labels.getNow}
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Button onClick={handlePrevious} variant="outline" className="border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {t.buttons.previous}
                  </Button>
                </div>
              </div>}
          </div>}

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-8">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-800">{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>;
}