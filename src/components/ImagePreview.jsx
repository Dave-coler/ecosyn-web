// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge } from '@/components/ui';
// @ts-ignore;
import { Eye, RefreshCw, Monitor, Tablet, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';

export function ImagePreview() {
  const {
    toast
  } = useToast();
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [selectedPage, setSelectedPage] = useState('home');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const devices = {
    desktop: {
      name: '桌面端',
      icon: Monitor,
      width: '100%',
      height: '800px'
    },
    tablet: {
      name: '平板',
      icon: Tablet,
      width: '768px',
      height: '1024px'
    },
    mobile: {
      name: '手机',
      icon: Smartphone,
      width: '375px',
      height: '667px'
    }
  };
  const pages = [{
    id: 'home',
    name: '首页',
    url: '/'
  }, {
    id: 'about',
    name: '关于我们',
    url: '/about'
  }, {
    id: 'services',
    name: '服务',
    url: '/services'
  }, {
    id: 'solutions',
    name: '解决方案',
    url: '/solutions'
  }];
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: '刷新成功',
        description: '预览已更新到最新状态'
      });
    }, 1000);
  };
  const handleOpenInNewTab = () => {
    const page = pages.find(p => p.id === selectedPage);
    if (page) {
      window.open(page.url, '_blank');
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">实时预览</h2>
          <p className="text-gray-600">预览网站在不同设备上的显示效果</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pages.map(page => <SelectItem key={page.id} value={page.id}>
                  {page.name}
                </SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2 border rounded-lg p-1">
            {Object.entries(devices).map(([key, device]) => {
            const Icon = device.icon;
            return <Button key={key} variant={selectedDevice === key ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedDevice(key)}>
                <Icon className="w-4 h-4" />
                <span className="ml-2 hidden sm:inline">{device.name}</span>
              </Button>;
          })}
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button onClick={handleOpenInNewTab}>
            <ExternalLink className="w-4 h-4 mr-2" />
            新窗口打开
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 预览区域 */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>预览 - {pages.find(p => p.id === selectedPage)?.name}</span>
                <Badge variant="outline">{devices[selectedDevice].name}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="border-4 border-gray-200 rounded-lg overflow-hidden bg-white shadow-xl" style={{
                width: devices[selectedDevice].width,
                height: devices[selectedDevice].height,
                maxWidth: '100%'
              }}>
                  <iframe src={pages.find(p => p.id === selectedPage)?.url} className="w-full h-full" title="网站预览" sandbox="allow-same-origin allow-scripts allow-forms" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 侧边信息 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>预览信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">当前页面</span>
                <span className="text-sm font-medium">{pages.find(p => p.id === selectedPage)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">设备类型</span>
                <span className="text-sm font-medium">{devices[selectedDevice].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">分辨率</span>
                <span className="text-sm font-medium">{devices[selectedDevice].width} × {devices[selectedDevice].height}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速导航</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pages.map(page => <Button key={page.id} variant={selectedPage === page.id ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setSelectedPage(page.id)}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {page.name}
                </Button>)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>提示</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 预览会实时显示最新的图片更改</p>
                <p>• 点击刷新按钮更新预览内容</p>
                <p>• 可以在不同设备间切换查看效果</p>
                <p>• 新窗口打开可以查看完整功能</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}