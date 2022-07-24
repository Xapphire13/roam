import { TerrainType } from "./Terrain";

function createTestChunk() {
  const chunk = Array(256)
    .fill(undefined)
    .map(() =>
      Array(256)
        .fill(undefined)
        .map(() => Array<TerrainType>(256).fill(0))
    );

  const y = 128;
  const r = 10;

  // Populate small ground area
  for (let x = -r; x <= r; x++) {
    for (let z = -r; z <= r; z++) {
      const distance = Math.sqrt(x ** 2 + z ** 2);

      if (distance <= r) {
        chunk[y][128 - x][128 - z] = 1;
      }
    }
  }

  return chunk;
}

// Chunk is [Y, X, Z]
export default createTestChunk();
