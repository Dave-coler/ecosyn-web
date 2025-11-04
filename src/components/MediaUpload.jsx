// @ts-ignore;
import React, { useState, useCallback, useRef } from 'react';
// @ts-ignore;
import { useToast, Button, Slider, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Upload, X, FileText, Image, Video, Crop, RotateCw, Download, Copy, Check, Scissors, Zap, Eye, EyeOff, Settings, RefreshCw, Edit } from 'lucide-react';

export function MediaUpload({
  onUpload
}) {
  const {
    toast
  } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // 编辑状态
  const [cropSettings, setCropSettings] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    aspectRatio: 'free'
  });
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    format: 'original'
  });
  const [previewMode, setPreviewMode] = useState('original');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const handleDrag = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  const handleDrop = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);
  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  const handleFiles = fileList => {
    const validFiles = Array.from(fileList).filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
      const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB

      if (!isValidType) {
        toast({
          title: '文件类型错误',
          description: `${file.name} 不是支持的文件类型`,
          variant: 'destructive'
        });
        return false;
      }
      if (!isValidSize) {
        toast({
          title: '文件过大',
          description: `${file.name} 超过100MB限制`,
          variant: 'destructive'
        });
        return false;
      }
      return true;
    });
    setFiles(prev => [...prev, ...validFiles]);
  };
  const removeFile = index => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  const handleEdit = file => {
    if (file.type.startsWith('image/')) {
      setEditingFile(file);
      setEditMode(true);
      // 初始化裁剪设置
      const img = new Image();
      img.onload = () => {
        setCropSettings({
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
          aspectRatio: 'free'
        });
      };
      img.src = URL.createObjectURL(file);
    } else {
      toast({
        title: '仅支持图片编辑',
        description: '视频文件暂不支持编辑功能',
        variant: 'destructive'
      });
    }
  };
  const applyCrop = () => {
    if (!editingFile || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = cropSettings.width;
      canvas.height = cropSettings.height;
      ctx.drawImage(img, cropSettings.x, cropSettings.y, cropSettings.width, cropSettings.height, 0, 0, cropSettings.width, cropSettings.height);
      canvas.toBlob(blob => {
        const croppedFile = new File([blob], editingFile.name, {
          type: editingFile.type
        });

        // 替换原文件
        setFiles(prev => prev.map(f => f === editingFile ? croppedFile : f));
        setEditingFile(croppedFile);
        toast({
          title: '裁剪成功',
          description: '图片已裁剪'
        });
      }, editingFile.type, compressionSettings.quality / 100);
    };
    img.src = URL.createObjectURL(editingFile);
  };
  const applyCompression = () => {
    if (!editingFile || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      // 计算新尺寸
      let {
        width,
        height
      } = img;
      const ratio = Math.min(compressionSettings.maxWidth / width, compressionSettings.maxHeight / height, 1);
      width *= ratio;
      height *= ratio;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // 确定输出格式
      let outputFormat = editingFile.type;
      if (compressionSettings.format !== 'original') {
        outputFormat = `image/${compressionSettings.format}`;
      }
      canvas.toBlob(blob => {
        const compressedFile = new File([blob], editingFile.name, {
          type: outputFormat
        });

        // 替换原文件
        setFiles(prev => prev.map(f => f === editingFile ? compressedFile : f));
        setEditingFile(compressedFile);
        const originalSize = editingFile.size;
        const compressedSize = compressedFile.size;
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        toast({
          title: '压缩成功',
          description: `文件大小减少 ${savings}%`
        });
      }, outputFormat, compressionSettings.quality / 100);
    };
    img.src = URL.createObjectURL(editingFile);
  };
  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: '请选择文件',
        description: '请先选择要上传的文件',
        variant: 'destructive'
      });
      return;
    }
    onUpload(files);
    setFiles([]);
    setEditMode(false);
    setEditingFile(null);
  };
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getFileUrl = file => {
    return URL.createObjectURL(file);
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
  const aspectRatios = {
    free: {
      label: '自由',
      value: 'free'
    },
    '1:1': {
      label: '1:1',
      value: '1:1'
    },
    '16:9': {
      label: '16:9',
      value: '16:9'
    },
    '4:3': {
      label: '4:3',
      value: '4:3'
    },
    '3:2': {
      label: '3:2',
      value: '3:2'
    }
  };
  if (editMode && editingFile) {
    return <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">编辑图片 - {editingFile.name}</h3>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => {
            setEditMode(false);
            setEditingFile(null);
          }}>
              <X className="w-4 h-4 mr-2" />
              关闭
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 预览区域 */}
          <div>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Label>预览模式</Label>
                <div className="flex space-x-1">
                  <Button variant={previewMode === 'original' ? 'default' : 'outline'} size="sm" onClick={() => setPreviewMode('original')}>
                    原图
                  </Button>
                  <Button variant={previewMode === 'edited' ? 'default' : 'outline'} size="sm" onClick={() => setPreviewMode('edited')}>
                    编辑后
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden bg-gray-100">
                <img src={previewMode === 'original' ? URL.createObjectURL(files.find(f => f === editingFile) || editingFile) : URL.createObjectURL(editingFile)} alt="预览" className="w-full h-auto max-h-96 object-contain" />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>文件大小: {formatFileSize(editingFile.size)}</p>
                <p>文件类型: {editingFile.type}</p>
              </div>
            </div>

            {/* 文件地址 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">文件地址</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input value={getFileUrl(editingFile)} readOnly className="text-xs" />
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(getFileUrl(editingFile))}>
                      {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">点击复制按钮获取文件地址，可用于网站引用</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 编辑工具 */}
          <div>
            <Tabs defaultValue="crop" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crop">裁剪</TabsTrigger>
                <TabsTrigger value="compress">压缩</TabsTrigger>
              </TabsList>
              
              <TabsContent value="crop" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">裁剪设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>宽高比</Label>
                      <Select value={cropSettings.aspectRatio} onValueChange={value => {
                      const ratio = aspectRatios[value];
                      if (value !== 'free') {
                        const [w, h] = value.split(':').map(Number);
                        const newHeight = Math.round(cropSettings.width * h / w);
                        setCropSettings(prev => ({
                          ...prev,
                          aspectRatio: value,
                          height: newHeight
                        }));
                      } else {
                        setCropSettings(prev => ({
                          ...prev,
                          aspectRatio: value
                        }));
                      }
                    }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(aspectRatios).map(([key, ratio]) => <SelectItem key={key} value={ratio.value}>
                              {ratio.label}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>宽度 (px)</Label>
                        <Input type="number" value={cropSettings.width} onChange={e => setCropSettings(prev => ({
                        ...prev,
                        width: parseInt(e.target.value) || 0
                      }))} />
                      </div>
                      <div>
                        <Label>高度 (px)</Label>
                        <Input type="number" value={cropSettings.height} onChange={e => setCropSettings(prev => ({
                        ...prev,
                        height: parseInt(e.target.value) || 0
                      }))} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>X 位置</Label>
                        <Input type="number" value={cropSettings.x} onChange={e => setCropSettings(prev => ({
                        ...prev,
                        x: parseInt(e.target.value) || 0
                      }))} />
                      </div>
                      <div>
                        <Label>Y 位置</Label>
                        <Input type="number" value={cropSettings.y} onChange={e => setCropSettings(prev => ({
                        ...prev,
                        y: parseInt(e.target.value) || 0
                      }))} />
                      </div>
                    </div>
                    
                    <Button onClick={applyCrop} className="w-full">
                      <Scissors className="w-4 h-4 mr-2" />
                      应用裁剪
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="compress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">压缩设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>图片质量: {compressionSettings.quality}%</Label>
                      <Slider value={[compressionSettings.quality]} onValueChange={([value]) => setCompressionSettings(prev => ({
                      ...prev,
                      quality: value
                    }))} max={100} min={10} step={5} className="mt-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>最大宽度 (px)</Label>
                        <Input type="number" value={compressionSettings.maxWidth} onChange={e => setCompressionSettings(prev => ({
                        ...prev,
                        maxWidth: parseInt(e.target.value) || 1920
                      }))} />
                      </div>
                      <div>
                        <Label>最大高度 (px)</Label>
                        <Input type="number" value={compressionSettings.maxHeight} onChange={e => setCompressionSettings(prev => ({
                        ...prev,
                        maxHeight: parseInt(e.target.value) || 1080
                      }))} />
                      </div>
                    </div>
                    
                    <div>
                      <Label>输出格式</Label>
                      <Select value={compressionSettings.format} onValueChange={value => setCompressionSettings(prev => ({
                      ...prev,
                      format: value
                    }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">保持原格式</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="webp">WebP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={applyCompression} className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      应用压缩
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* 隐藏的canvas用于图片处理 */}
        <canvas ref={canvasRef} className="hidden" />
      </div>;
  }
  return <div className="space-y-4">
      <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-[#0D7E9C] bg-[#0D7E9C]/5' : 'border-gray-300'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">拖拽文件到此处上传</p>
        <p className="text-sm text-gray-600 mb-4">或者</p>
        <input type="file" multiple accept="image/*,video/*" onChange={handleChange} className="hidden" id="file-upload" ref={fileInputRef} />
        <Button asChild variant="outline">
          <label htmlFor="file-upload" className="cursor-pointer">
            选择文件
          </label>
        </Button>
        <p className="text-xs text-gray-500 mt-4">
          支持格式：JPG, PNG, GIF, WebP, MP4, AVI, MOV（最大100MB）
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <Scissors className="w-3 h-3 mr-1" />
            支持裁剪
          </div>
          <div className="flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            支持压缩
          </div>
          <div className="flex items-center">
            <Copy className="w-3 h-3 mr-1" />
            可复制地址
          </div>
        </div>
      </div>

      {files.length > 0 && <div className="space-y-2">
          <h3 className="font-medium">待上传文件</h3>
          {files.map((file, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {file.type.startsWith('image/') ? <Image className="w-5 h-5 text-blue-500" /> : <Video className="w-5 h-5 text-green-500" />}
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {file.type.startsWith('image/') && <Button variant="ghost" size="sm" onClick={() => handleEdit(file)}>
                    <Edit className="w-4 h-4" />
                  </Button>}
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(getFileUrl(file))}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>)}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setFiles([])}>
              清空
            </Button>
            <Button onClick={handleUpload} className="bg-gradient-to-r from-[#0D7E9C] to-[#01847E]">
              上传 {files.length} 个文件
            </Button>
          </div>
        </div>}
    </div>;
}