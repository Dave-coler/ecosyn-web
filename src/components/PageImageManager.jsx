// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Badge, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Image, Upload, Edit, Eye, RefreshCw, Layout, Home, Users, FileText, Settings, Zap, ArrowRight, Check, X, Search, Filter } from 'lucide-react';

import { MediaUpload } from '@/components/MediaUpload';
export function PageImageManager({
  searchQuery
}) {
  const {
    toast
  } = useToast();
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageImages, setPageImages] = useState({});
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);

  // 页面配置
  const pageConfigs = {
    home: {
      name: '首页',
      icon: Home,
      sections: [{
        id: 'hero',
        name: '横幅区域',
        images: [{
          id: 'hero-bg',
          name: '背景图片',
          currentUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
          size: '1920x1080',
          type: 'background'
        }, {
          id: 'hero-product',
          name: '产品展示',
          currentUrl: 'https://images.unsplash.com/photo-1511187140547-7cf5a22ecb96?w=800&h=600&fit=crop',
          size: '800x600',
          type: 'product'
        }]
      }, {
        id: 'features',
        name: '功能特性',
        images: [{
          id: 'feature-1',
          name: '特性图片1',
          currentUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
          size: '600x400',
          type: 'feature'
        }, {
          id: 'feature-2',
          name: '特性图片2',
          currentUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          size: '600x400',
          type: 'feature'
        }]
      }]
    },
    about: {
      name: '关于我们',
      icon: Users,
      sections: [{
        id: 'company',
        name: '公司介绍',
        images: [{
          id: 'company-bg',
          name: '公司背景',
          currentUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop',
          size: '1920x800',
          type: 'background'
        }]
      }, {
        id: 'team',
        name: '团队展示',
        images: [{
          id: 'team-1',
          name: '团队成员1',
          currentUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          size: '400x400',
          type: 'avatar'
        }, {
          id: 'team-2',
          name: '团队成员2',
          currentUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
          size: '400x400',
          type: 'avatar'
        }]
      }]
    },
    services: {
      name: '服务',
      icon: Settings,
      sections: [{
        id: 'services-hero',
        name: '服务横幅',
        images: [{
          id: 'services-bg',
          name: '服务背景',
          currentUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop',
          size: '1920x600',
          type: 'background'
        }]
      }]
    },
    solutions: {
      name: '解决方案',
      icon: Zap,
      sections: [{
        id: 'solutions-hero',
        name: '解决方案横幅',
        images: [{
          id: 'solutions-bg',
          name: '解决方案背景',
          currentUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&h=800&fit=crop',
          size: '1920x800',
          type: 'background'
        }]
      }]
    }
  };
  const handleImageReplace = (imageId, newImageUrl) => {
    const updatedPageImages = {
      ...pageImages
    };
    updatedPageImages[selectedPage] = updatedPageImages[selectedPage] || {};
    updatedPageImages[selectedPage][imageId] = newImageUrl;
    setPageImages(updatedPageImages);
    toast({
      title: '图片替换成功',
      description: '图片已更新，请刷新网站查看效果'
    });
    setReplaceDialogOpen(false);
    setSelectedImage(null);
  };
  const handleUpload = files => {
    // 处理上传的文件
    toast({
      title: '上传成功',
      description: `成功上传 ${files.length} 个文件`
    });
    setUploadDialogOpen(false);
  };
  const getCurrentImageUrl = (pageId, imageId) => {
    return pageImages[pageId]?.[imageId] || pageConfigs[pageId].sections.find(section => section.images.find(img => img.id === imageId))?.images.find(img => img.id === imageId)?.currentUrl;
  };
  const filteredPages = Object.entries(pageConfigs).filter(([pageId, config]) => {
    if (!searchQuery) return true;
    return config.name.toLowerCase().includes(searchQuery.toLowerCase()) || config.sections.some(section => section.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  return <div className="space-y-6">
      {/* 页面选择器 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">页面图片管理</h2>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(pageConfigs).map(([pageId, config]) => {
              const Icon = config.icon;
              return <SelectItem key={pageId} value={pageId}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{config.name}</span>
                  </div>
                </SelectItem>;
            })}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E]">
              <Upload className="w-4 h-4 mr-2" />
              上传新图片
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>上传图片</DialogTitle>
            </DialogHeader>
            <MediaUpload onUpload={handleUpload} />
          </DialogContent>
        </Dialog>
      </div>

      {/* 页面图片展示 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pageConfigs[selectedPage].sections.map(section => <Card key={section.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{section.name}</span>
                <Badge variant="outline">{section.images.length} 张图片</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.images.map(image => {
              const currentUrl = getCurrentImageUrl(selectedPage, image.id);
              return <div key={image.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{image.name}</h4>
                        <p className="text-sm text-gray-600">{image.size} • {image.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(currentUrl, '_blank')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                      setSelectedImage(image);
                      setReplaceDialogOpen(true);
                    }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img src={currentUrl} alt={image.name} className="w-full h-full object-cover" />
                    </div>
                    {pageImages[selectedPage]?.[image.id] && <div className="mt-2 flex items-center text-sm text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        已自定义
                      </div>}
                  </div>;
            })}
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <RefreshCw className="w-6 h-6 mb-2" />
              批量替换
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Layout className="w-6 h-6 mb-2" />
              预览布局
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Filter className="w-6 h-6 mb-2" />
              智能推荐
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 替换图片对话框 */}
      <Dialog open={replaceDialogOpen} onOpenChange={setReplaceDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>替换图片 - {selectedImage?.name}</DialogTitle>
          </DialogHeader>
          {selectedImage && <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">当前图片</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img src={getCurrentImageUrl(selectedPage, selectedImage.id)} alt="当前图片" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">尺寸: {selectedImage.size}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">新图片</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">点击或拖拽上传新图片</p>
                      <p className="text-sm text-gray-500">建议尺寸: {selectedImage.size}</p>
                    </div>
                  </div>
                  <Input type="file" accept="image/*" className="mt-3" onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = event => {
                    handleImageReplace(selectedImage.id, event.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setReplaceDialogOpen(false)}>
                  取消
                </Button>
                <Button className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E]">
                  确认替换
                </Button>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
}