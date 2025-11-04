// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Checkbox, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Upload, Image, Video, Trash2, Edit, Eye, Plus, Download, X, Check, AlertCircle, FileText, Copy, Link, ExternalLink, Scissors, Zap, FolderOpen, Tag, Move, Filter, Search, Grid3x3, List, ChevronDown, ChevronUp, FolderPlus, TagPlus, Archive, RefreshCw } from 'lucide-react';

import { MediaUpload } from '@/components/MediaUpload';
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

  // 模拟数据
  useEffect(() => {
    const mockData = [{
      id: '1',
      name: 'hero-banner.jpg',
      type: 'image',
      size: 2048576,
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
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
        id: Date.now() + index,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: file.size,
        url: URL.createObjectURL(file),
        section: 'unassigned',
        uploadedAt: new Date().toISOString(),
        description: '',
        format: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
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
      description: `成功上传 ${files.length} 个文件，已自动分类`
    });
  };
  const handleDelete = () => {
    const updatedItems = mediaItems.filter(item => item.id !== selectedItem.id);
    setMediaItems(updatedItems);
    updateCategoryAndTagCounts(updatedItems);
    setDeleteDialogOpen(false);
    setSelectedItem(null);
    toast({
      title: '删除成功',
      description: '文件已删除'
    });
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
  const handleBatchDelete = () => {
    const updatedItems = mediaItems.filter(item => !selectedItems.has(item.id));
    setMediaItems(updatedItems);
    updateCategoryAndTagCounts(updatedItems);
    setSelectedItems(new Set());
    setBatchDialogOpen(false);
    toast({
      title: '批量删除成功',
      description: `已删除 ${selectedItems.size} 个文件`
    });
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
  const getCategoryColor = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'gray';
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
                <DialogTitle>上传素材</DialogTitle>
              </DialogHeader>
              <MediaUpload onUpload={handleUpload} />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={() => setBatchMode(!batchMode)}>
            {batchMode ? <Grid3x3 className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
            {batchMode ? '退出批量' : '批量管理'}
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

      {/* 分类和标签筛选 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 分类筛选 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-5 h-5" />
                <span>分类筛选</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setCategoryDialogOpen(true)}>
                <FolderPlus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory('all')}>
                全部 ({mediaItems.length})
              </Button>
              {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(category.id)} className={`relative ${selectedCategory === category.id ? `bg-${category.color}-500` : ''}`}>
                  {category.name} ({category.count})
                </Button>)}
            </div>
          </CardContent>
        </Card>

        {/* 标签筛选 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>标签筛选</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setTagDialogOpen(true)}>
                <TagPlus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => <Button key={tag.id} variant={selectedTags.includes(tag.id) ? 'default' : 'outline'} size="sm" onClick={() => {
              if (selectedTags.includes(tag.id)) {
                setSelectedTags(selectedTags.filter(id => id !== tag.id));
              } else {
                setSelectedTags([...selectedTags, tag.id]);
              }
            }}>
                  #{tag.name} ({tag.count})
                </Button>)}
            </div>
          </CardContent>
        </Card>
      </div>

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
              <AlertCircle className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{formatFileSize(mediaItems.reduce((total, item) => total + item.size, 0))}</p>
                <p className="text-sm text-gray-600">总大小</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 素材展示 */}
      {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${batchMode ? 'cursor-pointer' : ''} ${selectedItems.has(item.id) ? 'ring-2 ring-blue-500' : ''}`} onClick={() => batchMode && handleBatchSelect(item.id, !selectedItems.has(item.id))}>
              <div className="aspect-video bg-gray-100 relative">
                {batchMode && <div className="absolute top-2 left-2 z-10">
                    <Checkbox checked={selectedItems.has(item.id)} onChange={checked => handleBatchSelect(item.id, checked)} />
                  </div>}
                {item.type === 'image' ? <img src={item.url} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>}
                <div className="absolute top-2 right-2">
                  <Badge variant={item.type === 'image' ? 'default' : 'secondary'}>
                    {item.type === 'image' ? '图片' : '视频'}
                  </Badge>
                </div>
                {item.optimized && <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Zap className="w-3 h-3 mr-1" />
                    已优化
                  </Badge>
                </div>}
                {item.category && <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className={`bg-${getCategoryColor(item.category)}-50 text-${getCategoryColor(item.category)}-700 border-${getCategoryColor(item.category)}-200`}>
                      {categories.find(c => c.id === item.category)?.name}
                    </Badge>
                  </div>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{formatFileSize(item.size)}</p>
                {item.dimensions && <p className="text-xs text-gray-500 mb-2">{item.dimensions}</p>}
                
                {/* 标签显示 */}
                {item.tags && item.tags.length > 0 && <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.slice(0, 3).map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? <Badge key={tagId} variant="outline" className="text-xs">
                          #{tag.name}
                        </Badge> : null;
            })}
                    {item.tags.length > 3 && <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 3}
                      </Badge>}
                  </div>}
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.section}</Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={e => {
                e.stopPropagation();
                setSelectedItem(item);
              }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={e => {
                e.stopPropagation();
                copyToClipboard(item.url);
              }}>
                      {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={e => {
                e.stopPropagation();
                setSelectedItem(item);
                setEditDialogOpen(true);
              }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={e => {
                e.stopPropagation();
                setSelectedItem(item);
                setDeleteDialogOpen(true);
              }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div> : <Card>
          <Table>
            <TableHeader>
              <TableRow>
                {batchMode && <TableHead>
                    <Checkbox checked={selectedItems.size === filteredItems.length} onChange={handleSelectAll} />
                  </TableHead>}
                <TableHead>名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>大小</TableHead>
                <TableHead>格式</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>栏目</TableHead>
                <TableHead>上传时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map(item => <TableRow key={item.id} className={selectedItems.has(item.id) ? 'bg-blue-50' : ''}>
                  {batchMode && <TableCell>
                      <Checkbox checked={selectedItems.has(item.id)} onChange={checked => handleBatchSelect(item.id, checked)} />
                    </TableCell>}
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {item.type === 'image' ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                      <span className="font-medium">{item.name}</span>
                      {item.optimized && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Zap className="w-3 h-3 mr-1" />
                          已优化
                        </Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.type === 'image' ? 'default' : 'secondary'}>
                      {item.type === 'image' ? '图片' : '视频'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(item.size)}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{item.format}</span>
                      {item.dimensions && <span className="text-xs text-gray-500 block">{item.dimensions}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.category && <Badge variant="outline" className={`bg-${getCategoryColor(item.category)}-50 text-${getCategoryColor(item.category)}-700 border-${getCategoryColor(item.category)}-200`}>
                        {categories.find(c => c.id === item.category)?.name}
                      </Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.tags && item.tags.slice(0, 2).map(tagId => {
                  const tag = tags.find(t => t.id === tagId);
                  return tag ? <Badge key={tagId} variant="outline" className="text-xs">
                            #{tag.name}
                          </Badge> : null;
                })}
                      {item.tags && item.tags.length > 2 && <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 2}
                        </Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.section}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.uploadedAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(item.url)}>
                        {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedItem(item);
                  setEditDialogOpen(true);
                }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedItem(item);
                  setDeleteDialogOpen(true);
                }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </Card>}

      {/* 编辑对话框 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑素材信息</DialogTitle>
          </DialogHeader>
          {selectedItem && <div className="space-y-4">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">基本信息</TabsTrigger>
                  <TabsTrigger value="category">分类标签</TabsTrigger>
                  <TabsTrigger value="address">地址管理</TabsTrigger>
                  <TabsTrigger value="preview">预览</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="space-y-2">
                    <Label>文件名</Label>
                    <Input value={selectedItem.name} onChange={e => setSelectedItem({
                  ...selectedItem,
                  name: e.target.value
                })} />
                  </div>
                  <div className="space-y-2">
                    <Label>描述</Label>
                    <Input value={selectedItem.description} onChange={e => setSelectedItem({
                  ...selectedItem,
                  description: e.target.value
                })} />
                  </div>
                  <div className="space-y-2">
                    <Label>栏目</Label>
                    <Select value={selectedItem.section} onValueChange={value => setSelectedItem({
                  ...selectedItem,
                  section: value
                })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">首页</SelectItem>
                        <SelectItem value="about">关于我们</SelectItem>
                        <SelectItem value="services">服务</SelectItem>
                        <SelectItem value="solutions">解决方案</SelectItem>
                        <SelectItem value="products">产品</SelectItem>
                        <SelectItem value="technology">技术</SelectItem>
                        <SelectItem value="unassigned">未分配</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="category" className="space-y-4">
                  <div className="space-y-2">
                    <Label>分类</Label>
                    <Select value={selectedItem.category || ''} onValueChange={value => setSelectedItem({
                  ...selectedItem,
                  category: value
                })}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>标签</Label>
                    <div className="border rounded-lg p-3 max-h-32 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2">
                        {tags.map(tag => <div key={tag.id} className="flex items-center space-x-2">
                            <input type="checkbox" id={`tag-${tag.id}`} checked={selectedItem.tags && selectedItem.tags.includes(tag.id)} onChange={e => {
                        const currentTags = selectedItem.tags || [];
                        if (e.target.checked) {
                          setSelectedItem({
                            ...selectedItem,
                            tags: [...currentTags, tag.id]
                          });
                        } else {
                          setSelectedItem({
                            ...selectedItem,
                            tags: currentTags.filter(id => id !== tag.id)
                          });
                        }
                      }} />
                            <Label htmlFor={`tag-${tag.id}`} className="text-sm">
                              #{tag.name}
                            </Label>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="address" className="space-y-4">
                  <div className="space-y-2">
                    <Label>文件地址</Label>
                    <div className="flex items-center space-x-2">
                      <Input value={selectedItem.url} readOnly className="text-xs" />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(selectedItem.url)}>
                        {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(selectedItem.url, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">点击复制按钮获取文件地址，可用于网站引用</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>HTML 引用代码</Label>
                    {selectedItem.type === 'image' ? <div className="space-y-2">
                        <Input value={`<img src="${selectedItem.url}" alt="${selectedItem.name}" />`} readOnly className="text-xs font-mono" />
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(`<img src="${selectedItem.url}" alt="${selectedItem.name}" />`)}>
                          <Copy className="w-4 h-4 mr-2" />
                          复制HTML代码
                        </Button>
                      </div> : <div className="space-y-2">
                        <Input value={`<video src="${selectedItem.url}" controls></video>`} readOnly className="text-xs font-mono" />
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(`<video src="${selectedItem.url}" controls></video>`)}>
                          <Copy className="w-4 h-4 mr-2" />
                          复制HTML代码
                        </Button>
                      </div>}
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    {selectedItem.type === 'image' ? <img src={selectedItem.url} alt={selectedItem.name} className="w-full h-auto max-h-96 object-contain" /> : <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Video className="w-12 h-12 text-gray-400" />
                      </div>}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">文件大小:</span>
                      <span className="ml-2 font-medium">{formatFileSize(selectedItem.size)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">文件格式:</span>
                      <span className="ml-2 font-medium">{selectedItem.format}</span>
                    </div>
                    {selectedItem.dimensions && <div>
                        <span className="text-gray-600">图片尺寸:</span>
                        <span className="ml-2 font-medium">{selectedItem.dimensions}</span>
                      </div>}
                    {selectedItem.duration && <div>
                        <span className="text-gray-600">视频时长:</span>
                        <span className="ml-2 font-medium">{selectedItem.duration}</span>
                      </div>}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => handleEdit(selectedItem)}>
                  保存
                </Button>
              </div>
            </div>}
        </DialogContent>
      </Dialog>

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