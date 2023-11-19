/* eslint-disable @typescript-eslint/no-misused-promises */
import { world } from "@minecraft/server";
import { calculateIfBlockHasInArea } from "./calculateIfBlockHasInArea";

const mobs = ["creeper", "skeleton", "spider", "zombie", "witch", "enderman"];

const pos1 = {
  x: 1131,
  z: -61,
};

const pos2 = {
  x: 967,
  z: 140,
};

world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity } = event;
  const { location, dimension, typeId } = entity;
  const { x, z } = location;
  const { id: dimensionId } = dimension;
  const isMob = mobs.some((mob) => typeId.includes(mob));
  const inArea = calculateIfBlockHasInArea({
    block: { x, z },
    area: { pos1, pos2 },
  });
  const inOverworld = dimensionId.includes("overworld");
  console.log("inArea", inArea);
  console.log("inOverworld", inOverworld, dimensionId);
  console.log("isMob", isMob, typeId);

  if (inArea && inOverworld && isMob) {
    entity.remove();
  }
});
