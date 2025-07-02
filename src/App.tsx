import { useState } from 'react';
import type { Garden, Plant, PlantFormData } from './types';
import GardenView from './components/GardenView';
import PlantForm from './components/PlantForm';
import { Upload, Leaf } from 'lucide-react';
import styles from './App.module.css';

// Mock data for demonstration
const mockGarden: Garden = {
  id: '1',
  name: 'My Garden',
  description: 'My beautiful backyard garden',
  imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

function App() {
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: '1',
      gardenId: '1',
      name: 'Cherry Tomatoes',
      species: 'Solanum lycopersicum',
      variety: 'Cherry',
      description: 'Sweet cherry tomatoes for salads',
      notes: 'Need regular watering',
      datePlanted: '2024-06-01',
      x: 25,
      y: 30,
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: '2024-06-01T00:00:00Z',
    },
    {
      id: '2',
      gardenId: '1',
      name: 'Basil',
      species: 'Ocimum basilicum',
      variety: 'Sweet Basil',
      description: 'Fresh herbs for cooking',
      notes: 'Pinch flowers to keep leaves tender',
      datePlanted: '2024-06-15',
      x: 70,
      y: 45,
      createdAt: '2024-06-15T00:00:00Z',
      updatedAt: '2024-06-15T00:00:00Z',
    },
    {
      id: '3',
      gardenId: '1',
      name: 'Sunflower',
      species: 'Helianthus annuus',
      variety: 'Mammoth',
      description: 'Giant sunflower for the back border',
      notes: 'Will grow very tall, needs support',
      datePlanted: '2024-05-20',
      x: 45,
      y: 70,
      createdAt: '2024-05-20T00:00:00Z',
      updatedAt: '2024-05-20T00:00:00Z',
    },
  ]);
  const [showPlantForm, setShowPlantForm] = useState(false);
  const [pendingPin, setPendingPin] = useState<{ x: number; y: number } | null>(null);
  const [selectedGarden] = useState<Garden>(mockGarden);

  const handleAddPin = (x: number, y: number) => {
    setPendingPin({ x, y });
    setShowPlantForm(true);
  };

  const handlePlantSubmit = (formData: PlantFormData) => {
    if (pendingPin) {
      const newPlant: Plant = {
        id: Date.now().toString(),
        gardenId: selectedGarden.id,
        ...formData,
        x: pendingPin.x,
        y: pendingPin.y,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPlants(prev => [...prev, newPlant]);
    }
    setShowPlantForm(false);
    setPendingPin(null);
  };

  const handleFormCancel = () => {
    setShowPlantForm(false);
    setPendingPin(null);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Leaf className={styles.headerIcon} />
              <h1 className={styles.headerTitle}>Garden Manager</h1>
            </div>
            <button className={styles.uploadButton}>
              <Upload size={16} />
              <span>Upload Garden</span>
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.gardenInfo}>
          <h2 className={styles.gardenTitle}>{selectedGarden.name}</h2>
          <p className={styles.gardenDescription}>{selectedGarden.description}</p>
          <div className={styles.gardenStats}>
            <span>Plants: {plants.length}</span>
            <span>•</span>
            <span>Click on the image to add plants</span>
          </div>
        </div>

        <div className={styles.gardenContainer}>
          <GardenView
            garden={selectedGarden}
            plants={plants}
            onAddPin={handleAddPin}
          />
        </div>

        {plants.length > 0 && (
          <div className={styles.plantsSection}>
            <h3 className={styles.plantsTitle}>Plants in this garden</h3>
            <div className={styles.plantsGrid}>
              {plants.map((plant) => (
                <div key={plant.id} className={styles.plantCard}>
                  <h4 className={styles.plantName}>{plant.name}</h4>
                  <p className={styles.plantSpecies}>{plant.species} {plant.variety && `- ${plant.variety}`}</p>
                  <p className={styles.plantDate}>Planted: {new Date(plant.datePlanted).toLocaleDateString()}</p>
                  {plant.description && (
                    <p className={styles.plantDescription}>{plant.description}</p>
                  )}
                  {plant.notes && (
                    <p className={styles.plantNotes}>{plant.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showPlantForm && (
        <PlantForm
          onSubmit={handlePlantSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default App;
