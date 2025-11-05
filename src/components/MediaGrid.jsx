// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Badge, Checkbox } from '@/components/ui';
// @ts-ignore;
import { Image, Video, Eye, Copy, Check, Edit, Trash2, Cloud, Zap } from 'lucide-react';

export function MediaGrid({
  items,
  selectedItems,
  batchMode,
  categories,
  tags,
  onBatchSelect,
  onSelectItem,
  onCopyUrl,
  onEdit,
  onDelete,
  copiedUrl
}) {
  const getCategoryColor = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'gray';
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map(item => <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${batchMode ? 'cursor-pointer' : ''} ${selectedItems.has(item.id) ? 'ring-2 ring-blue-500' : ''}`} onClick={() => batchMode && onBatchSelect(item.id, !selectedItems.has(item.id))}>
          <div className="aspect-video bg-gray-100 relative">
            {batchMode && <div className="absolute top-2 left-2 z-10">
                <Checkbox checked={selectedItems.has(item.id)} onChange={checked => onBatchSelect(item.id, checked)} />
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
            {item.cloudPath && <div className="absolute top-2 right-16">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Cloud className="w-3 h-3 mr-1" />
                  云存储
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
              onSelectItem(item);
            }}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={e => {
              e.stopPropagation();
              onCopyUrl(item.url);
            }}>
                  {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={e => {
              e.stopPropagation();
              onEdit(item);
            }}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={e => {
              e.stopPropagation();
              onDelete(item);
            }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>)}
    </div>;
}

// 辅助函数
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}