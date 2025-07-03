import { useState, useRef } from 'react';
import { X, Upload, Image } from 'lucide-react';
import type { Garden } from '../types';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  onSubmit: (gardenData: Omit<Garden, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please enter a garden name');
      return;
    }

    // In a real app, you would upload the file to a cloud storage service
    // For now, we'll use the local preview URL (this won't persist across sessions)
    const gardenData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      imageUrl: previewUrl!,
    };

    onSubmit(gardenData);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Upload Garden Photo</h2>
          <button onClick={onCancel} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* File Upload Area */}
            <div
              className={`${styles.uploadArea} ${isDragActive ? styles.dragActive : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              <Image className={styles.uploadIcon} />
              <p className={styles.uploadText}>
                {selectedFile ? selectedFile.name : 'Drop your garden photo here'}
              </p>
              <p className={styles.uploadSubtext}>
                or click to browse (JPG, PNG, GIF up to 10MB)
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className={styles.hiddenInput}
            />

            {/* Preview */}
            {previewUrl && (
              <div className={styles.preview}>
                <img
                  src={previewUrl}
                  alt="Garden preview"
                  className={styles.previewImage}
                />
              </div>
            )}

            {/* Garden Details */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Garden Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="e.g., Backyard Vegetable Garden"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Describe your garden..."
                rows={3}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={!selectedFile || !formData.name.trim()}
              >
                Create Garden
              </button>
              <button
                type="button"
                onClick={onCancel}
                className={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
