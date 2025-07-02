import { useState } from 'react';
import type { Garden, Plant } from '../types';
import styles from './GardenView.module.css';

interface GardenViewProps {
  garden: Garden;
  plants: Plant[];
  onAddPin: (x: number, y: number) => void;
}

const GardenView: React.FC<GardenViewProps> = ({ garden, plants, onAddPin }) => {
  const [hoveredPlant, setHoveredPlant] = useState<string | null>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    onAddPin(x, y);
  };

  return (
    <div className={styles.container}>
      {/* Debug info */}
      <div className={styles.debugInfo}>
        Plants: {plants.length}
      </div>
      
      <img
        src={garden.imageUrl}
        alt={garden.name}
        className={styles.image}
        onClick={handleImageClick}
        draggable={false}
      />
      
      {/* Instructions overlay */}
      <div className={styles.overlay}>
        <div className={styles.overlayText}>
          Click anywhere to add a plant
        </div>
      </div>

      {/* Plant pins */}
      {plants.map((plant) => (
        <div 
          key={plant.id} 
          className={styles.pinContainer}
          style={{
            left: `${plant.x}%`,
            top: `${plant.y}%`,
          }}
        >
          <div
            className={styles.pin}
            onMouseEnter={() => setHoveredPlant(plant.id)}
            onMouseLeave={() => setHoveredPlant(null)}
            title={`${plant.name} - Click for details`}
          >
            {/* Inner dot for better visibility */}
            <div className={styles.pinInner}></div>
          </div>
          
          {/* Tooltip */}
          {hoveredPlant === plant.id && (
            <div
              className={styles.tooltip}
              style={{
                left: `${plant.x}%`,
                top: `${plant.y}%`,
              }}
            >
              <div className={styles.tooltipName}>{plant.name}</div>
              <div className={styles.tooltipDetails}>
                {plant.species} {plant.variety && `- ${plant.variety}`}
              </div>
              {/* Tooltip arrow */}
              <div className={styles.tooltipArrow} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GardenView;

