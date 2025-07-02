import { useState } from 'react';
import type { PlantFormData } from '../types';
import { X } from 'lucide-react';
import styles from './PlantForm.module.css';

interface PlantFormProps {
  onSubmit: (data: PlantFormData) => void;
  onCancel: () => void;
  initialData?: PlantFormData;
}

const PlantForm: React.FC<PlantFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<PlantFormData>({
    name: initialData?.name || '',
    species: initialData?.species || '',
    variety: initialData?.variety || '',
    description: initialData?.description || '',
    notes: initialData?.notes || '',
    datePlanted: initialData?.datePlanted || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {initialData ? 'Edit Plant' : 'Add New Plant'}
          </h2>
          <button
            onClick={onCancel}
            className={styles.closeButton}
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="species" className={styles.label}>
              Species
            </label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="variety" className={styles.label}>
              Variety
            </label>
            <input
              type="text"
              id="variety"
              name="variety"
              value={formData.variety}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="datePlanted" className={styles.label}>
              Date Planted
            </label>
            <input
              type="date"
              id="datePlanted"
              name="datePlanted"
              value={formData.datePlanted}
              onChange={handleChange}
              className={styles.input}
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
              onChange={handleChange}
              rows={3}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className={styles.textarea}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.primaryButton}
            >
              {initialData ? 'Update Plant' : 'Add Plant'}
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
  );
};

export default PlantForm;
