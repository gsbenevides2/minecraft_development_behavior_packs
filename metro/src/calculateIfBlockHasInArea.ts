interface Params {
    block: {
        x: number;
        z: number;
    };
    area: {
        pos1: {
            x: number;
            z: number;
        };
        pos2: {
            x: number;
            z: number;
        };
    };
}

export function calculateIfBlockHasInArea({ block, area }: Params): boolean {
    const { x, z } = block;
    const { pos1, pos2 } = area;

    const minX = Math.min(pos1.x, pos2.x);
    const maxX = Math.max(pos1.x, pos2.x);
    const minZ = Math.min(pos1.z, pos2.z);
    const maxZ = Math.max(pos1.z, pos2.z);

    return x >= minX && x <= maxX && z >= minZ && z <= maxZ;
}
