// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Home, Image, Folder, Settings, LogOut, Menu, X, Layout, Eye } from 'lucide-react';

export function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  sidebarOpen,
  setSidebarOpen
}) {
  const menuItems = [{
    id: 'media',
    label: '素材管理',
    icon: Image
  }, {
    id: 'pages',
    label: '页面图片',
    icon: Layout
  }, {
    id: 'sections',
    label: '栏目配置',
    icon: Folder
  }, {
    id: 'preview',
    label: '实时预览',
    icon: Eye
  }, {
    id: 'settings',
    label: '系统设置',
    icon: Settings
  }];
  return <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-lg flex items-center justify-center">
            <Image className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && <span className="font-semibold text-gray-900">素材管理</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map(item => {
          const Icon = item.icon;
          return <Button key={item.id} variant={activeTab === item.id ? 'default' : 'ghost'} className={`w-full justify-start ${activeTab === item.id ? 'bg-gradient-to-r from-[#0D7E9C] to-[#01847E] text-white' : 'text-gray-700 hover:text-gray-900'}`} onClick={() => setActiveTab(item.id)}>
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Button>;
        })}
        </div>
      </nav>

      {/* User Actions */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600" onClick={onLogout}>
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="ml-3">退出登录</span>}
        </Button>
      </div>
    </div>;
}