import { TerrainType } from "./Terrain";

function createTestChunk() {
  const chunk = Array(64)
    .fill(undefined)
    .map(() =>
      Array(64)
        .fill(undefined)
        .map(() => Array<TerrainType>(64).fill(0))
    );

  const y = 32;
  const r = 10;

  // Populate small ground area
  for (let x = -r; x <= r; x++) {
    for (let z = -r; z <= r; z++) {
      const distance = Math.sqrt(x ** 2 + z ** 2);

      if (distance <= r) {
        chunk[y][32 - x][32 - z] = 1;
      }
    }
  }

  // Add some water
  chunk[y][32][32] = 2;
  chunk[y][32][33] = 2;
  chunk[y][32][34] = 2;
  chunk[y][32][35] = 2;
  chunk[y][33][32] = 2;
  chunk[y][33][33] = 2;
  chunk[y][33][34] = 2;
  chunk[y][33][35] = 2;
  chunk[y][34][32] = 2;
  chunk[y][34][33] = 2;
  chunk[y][34][34] = 2;
  chunk[y][34][35] = 2;

  // Some raised ground
  chunk[y + 1][39][32] = 1;
  chunk[y + 1][39][33] = 1;
  chunk[y + 1][39][34] = 1;

  return chunk;
}

// Chunk is [Y, X, Z]
export default createTestChunk();
