
// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Checkbox, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Upload, Image, Video, Trash2, Edit, Eye, Plus, Download, X, Check, AlertCircle, FileText, Copy, Link, ExternalLink, Scissors, Zap, FolderOpen, Tag, Move, Filter, Search, Grid3x3, List, ChevronDown, ChevronUp, FolderPlus, TagPlus, Archive, RefreshCw, Cloud, HardDrive, Folder, Database } from 'lucide-react';

import { MediaUpload } from '@/components/MediaUpload';
import { MediaGrid } from '@/components/MediaGrid';
import { MediaTable } from '@/components/MediaTable';
import { MediaFilters } from '@/components/MediaFilters';
import { MediaEditDialog } from '@/components/MediaEditDialog';

export function MediaLibrary({
  searchQuery,
  filterType
}) {
  const {
    toast
  } = useToast();
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or table
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  // 批量管理状态
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [batchMode, setBatchMode] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  const [batchAction, setBatchAction] = useState('');

  // 分类和标签状态
  const [categories, setCategories] = useState([{
    id: 'banner',
    name: '横幅图片',
    color: 'blue',
    count: 0
  }, {
    id: 'product',
    name: '产品图片',
    color: 'green',
    count: 0
  }, {
    id: 'team',
    name: '团队照片',
    color: 'purple',
    count: 0
  }, {
    id: 'technology',
    name: '技术图片',
    color: 'orange',
    count: 0
  }, {
    id: 'background',
    name: '背景图片',
    color: 'gray',
    count: 0
  }, {
    id: 'logo',
    name: 'Logo图标',
    color: 'red',
    count: 0
  }]);
  const [tags, setTags] = useState([{
    id: 'hero',
    name: '首页横幅',
    count: 0
  }, {
    id: 'featured',
    name: '精选',
    count: 0
  }, {
    id: 'new',
    name: '最新',
    count: 0
  }, {
    id: 'optimized',
    name: '已优化',
    count: 0
  }, {
    id: 'high-res',
    name: '高清',
    count: 0
  }, {
    id: 'web-ready',
    name: '网页可用',
    count: 0
  }]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');

  // 云存储相关函数
  const loadFromCloudStorage = async () => {
    setLoading(true);
    try {
      const tcb = await window.$w?.cloud?.getCloudInstance();
      if (!tcb) {
        throw new Error('云开发实例未初始化');
      }

      // 列出HILLSEA-web文件夹下的文件
      const result = await tcb.storage.get fileList({
        prefix: 'HILLSEA-web/'
      });

      if (result.fileList && result.fileList.length > 0) {
        // 获取文件下载链接
        const fileIDs = result.fileList.map(file => file.fileID);
        const urlResult = await tcb.getTempFileURL({
          fileList: fileIDs
        });

        const mediaData = result.fileList.map((file, index) => ({
          id: file.fileID,
          name: file.name.replace('HILLSEA-web/', ''),
          type: file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'video',
          size: file.size || 0,
          url: urlResult.fileList[index]?.tempFileURL || '',
          fileID: file.fileID,
          cloudPath: file.name,
          section: 'unassigned',
          uploadedAt: file.createTime || new Date().toISOString(),
          description: '',
          format: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
          optimized: false,
          category: 'background',
          tags: []
        }));

        setMediaItems(mediaData);
        updateCategoryAndTagCounts(mediaData);
      }
    } catch (error) {
      console.error('加载云存储文件失败:', error);
      // 如果云存储加载失败，使用模拟数据
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockData = [{
      id: '1',
      name: 'hero-banner.jpg',
      type: 'image',
      size: 2048576,
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
      fileID: 'cloud://env-xxx.HILLSEA-web/hero-banner.jpg',
      cloudPath: 'HILLSEA-web/hero-banner.jpg',
      section: 'home',
      uploadedAt: '2024-01-15T10:30:00Z',
      description: '首页横幅图片',
      dimensions: '1920x1080',
      format: 'JPEG',
      optimized: true,
      category: 'banner',
      tags: ['hero', 'featured', 'optimized']
    }, {
      id: '2',
      name: 'product-intro.mp4',
      type: 'video',
      size: 10485760,
      url: 'https://example.com/video.mp4',
      fileID: 'cloud://env-xxx.HILLSEA-web/product-intro.mp4',
      cloudPath: 'HILLSEA-web/product-intro.mp4',
      section: 'products',
      uploadedAt: '2024-01-14T15:45:00Z',
      description: '产品介绍视频',
      duration: '2:30',
      format: 'MP4',
      category: 'product',
      tags: ['featured', 'new']
    }, {
      id: '3',
      name: 'team-photo.jpg',
      type: 'image',
      size: 1536000,
      url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
      fileID: 'cloud://env-xxx.HILLSEA-web/team-photo.jpg',
      cloudPath: 'HILLSEA-web/team-photo.jpg',
      section: 'about',
      uploadedAt: '2024-01-13T09:20:00Z',
      description: '团队合影',
      dimensions: '1200x800',
      format: 'JPEG',
      optimized: false,
      category: 'team',
      tags: ['team', 'high-res']
    }, {
      id: '4',
      name: 'technology-bg.jpg',
      type: 'image',
      size: 3072000,
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
      fileID: 'cloud://env-xxx.HILLSEA-web/technology-bg.jpg',
      cloudPath: 'HILLSEA-web/technology-bg.jpg',
      section: 'technology',
      uploadedAt: '2024-01-12T14:10:00Z',
      description: '技术背景图',
      dimensions: '1920x1280',
      format: 'JPEG',
      optimized: true,
      category: 'background',
      tags: ['background', 'optimized', 'web-ready']
    }, {
      id: '5',
      name: 'company-logo.png',
      type: 'image',
      size: 512000,
      url: 'https://example.com/logo.png',
      fileID: 'cloud://env-xxx.HILLSEA-web/company-logo.png',
      cloudPath: 'HILLSEA-web/company-logo.png',
      section: 'about',
      uploadedAt: '2024-01-11T11:30:00Z',
      description: '公司Logo',
      dimensions: '500x300',
      format: 'PNG',
      optimized: true,
      category: 'logo',
      tags: ['logo', 'web-ready']
    }];
    setMediaItems(mockData);
    updateCategoryAndTagCounts(mockData);
  };

  // 初始化加载数据
  useEffect(() => {
    loadFromCloudStorage();
  }, []);

  const updateCategoryAndTagCounts = items => {
    // 更新分类计数
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: items.filter(item => item.category === cat.id).length
    }));
    setCategories(updatedCategories);

    // 更新标签计数
    const updatedTags = tags.map(tag => ({
      ...tag,
      count: items.filter(item => item.tags && item.tags.includes(tag.id)).length
    }));
    setTags(updatedTags);
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags && item.tags.some(tagId => {
      const tag = tags.find(t => t.id === tagId);
      return tag && tag.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const matchesFilter = filterType === 'all' || item.type === filterType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || item.tags && selectedTags.some(tagId => item.tags.includes(tagId));
    return matchesSearch && matchesFilter && matchesCategory && matchesTags;
  });

  const handleUpload = files => {
    const newItems = files.map((file, index) => {
      // 智能分类
      let suggestedCategory = 'background';
      let suggestedTags = [];
      if (file.name.toLowerCase().includes('banner') || file.name.toLowerCase().includes('hero')) {
        suggestedCategory = 'banner';
        suggestedTags.push('hero');
      } else if (file.name.toLowerCase().includes('product')) {
        suggestedCategory = 'product';
        suggestedTags.push('featured');
      } else if (file.name.toLowerCase().includes('team') || file.name.toLowerCase().includes('people')) {
        suggestedCategory = 'team';
        suggestedTags.push('team');
      } else if (file.name.toLowerCase().includes('logo')) {
        suggestedCategory = 'logo';
        suggestedTags.push('logo');
      } else if (file.name.toLowerCase().includes('bg') || file.name.toLowerCase().includes('background')) {
        suggestedCategory = 'background';
        suggestedTags.push('background');
      }
      return {
        id: file.fileID || Date.now() + index,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: file.size,
        url: file.url,
        fileID: file.fileID,
        cloudPath: file.cloudPath,
        section: 'unassigned',
        uploadedAt: new Date().toISOString(),
        description: '',
        format: file.format || file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        optimized: false,
        category: suggestedCategory,
        tags: suggestedTags
      };
    });
    const updatedItems = [...mediaItems, ...newItems];
    setMediaItems(updatedItems);
    updateCategoryAndTagCounts(updatedItems);
    setUploadDialogOpen(false);
    toast({
      title: '上传成功',
      description: `成功上传 ${files.length} 个文件到云存储HILLSEA-web文件夹`
    });
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    
    try {
      // 从云存储删除文件
      if (selectedItem.fileID) {
        const tcb = await window.$w?.cloud?.getCloudInstance();
        if (tcb) {
          await tcb.deleteFile({
            fileList: [selectedItem.fileID]
          });
        }
      }

      // 从列表中删除
      const updatedItems = mediaItems.filter(item => item.id !== selectedItem.id);
      setMediaItems(updatedItems);
      updateCategoryAndTagCounts(updatedItems);
      setDeleteDialogOpen(false);
      setSelectedItem(null);
      toast({
        title: '删除成功',
        description: '文件已从云存储删除'
      });
    } catch (error) {
      console.error('删除文件失败:', error);
      toast({
        title: '删除失败',
        description: '删除文件时发生错误',
        variant: 'destructive'
      });
    }
  };

  const handleBatchDelete = async () => {
    try {
      const tcb = await window.$w?.cloud?.getCloudInstance();
      const fileIDs = Array.from(selectedItems).map(itemId => {
        const item = mediaItems.find(i => i.id === itemId);
        return item?.fileID;
      }).filter(Boolean);

      if (tcb && fileIDs.length > 0) {
        await tcb.deleteFile({
          fileList: fileIDs
        });
      }

      const updatedItems = mediaItems.filter(item => !selectedItems.has(item.id));
      setMediaItems(updatedItems);
      updateCategoryAndTagCounts(updatedItems);
      setSelectedItems(new Set());
      setBatchDialogOpen(false);
      toast({
        title: '批量删除成功',
        description: `已从云存储删除 ${selectedItems.size} 个文件`
      });
    } catch (error) {
      console.error('批量删除失败:', error);
      toast({
        title: '批量删除失败',
        description: '删除文件时发生错误',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = updatedItem => {
    const updatedItems = mediaItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    setMediaItems(updatedItems);
    updateCategoryAndTagCounts(updatedItems);
    setEditDialogOpen(false);
    setSelectedItem(null);
    toast({
      title: '更新成功',
      description: '文件信息已更新'
    });
  };

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
      toast({
        title: '复制成功',
        description: '地址已复制到剪贴板'
      });
    });
  };

  const handleBatchSelect = (itemId, selected) => {
    const newSelected = new Set(selectedItems);
    if (selected) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  const handleBatchAction = action => {
    if (selectedItems.size === 0) {
      toast({
        title: '请选择文件',
        description: '请先选择要操作的文件',
        variant: 'destructive'
      });
      return;
    }
    setBatchAction(action);
    setBatchDialogOpen(true);
  };

  const handleBatchMove = categoryId => {
    const updatedItems = mediaItems.map(item => selectedItems.has(item.id) ? {
      ...item,
      category: categoryId
    } : item);
    setMediaItems(updatedItems);
    updateCategoryAndTagCounts(updatedItems);
    setSelectedItems(new Set());
    setBatchDialogOpen(false);
    toast({
      title: '批量移动成功',
      description: `已移动 ${selectedItems.size} 个文件到 ${categories.find(c => c.id === categoryId)?.name}`
    });
  };

  const handleBatchAddTags = tagIds => {
    const updatedItems = mediaItems.map(item => selectedItems.has(item.id) ? {
      ...item,
      tags: [...new Set([...(item.tags || []), ...tagIds])]
    } : item);
    setMediaItems(updatedItems);
    updateCategoryAndTagCounts(updatedItems);
    setSelectedItems(new Set());
    setBatchDialogOpen(false);
    toast({
      title: '批量添加标签成功',
      description: `已为 ${selectedItems.size} 个文件添加标签`
    });
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      color: 'indigo',
      count: 0
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setCategoryDialogOpen(false);
    toast({
      title: '分类创建成功',
      description: `已创建分类: ${newCategoryName}`
    });
  };

  const addTag = () => {
    if (!newTagName.trim()) return;
    const newTag = {
      id: Date.now().toString(),
      name: newTagName,
      count: 0
    };
    setTags([...tags, newTag]);
    setNewTagName('');
    setTagDialogOpen(false);
    toast({
      title: '标签创建成功',
      description: `已创建标签: ${newTagName}`
    });
  };

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return <div className="space-y-6">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E]">
                <Plus className="w-4 h-4 mr-2" />
                上传素材
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>上传素材到云存储</DialogTitle>
              </DialogHeader>
              <MediaUpload onUpload={handleUpload} />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={() => setBatchMode(!batchMode)}>
            {batchMode ? <Grid3x3 className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
            {batchMode ? '退出批量' : '批量管理'}
          </Button>
          
          <Button variant="outline" onClick={loadFromCloudStorage} disabled={loading}>
            {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
            刷新云存储
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
            <Image className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === 'table' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('table')}>
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 云存储状态 */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">云存储状态</p>
                <p className="text-sm text-blue-700">存储位置: HILLSEA-web/</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-blue-700">
              <div className="flex items-center space-x-1">
                <Folder className="w-4 h-4" />
                <span>{mediaItems.length} 个文件</span>
              </div>
              <div className="flex items-center space-x-1">
                <HardDrive className="w-4 h-4" />
                <span>{formatFileSize(mediaItems.reduce((total, item) => total + item.size, 0))}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类和标签筛选 */}
      <MediaFilters
        categories={categories}
        tags={tags}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        totalItems={mediaItems.length}
        onCategoryChange={setSelectedCategory}
        onTagChange={setSelectedTags}
        onCategoryDialogOpen={() => setCategoryDialogOpen(true)}
        onTagDialogOpen={() => setTagDialogOpen(true)}
      />

      {/* 批量操作工具栏 */}
      {batchMode && selectedItems.size > 0 && <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">已选择 {selectedItems.size} 个文件</span>
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedItems.size === filteredItems.length ? '取消全选' : '全选'}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBatchAction('move')}>
                  <Move className="w-4 h-4 mr-2" />
                  移动分类
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBatchAction('tags')}>
                  <Tag className="w-4 h-4 mr-2" />
                  添加标签
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBatchAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  删除
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 统计信息 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Image className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{mediaItems.filter(item => item.type === 'image').length}</p>
                <p className="text-sm text-gray-600">图片</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{mediaItems.filter(item => item.type === 'video').length}</p>
                <p className="text-sm text-gray-600">视频</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{mediaItems.length}</p>
                <p className="text-sm text-gray-600">总计</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Cloud className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{formatFileSize(mediaItems.reduce((total, item) => total + item.size, 0))}</p>
                <p className="text-sm text-gray-600">云存储</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 素材展示 */}
      {loading ? <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mr-3" />
          <span className="text-lg text-gray-600">正在从云存储加载文件...</span>
        </div> : viewMode === 'grid' ? <MediaGrid
        items={filteredItems}
        selectedItems={selectedItems}
        batchMode={batchMode}
        categories={categories}
        tags={tags}
        onBatchSelect={handleBatchSelect}
        onSelectItem={setSelectedItem}
        onCopyUrl={copyToClipboard}
        onEdit={item => {
          setSelectedItem(item);
          setEditDialogOpen(true);
        }}
        onDelete={item => {
          setSelectedItem(item);
          setDeleteDialogOpen(true);
        }}
        copiedUrl={copiedUrl}
      /> : <Card>
          <MediaTable
            items={filteredItems}
            selectedItems={selectedItems}
            batchMode={batchMode}
            categories={categories}
            tags={tags}
            onBatchSelect={handleBatchSelect}
            onSelectItem={setSelectedItem}
            onCopyUrl={copyToClipboard}
            onEdit={item => {
              setSelectedItem(item);
              setEditDialogOpen(true);
            }}
            onDelete={item => {
              setSelectedItem(item);
              setDeleteDialogOpen(true);
            }}
            copiedUrl={copiedUrl}
          />
        </Card>}

      {/* 编辑对话框 */}
      <MediaEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        item={selectedItem}
        categories={categories}
        tags={tags}
        onSave={handleEdit}
        copiedUrl={copiedUrl}
        onCopyUrl={copyToClipboard}
      />

      {/* 批量操作对话框 */}
      <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {batchAction === 'move' && '批量移动分类'}
              {batchAction === 'tags' && '批量添加标签'}
              {batchAction === 'delete' && '批量删除确认'}
            </DialogTitle>
          </DialogHeader>
          
          {batchAction === 'move' && <div className="space-y-4">
              <Label>选择目标分类</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => <Button key={category.id} variant="outline" onClick={() => handleBatchMove(category.id)}>
                    {category.name}
                  </Button>)}
              </div>
            </div>}
          
          {batchAction === 'tags' && <div className="space-y-4">
              <Label>选择要添加的标签</Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {tags.map(tag => <div key={tag.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={`batch-tag-${tag.id}`} onChange={e => {
                if (e.target.checked) {
                  handleBatchAddTags([tag.id]);
                }
              }} />
                    <Label htmlFor={`batch-tag-${tag.id}`} className="text-sm">
                      #{tag.name}
                    </Label>
                  </div>)}
              </div>
            </div>}
          
          {batchAction === 'delete' && <div className="space-y-4">
              <p>确定要删除选中的 {selectedItems.size} 个文件吗？</p>
              <p className="text-sm text-gray-600">此操作不可撤销。</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setBatchDialogOpen(false)}>
                  取消
                </Button>
                <Button variant="destructive" onClick={handleBatchDelete}>
                  确认删除
                </Button>
              </div>
            </div>}
        </DialogContent>
      </Dialog>

      {/* 创建分类对话框 */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新分类</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>分类名称</Label>
              <Input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="输入分类名称" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={addCategory}>
                创建
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 创建标签对话框 */}
      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新标签</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>标签名称</Label>
              <Input value={newTagName} onChange={e => setNewTagName(e.target.value)} placeholder="输入标签名称" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setTagDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={addTag}>
                创建
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除 "{selectedItem?.name}" 吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
}
