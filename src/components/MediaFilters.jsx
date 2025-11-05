// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { FolderOpen, Tag, FolderPlus, TagPlus } from 'lucide-react';

export function MediaFilters({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  totalItems,
  onCategoryChange,
  onTagChange,
  onCategoryDialogOpen,
  onTagDialogOpen
}) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 分类筛选 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-5 h-5" />
              <span>分类筛选</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onCategoryDialogOpen}>
              <FolderPlus className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange('all')}>
              全部 ({totalItems})
            </Button>
            {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange(category.id)} className={`relative ${selectedCategory === category.id ? `bg-${category.color}-500` : ''}`}>
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
            <Button variant="ghost" size="sm" onClick={onTagDialogOpen}>
              <TagPlus className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => <Button key={tag.id} variant={selectedTags.includes(tag.id) ? 'default' : 'outline'} size="sm" onClick={() => {
            if (selectedTags.includes(tag.id)) {
              onTagChange(selectedTags.filter(id => id !== tag.id));
            } else {
              onTagChange([...selectedTags, tag.id]);
            }
          }}>
                #{tag.name} ({tag.count})
              </Button>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}