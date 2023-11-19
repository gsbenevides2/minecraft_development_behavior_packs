import { type Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

export async function openTeleporterToPlayerForm(
  player: Player,
): Promise<void> {
  const playersNames = world.getAllPlayers().map((player) => player.name);
  if (playersNames.length === 0) {
    player.sendMessage("§cNão há jogadores online.");
    return;
  }

  const form = new ModalFormData();
  form.title("Teleportar para um jogador");
  form.dropdown("Escolha um jogador:", playersNames);

  const response = await form.show(player);
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.formValues?.[0] !== undefined) {
    const value = response.formValues[0] as number;
    const playerName = playersNames[value];
    const destPlayer = world
      .getAllPlayers()
      .find((player) => player.name === playerName);
    if (destPlayer == null) {
      player.sendMessage("§cJogador não encontrado.");
      return;
    }
    const destPlayerPos = player.location;
    player.teleport(destPlayerPos);
    player.sendMessage(`§aTeleportado para ${playerName}.`);
  }
}
