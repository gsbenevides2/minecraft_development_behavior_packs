import { type Player, world } from "@minecraft/server";

export async function openTeleporterForm(player: Player): Promise<void> {
  await world
    .getDimension("overworld")
    .runCommandAsync("scriptevent gsbenevides2:open_tp_form " + player.nameTag);
}
