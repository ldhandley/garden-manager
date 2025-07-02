export interface Plant {
  id: string;
  gardenId: string;
  name: string;
  species: string;
  variety: string;
  description: string;
  notes: string;
  datePlanted: string;
  x: number; // Pin position X coordinate (percentage)
  y: number; // Pin position Y coordinate (percentage)
  createdAt: string;
  updatedAt: string;
}

export interface Garden {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlantFormData {
  name: string;
  species: string;
  variety: string;
  description: string;
  notes: string;
  datePlanted: string;
}
