// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@/components/ui';
// @ts-ignore;
import { Copy, Check, ExternalLink } from 'lucide-react';

export function MediaEditDialog({
  open,
  onOpenChange,
  item,
  categories,
  tags,
  onSave,
  copiedUrl,
  onCopyUrl
}) {
  const [editedItem, setEditedItem] = useState(item || {});
  React.useEffect(() => {
    setEditedItem(item || {});
  }, [item]);
  const handleSave = () => {
    onSave(editedItem);
  };
  const getCategoryColor = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'gray';
  };
  if (!item) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>编辑素材信息</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
                <Input value={editedItem.name || ''} onChange={e => setEditedItem({
                ...editedItem,
                name: e.target.value
              })} />
              </div>
              <div className="space-y-2">
                <Label>描述</Label>
                <Input value={editedItem.description || ''} onChange={e => setEditedItem({
                ...editedItem,
                description: e.target.value
              })} />
              </div>
              <div className="space-y-2">
                <Label>栏目</Label>
                <Select value={editedItem.section || ''} onValueChange={value => setEditedItem({
                ...editedItem,
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
              <div className="space-y-2">
                <Label>云存储路径</Label>
                <Input value={editedItem.cloudPath || ''} readOnly className="text-xs font-mono bg-gray-50" />
              </div>
            </TabsContent>
            
            <TabsContent value="category" className="space-y-4">
              <div className="space-y-2">
                <Label>分类</Label>
                <Select value={editedItem.category || ''} onValueChange={value => setEditedItem({
                ...editedItem,
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
                        <input type="checkbox" id={`tag-${tag.id}`} checked={editedItem.tags && editedItem.tags.includes(tag.id)} onChange={e => {
                      const currentTags = editedItem.tags || [];
                      if (e.target.checked) {
                        setEditedItem({
                          ...editedItem,
                          tags: [...currentTags, tag.id]
                        });
                      } else {
                        setEditedItem({
                          ...editedItem,
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
                  <Input value={editedItem.url || ''} readOnly className="text-xs" />
                  <Button variant="outline" size="sm" onClick={() => onCopyUrl(editedItem.url)}>
                    {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(editedItem.url, '_blank')}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">点击复制按钮获取文件地址，可用于网站引用</p>
              </div>
              
              <div className="space-y-2">
                <Label>HTML 引用代码</Label>
                {editedItem.type === 'image' ? <div className="space-y-2">
                    <Input value={`<img src="${editedItem.url}" alt="${editedItem.name}" />`} readOnly className="text-xs font-mono" />
                    <Button variant="outline" size="sm" onClick={() => onCopyUrl(`<img src="${editedItem.url}" alt="${editedItem.name}" />`)}>
                      <Copy className="w-4 h-4 mr-2" />
                      复制HTML代码
                    </Button>
                  </div> : <div className="space-y-2">
                    <Input value={`<video src="${editedItem.url}" controls></video>`} readOnly className="text-xs font-mono" />
                    <Button variant="outline" size="sm" onClick={() => onCopyUrl(`<video src="${editedItem.url}" controls></video>`)}>
                      <Copy className="w-4 h-4 mr-2" />
                      复制HTML代码
                    </Button>
                  </div>}
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-lg p-4">
                {editedItem.type === 'image' ? <img src={editedItem.url} alt={editedItem.name} className="w-full h-auto max-h-96 object-contain" /> : <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <video src={editedItem.url} controls className="max-w-full max-h-96" />
                  </div>}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">文件大小:</span>
                  <span className="ml-2 font-medium">{formatFileSize(editedItem.size)}</span>
                </div>
                <div>
                  <span className="text-gray-600">文件格式:</span>
                  <span className="ml-2 font-medium">{editedItem.format}</span>
                </div>
                {editedItem.dimensions && <div>
                    <span className="text-gray-600">图片尺寸:</span>
                    <span className="ml-2 font-medium">{editedItem.dimensions}</span>
                  </div>}
                {editedItem.duration && <div>
                    <span className="text-gray-600">视频时长:</span>
                    <span className="ml-2 font-medium">{editedItem.duration}</span>
                  </div>}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}

// 辅助函数
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}