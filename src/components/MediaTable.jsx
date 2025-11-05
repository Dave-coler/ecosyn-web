// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Checkbox } from '@/components/ui';
// @ts-ignore;
import { Image, Video, Eye, Copy, Check, Edit, Trash2, Cloud, Zap } from 'lucide-react';

export function MediaTable({
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
  return <Table>
      <TableHeader>
        <TableRow>
          {batchMode && <TableHead>
              <Checkbox checked={selectedItems.size === items.length} onChange={checked => {
            const newSelected = new Set();
            if (checked) {
              items.forEach(item => newSelected.add(item.id));
            }
            onBatchSelect(newSelected);
          }} />
            </TableHead>}
          <TableHead>名称</TableHead>
          <TableHead>类型</TableHead>
          <TableHead>大小</TableHead>
          <TableHead>格式</TableHead>
          <TableHead>分类</TableHead>
          <TableHead>标签</TableHead>
          <TableHead>存储位置</TableHead>
          <TableHead>上传时间</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => <TableRow key={item.id} className={selectedItems.has(item.id) ? 'bg-blue-50' : ''}>
            {batchMode && <TableCell>
                <Checkbox checked={selectedItems.has(item.id)} onChange={checked => onBatchSelect(item.id, checked)} />
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
              <div className="flex items-center space-x-1">
                <Cloud className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-600">HILLSEA-web</span>
              </div>
            </TableCell>
            <TableCell>{formatDate(item.uploadedAt)}</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => onSelectItem(item)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onCopyUrl(item.url)}>
                  {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(item)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>;
}

// 辅助函数
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN');
}