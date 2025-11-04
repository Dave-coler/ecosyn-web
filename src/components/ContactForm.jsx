// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';
// @ts-ignore;
import { Mail, Send, User, MessageSquare } from 'lucide-react';

export function ContactForm({
  currentLang = 'zh'
}) {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactData = {
    zh: {
      form: {
        title: '发送消息',
        fields: {
          name: '姓名',
          email: '邮箱',
          company: '公司',
          message: '留言内容'
        },
        button: '发送消息'
      }
    },
    en: {
      form: {
        title: 'Send Message',
        fields: {
          name: 'Name',
          email: 'Email',
          company: 'Company',
          message: 'Message'
        },
        button: 'Send Message'
      }
    }
  };
  const t = contactData[currentLang];
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    // 构建邮件内容
    const subject = encodeURIComponent(`来自${formData.name || '网站访客'}的咨询 - ${formData.company || '个人'}`);
    const body = encodeURIComponent(`姓名：${formData.name || ''}\n邮箱：${formData.email || ''}\n公司：${formData.company || ''}\n\n留言内容：\n${formData.message || ''}`);

    // 创建mailto链接
    const mailtoLink = `mailto:sales@hill-sea.com?subject=${subject}&body=${body}`;

    // 打开邮件客户端
    window.location.href = mailtoLink;

    // 显示成功提示
    toast({
      title: currentLang === 'zh' ? '正在打开邮件客户端' : 'Opening email client',
      description: currentLang === 'zh' ? '请使用邮件客户端发送您的消息' : 'Please use your email client to send your message'
    });

    // 重置表单
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };
  return <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Form - Centered */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">{t.form.title}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  {t.form.fields.name}
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent transition-all duration-300" placeholder={currentLang === 'zh' ? '请输入您的姓名' : 'Enter your name'} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  {t.form.fields.email}
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent transition-all duration-300" placeholder={currentLang === 'zh' ? '请输入您的邮箱' : 'Enter your email'} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {t.form.fields.company}
              </label>
              <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent transition-all duration-300" placeholder={currentLang === 'zh' ? '请输入您的公司名称' : 'Enter your company name'} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                {t.form.fields.message}
              </label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D7E9C] focus:border-transparent transition-all duration-300 resize-none" placeholder={currentLang === 'zh' ? '请输入您的留言内容' : 'Enter your message'} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center">
              {isSubmitting ? <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {currentLang === 'zh' ? '处理中...' : 'Processing...'}
                </> : <>
                  <Send className="w-5 h-5 mr-2" />
                  {t.form.button}
                </>}
            </Button>
          </form>
        </div>
      </div>
    </section>;
}