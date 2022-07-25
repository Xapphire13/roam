export const TerrainTypes = {
  none: 0,
  grass: 1,
  water: 2,
} as const;

export type TerrainType = typeof TerrainTypes[keyof typeof TerrainTypes];
