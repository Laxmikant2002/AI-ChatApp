export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

export interface FileWithPreview extends File {
  preview?: string;
}

export class FileUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export const validateFile = (file: File): void => {
  if (!file) {
    throw new FileUploadError('No file selected');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new FileUploadError(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  const allowedTypes = Object.keys(ALLOWED_FILE_TYPES);
  if (!allowedTypes.includes(file.type)) {
    throw new FileUploadError(
      `Invalid file type. Allowed types: ${Object.values(ALLOWED_FILE_TYPES).flat().join(', ')}`
    );
  }
};

export const getFilePreview = async (file: File): Promise<string> => {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file);
  }
  
  // For non-image files, return an icon based on file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return `/icons/${fileExtension || 'default'}.svg`;
};

export const uploadFile = async (file: File): Promise<string> => {
  validateFile(file);

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('File upload error:', error);
    throw new FileUploadError(
      error instanceof Error ? error.message : 'Failed to upload file'
    );
  }
}; 