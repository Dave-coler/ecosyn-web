// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui';
// @ts-ignore;
import { Upload, Image, Video, Trash2, Edit, Eye, Plus, Folder, Settings, LogOut, Search, Filter, Download, X, Check, AlertCircle, FileText, Home, Users, BarChart3, Menu, RefreshCw, Layout, Zap } from 'lucide-react';

import { MediaUpload } from '@/components/MediaUpload';
import { MediaLibrary } from '@/components/MediaLibrary';
import { SectionManager } from '@/components/SectionManager';
import { AdminSidebar } from '@/components/AdminSidebar';
import { PageImageManager } from '@/components/PageImageManager';
import { ImagePreview } from '@/components/ImagePreview';
export default function Admin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentLang, setCurrentLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('media');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 检查登录状态
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      setIsLoggedIn(!!token);
    };
    checkAuth();
  }, []);
  const handleLogin = (username, password) => {
    // 简单的登录验证（实际项目中应该调用后端API）
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_token', 'admin_token_' + Date.now());
      setIsLoggedIn(true);
      toast({
        title: '登录成功',
        description: '欢迎进入素材管理系统'
      });
    } else {
      toast({
        title: '登录失败',
        description: '用户名或密码错误',
        variant: 'destructive'
      });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
    toast({
      title: '已退出登录',
      description: '您已安全退出管理系统'
    });
  };
  if (!isLoggedIn) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#0D7E9C] to-[#01847E] rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">素材管理系统</CardTitle>
              <p className="text-gray-600">请登录以继续</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input id="username" type="text" placeholder="请输入用户名" defaultValue="admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" placeholder="请输入密码" defaultValue="admin123" />
              </div>
              <Button onClick={() => {
              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              handleLogin(username, password);
            }} className="w-full bg-gradient-to-r from-[#0D7E9C] to-[#01847E] hover:from-[#0D7E9C]/90 hover:to-[#01847E]/90">
                登录
              </Button>
              <div className="text-center text-sm text-gray-500">
                <p>测试账号：admin / admin123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'media' && '素材管理'}
                {activeTab === 'pages' && '页面图片管理'}
                {activeTab === 'sections' && '栏目配置'}
                {activeTab === 'preview' && '实时预览'}
                {activeTab === 'settings' && '系统设置'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="text" placeholder="搜索素材..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 w-64" />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="image">图片</SelectItem>
                  <SelectItem value="video">视频</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
                <Eye className="w-4 h-4 mr-2" />
                预览网站
              </Button>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 p-6">
          {activeTab === 'media' && <MediaLibrary searchQuery={searchQuery} filterType={filterType} />}
          {activeTab === 'pages' && <PageImageManager searchQuery={searchQuery} />}
          {activeTab === 'sections' && <SectionManager />}
          {activeTab === 'preview' && <ImagePreview />}
          {activeTab === 'settings' && <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>系统设置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">存储设置</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>最大文件大小 (MB)</Label>
                        <Input type="number" defaultValue="50" />
                      </div>
                      <div className="space-y-2">
                        <Label>允许的文件类型</Label>
                        <Input defaultValue="jpg,jpeg,png,gif,mp4,avi,mov" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">备份设置</h3>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="autoBackup" defaultChecked />
                      <Label htmlFor="autoBackup">自动备份</Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">图片优化</h3>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="autoOptimize" defaultChecked />
                      <Label htmlFor="autoOptimize">自动压缩优化</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="autoResize" defaultChecked />
                      <Label htmlFor="autoResize">自动调整尺寸</Label>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E]">
                    保存设置
                  </Button>
                </CardContent>
              </Card>
            </div>}
        </main>
      </div>
    </div>;
}