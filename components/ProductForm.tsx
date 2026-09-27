'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2, ImagePlus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

type MediaItem = 
  | { type: 'existing'; url: string }
  | { type: 'new'; file: File; preview: string };

export default function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const isEdit = !!productId;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Unified state for both existing and new images to allow reordering
  const [media, setMedia] = useState<MediaItem[]>([]);
  
  const [sizes, setSizes] = useState<string[]>([]);
  const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    stock: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [isEdit]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          discountPercentage: data.discountPercentage ? data.discountPercentage.toString() : '',
          stock: data.stock !== undefined ? data.stock.toString() : '0',
        });
        
        if (data.sizes && data.sizes.length > 0) {
          setSizes(data.sizes);
        }
        
        if (data.imageUrls && data.imageUrls.length > 0) {
          setMedia(data.imageUrls.map((url: string) => ({ type: 'existing', url })));
        }
      }
    } catch (error) {
      console.error('Failed to fetch product', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles: { file: File; preview: string }[] = [];
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB

      filesArray.forEach(file => {
        if (file.size > MAX_SIZE) {
          alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
        } else {
          validFiles.push({
            file,
            preview: URL.createObjectURL(file)
          });
        }
      });

      if (validFiles.length > 0) {
        setMedia(prev => [...prev, ...validFiles]);
      }
      
      // Reset input value so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  const removeMedia = (indexToRemove: number) => {
    setMedia(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const moveMedia = (index: number, direction: 'left' | 'right') => {
    setMedia(prev => {
      const newMedia = [...prev];
      if (direction === 'left' && index > 0) {
        // Swap with previous
        [newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]];
      } else if (direction === 'right' && index < newMedia.length - 1) {
        // Swap with next
        [newMedia[index], newMedia[index + 1]] = [newMedia[index + 1], newMedia[index]];
      }
      return newMedia;
    });
  };

  const toggleSize = (size: string) => {
    setSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to upload image');
    }
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (media.length === 0) {
        throw new Error('At least one image is required');
      }

      setUploading(true);
      
      // Upload new images and map existing ones, preserving exact order
      const uploadPromises = media.map(async (item) => {
        if (item.type === 'existing') {
          return item.url;
        } else {
          return await uploadImageToCloudinary(item.file);
        }
      });
      
      const finalImageUrls = await Promise.all(uploadPromises);
      setUploading(false);

      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : 0,
        stock: formData.stock ? Number(formData.stock) : 0,
        imageUrls: finalImageUrls,
        sizes: sizes,
      };

      const url = isEdit ? `/api/products/${productId}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/dashboard/products');
        router.refresh();
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save product to database');
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert(error.message || 'Failed to save product.');
      setUploading(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]"><Loader2 className="animate-spin text-neutral-500 w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both pb-20">
      <div className="flex items-center gap-5">
        <Link 
          href="/dashboard/products" 
          className="p-2.5 bg-[#0a0a0a] rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all active:scale-95"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {isEdit ? 'Update the details of your product.' : 'Fill in the information to create a new product.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Image Upload Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Product Images</h3>
          <p className="text-sm text-neutral-400 mb-6">
            Upload multiple high-quality images. Use the arrows to reorder them. The image marked "1" will be the cover.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {media.map((item, index) => (
              <div key={index} className="aspect-square rounded-[16px] bg-neutral-900 border border-neutral-800 relative group overflow-hidden">
                <img 
                  src={item.type === 'existing' ? item.url : item.preview} 
                  alt={`Product ${index + 1}`} 
                  className={`w-full h-full object-cover ${item.type === 'new' ? 'opacity-90' : ''}`} 
                />
                
                {/* Number Badge */}
                <div className="absolute top-2 left-2 bg-black/80 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10 border border-neutral-700/50">
                  {index + 1}
                </div>

                {/* 'New' tag if it's a new file */}
                {item.type === 'new' && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] uppercase font-bold text-white bg-black/50 px-2 py-1 rounded-md tracking-wider">New</span>
                  </div>
                )}

                {/* Hover Controls Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-lg transition-colors"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div className="flex justify-center gap-2 mb-1">
                    <button
                      type="button"
                      onClick={() => moveMedia(index, 'left')}
                      disabled={index === 0}
                      className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-white p-2 rounded-lg transition-colors"
                      title="Move left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMedia(index, 'right')}
                      disabled={index === media.length - 1}
                      className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-white p-2 rounded-lg transition-colors"
                      title="Move right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Upload Button Box */}
            <div className="aspect-square rounded-[16px] bg-neutral-900/50 border-2 border-dashed border-neutral-800 flex items-center justify-center relative hover:border-neutral-700 transition-colors cursor-pointer group">
              <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center text-neutral-500 group-hover:text-neutral-400 transition-colors">
                <ImagePlus className="h-8 w-8 mb-2" strokeWidth={1.5} />
                <span className="text-xs font-medium">Add Images</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-neutral-800/60" />

        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product Details</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-neutral-400 mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-white/20 focus:border-white/50 outline-none transition-all"
                  placeholder="e.g. Classic Heavyweight Hoodie"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-neutral-400 mb-2">Description</label>
                <textarea
                  id="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-white/20 focus:border-white/50 outline-none transition-all resize-y"
                  placeholder="Tell your customers about this product..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-400 mb-3">Available Sizes</label>
                <div className="flex flex-wrap gap-3">
                  {AVAILABLE_SIZES.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`w-14 h-12 flex items-center justify-center rounded-lg font-medium text-sm transition-all ${
                        sizes.includes(size)
                          ? 'bg-white text-black shadow-md border border-white'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-neutral-800/60" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-neutral-400 mb-2">Regular Price ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">$</span>
                  <input
                    type="number"
                    id="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-xl bg-neutral-900 border border-neutral-800 pl-8 pr-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-white/20 focus:border-white/50 outline-none transition-all font-medium"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="discountPercentage" className="block text-sm font-semibold text-neutral-400 mb-2">Discount Percentage (%) <span className="text-neutral-600 font-normal ml-1">Optional</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">%</span>
                  <input
                    type="number"
                    id="discountPercentage"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                    className="w-full rounded-xl bg-neutral-900 border border-neutral-800 pl-10 pr-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-white/20 focus:border-white/50 outline-none transition-all font-medium"
                    placeholder="e.g. 20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-semibold text-neutral-400 mb-2">Total Quantity</label>
                <div className="relative">
                  <input
                    type="number"
                    id="stock"
                    min="0"
                    step="1"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-white/20 focus:border-white/50 outline-none transition-all font-medium"
                    placeholder="e.g. 100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800/60 flex justify-end gap-4">
          <Link 
            href="/dashboard/products"
            className="px-6 py-3 rounded-xl font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || media.length === 0}
            className="bg-white hover:bg-neutral-200 text-black px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {uploading ? 'Uploading media...' : 'Saving...'}
              </>
            ) : (
              isEdit ? 'Save Changes' : 'Publish Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
