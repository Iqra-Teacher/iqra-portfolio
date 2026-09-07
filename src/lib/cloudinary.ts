export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
}

export const uploadToCloudinary = async (
  file: File, 
  preset: string = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset'
): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    // Development fallback simulation for instant preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }

  const data: CloudinaryUploadResponse = await response.json();
  return data.secure_url;
};

/**
 * Utility to generate Cloudinary auto-format and quality URLs
 */
export const getOptimizedImageUrl = (url: string, width = 800): string => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto/`);
};
