// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Label, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
// @ts-ignore;
import { Settings, Image, Video, Edit, Eye, Save, X } from 'lucide-react';

export function SectionManager() {
  const {
    toast
  } = useToast();
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  useEffect(() => {
    const mockSections = [{
      id: 'home',
      name: '首页',
      description: '网站首页展示内容',
      media: {
        hero: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
          name: 'hero-banner.jpg'
        },
        intro: {
          type: 'video',
          url: 'https://example.com/intro.mp4',
          name: 'intro-video.mp4'
        }
      }
    }, {
      id: 'about',
      name: '关于我们',
      description: '公司介绍页面',
      media: {
        team: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
          name: 'team-photo.jpg'
        },
        office: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
          name: 'office.jpg'
        }
      }
    }, {
      id: 'services',
      name: '服务',
      description: '服务展示页面',
      media: {
        banner: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
          name: 'services-banner.jpg'
        }
      }
    }, {
      id: 'solutions',
      name: '解决方案',
      description: '解决方案页面',
      media: {
        showcase: {
          type: 'video',
          url: 'https://example.com/solution.mp4',
          name: 'solution-showcase.mp4'
        }
      }
    }];
    setSections(mockSections);
  }, []);
  const handleSaveSection = updatedSection => {
    setSections(sections.map(section => section.id === updatedSection.id ? updatedSection : section));
    setEditDialogOpen(false);
    setSelectedSection(null);
    toast({
      title: '保存成功',
      description: `${updatedSection.name} 配置已更新`
    });
  };
  const handleMediaChange = (sectionId, mediaKey, newMedia) => {
    const updatedSection = sections.find(section => section.id === sectionId);
    if (updatedSection) {
      updatedSection.media[mediaKey] = newMedia;
      setSelectedSection(updatedSection);
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">栏目配置</h2>
        <p className="text-gray-600">为不同栏目配置对应的图片和视频素材</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(section => <Card key={section.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-[#0D7E9C]" />
                  <span>{section.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => {
              setSelectedSection(section);
              setEditDialogOpen(true);
            }}>
                  <Edit className="w-4 h-4" />
                </Button>
              </CardTitle>
              <p className="text-sm text-gray-600">{section.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(section.media).map(([key, media]) => <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {media.type === 'image' ? <Image className="w-5 h-5 text-blue-500" /> : <Video className="w-5 h-5 text-green-500" />}
                      <div>
                        <p className="font-medium text-sm">{key}</p>
                        <p className="text-xs text-gray-600">{media.name}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* 编辑对话框 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑栏目配置 - {selectedSection?.name}</DialogTitle>
          </DialogHeader>
          {selectedSection && <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">媒体配置</h3>
                {Object.entries(selectedSection.media).map(([key, media]) => <div key={key} className="space-y-2">
                    <Label className="text-sm font-medium">{key}</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">媒体类型</Label>
                        <Select value={media.type} onValueChange={value => handleMediaChange(selectedSection.id, key, {
                    ...media,
                    type: value
                  })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">图片</SelectItem>
                            <SelectItem value="video">视频</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">文件名</Label>
                        <Input value={media.name} onChange={e => handleMediaChange(selectedSection.id, key, {
                    ...media,
                    name: e.target.value
                  })} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">URL</Label>
                      <Input value={media.url} onChange={e => handleMediaChange(selectedSection.id, key, {
                  ...media,
                  url: e.target.value
                })} />
                    </div>
                    {media.type === 'image' && <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                      </div>}
                    {media.type === 'video' && <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Video className="w-12 h-12 text-gray-400" />
                      </div>}
                  </div>)}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => handleSaveSection(selectedSection)} className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E]">
                  <Save className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
}