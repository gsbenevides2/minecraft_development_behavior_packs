import { type Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { getCoordinates } from "./db";

export async function openTeleporterToSavedCoordinateForm(
  player: Player,
): Promise<void> {
  const coordinates = await getCoordinates();

  if (coordinates == null) {
    player.sendMessage("§cOcorreu um erro ao buscar os locais salvos.");
    return;
  }
  if (coordinates.length === 0) {
    player.sendMessage("§cNão há locais salvos.");
    return;
  }

  const form = new ModalFormData();
  form.title("Teleportar para um local salvo");
  form.dropdown(
    "Escolha um local:",
    coordinates.map((c) => c.name),
  );
  const response = await form.show(player);
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.formValues?.[0] !== undefined) {
    const value = response.formValues[0] as number;
    const coordinate = coordinates[value];
    player.teleport(coordinate);
    player.sendMessage(`§aTeleportado para ${coordinate.name}.`);
  }
}
