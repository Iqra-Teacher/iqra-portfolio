import React, { useState } from 'react';
import { Upload, X, FileCheck, Image as ImageIcon, Link as LinkIcon, RefreshCw, CheckCircle2 } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  optional?: boolean;
  helpText?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  label,
  value,
  onChange,
  accept = "image/*,application/pdf",
  optional = false,
  helpText = "Supports PNG, JPG, WEBP or PDF documents"
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadError('Failed to upload file. Please try again or paste URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setUploadError(null);
  };

  const isPdf = value.toLowerCase().endsWith('.pdf') || value.includes('application/pdf');

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider font-bold text-charcoal">
          {label} {optional ? <span className="text-charcoal-muted font-normal">(Optional)</span> : '*'}
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] text-gold hover:underline font-semibold flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showManualUrl ? 'Device Upload' : 'Paste Direct URL'}</span>
        </button>
      </div>

      {showManualUrl ? (
        <div className="space-y-1">
          <input
            type="url"
            placeholder="https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gold-subtle bg-cream-50 text-charcoal text-xs focus:ring-1 focus:ring-gold focus:border-gold"
          />
          <p className="text-[10px] text-charcoal-muted">Paste a direct image or file URL.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {value ? (
            /* Selected File Preview Box */
            <div className="relative rounded-2xl border-2 border-gold/40 bg-cream-50 p-4 flex items-center justify-between gap-4 shadow-sm group">
              <div className="flex items-center gap-3 overflow-hidden">
                {isPdf ? (
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-charcoal/10 border border-gold-subtle shrink-0">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="truncate space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="truncate">File Selected / Uploaded</span>
                  </div>
                  <p className="text-[10px] text-charcoal-muted truncate max-w-xs">{value}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <label className="p-2 rounded-full border border-gold/30 bg-cream-100 text-gold hover:bg-gold hover:text-cream-50 cursor-pointer transition-colors" title="Change file">
                  <RefreshCw className="w-4 h-4" />
                  <input
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Upload Dropzone UI */
            <label className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              uploading 
                ? 'border-gold bg-gold/10' 
                : 'border-gold-subtle hover:border-gold bg-cream-50/70 hover:bg-cream-50'
            }`}>
              <input
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full border border-gold/40 bg-cream-100 flex items-center justify-center text-gold shadow-sm">
                  {uploading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold text-charcoal">
                    {uploading ? 'Uploading to Cloudinary...' : 'Click to Upload or Choose File from Device'}
                  </p>
                  <p className="text-[10px] text-charcoal-muted mt-0.5">{helpText}</p>
                </div>
              </div>
            </label>
          )}

          {uploadError && (
            <p className="text-[11px] text-red-600 font-semibold">{uploadError}</p>
          )}
        </div>
      )}
    </div>
  );
};
