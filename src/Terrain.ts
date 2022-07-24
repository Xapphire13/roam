import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Scene,
  Vector3,
} from "three";

export const TerrainTypes = {
  none: 0,
  grass: 1,
} as const;

export type TerrainType = typeof TerrainTypes[keyof typeof TerrainTypes];

const geometry = new BoxGeometry(1, 1, 1);

export default class Terrain {
  readonly type: TerrainType;

  private cube?: Mesh;

  private lines?: Object3D;

  constructor(type: TerrainType, position: Vector3) {
    this.type = type;

    if (this.type !== TerrainTypes.none) {
      const material = this.getMaterial();
      const edges = new EdgesGeometry(geometry);
      this.cube = new Mesh(geometry, material);
      this.lines = new LineSegments(
        edges,
        new LineBasicMaterial({ color: 0xffffff })
      );

      this.cube.position.set(position.x, position.y, position.z);
      this.lines.position.set(position.x, position.y, position.z);
    }
  }

  addToScene(scene: Scene) {
    if (this.cube && this.lines) {
      scene.add(this.cube, this.lines);
    }
  }

  private getMaterial() {
    switch (this.type) {
      case TerrainTypes.grass:
        return new MeshStandardMaterial({ color: 0x00ff00 });
      default:
        return undefined;
    }
  }
}
