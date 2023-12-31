/* eslint-disable @typescript-eslint/no-misused-promises */
import { world } from "@minecraft/server";
import { calculateIfBlockHasInArea } from "./calculateIfBlockHasInArea";

const mobs = [
  "creeper",
  "skeleton",
  "spider",
  "zombie",
  "witch",
  "enderman",
  "phantom",
];

const pos1 = {
  x: 1131,
  z: -61,
};

const pos2 = {
  x: 933,
  z: 175,
};

world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity } = event;
  const { location, dimension, typeId } = entity;
  const { x, z, y } = location;
  const { id: dimensionId } = dimension;
  const isMob = mobs.some((mob) => typeId.includes(mob));
  const inArea = calculateIfBlockHasInArea({
    block: { x, z },
    area: { pos1, pos2 },
  });
  const inOverworld = dimensionId.includes("overworld");
  console.log(
    "Entity Spawned: ",
    typeId,
    " at ",
    x,
    y,
    z,
    " in ",
    dimensionId,
    " inArea: ",
    inArea,
  );
  if (inArea && inOverworld && isMob) {
    entity.remove();
  }
});
