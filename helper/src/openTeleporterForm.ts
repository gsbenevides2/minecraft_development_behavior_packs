import { type Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { openTeleporterToPlayerForm } from "./openTeleporterToPlayerForm.";
import { openTeleporterToSavedCoordinateForm } from "./openTeleporterToSavedCoordinate";

export async function openTeleporterForm(player: Player): Promise<void> {
  const form = new ActionFormData();
  form.title("Teleportar");
  form.body("Escolha uma opção:");
  form.button("Teleportar para um local salvo", "textures/forms/save");
  form.button("Teleportar para um jogador", "textures/forms/friends");
  const response = await form.show(player);
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.selection === 0) {
    void openTeleporterToSavedCoordinateForm(player);
  } else if (response.selection === 1) {
    void openTeleporterToPlayerForm(player);
  }
}
