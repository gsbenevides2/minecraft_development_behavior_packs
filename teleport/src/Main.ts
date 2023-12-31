/* eslint-disable @typescript-eslint/no-misused-promises */
import { world, system } from "@minecraft/server";

import { openTeleporterForm } from "./openTeleporterForm";

system.afterEvents.scriptEventReceive.subscribe(async (event) => {
  const id = event.id;
  if (id !== "gsbenevides2:open_tp_form") return;

  const playerNameTag = event.message;
  const player = world
    .getPlayers()
    .find((player) => player.nameTag === playerNameTag);
  if (player === undefined) return;
  await openTeleporterForm(player);
});
