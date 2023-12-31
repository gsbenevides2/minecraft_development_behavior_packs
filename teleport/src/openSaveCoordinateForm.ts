import { type Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { saveCoordinate } from "./db";

export async function openSaveCoordinateForm(player: Player): Promise<void> {
  const form = new ModalFormData();
  form.title("Salvar local");
  form.textField("Nome do Local:", "Digite o nome do local aqui");
  const response = await form.show(player);
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.formValues?.[0] != null) {
    const name = response.formValues[0] as string;
    const position = player.location;
    const { x, y, z } = position;
    const playerName = player.nameTag;
    saveCoordinate({
      name,
      x,
      y,
      z,
    })
      .then(() => {
        player.sendMessage(`§aLocal ${name} salvo com sucesso!`);
      })
      .catch((err) => {
        console.error(
          `Ocorreu um erro ao salvar uma coordenada, o player ${playerName} tentou salvar uma coordenada com nome ${name} com as posições ${x} ${y} ${z}. Mas a api resultou no erro:`,
        );
        console.error(err);
        player.sendMessage(`§cOcorreu um erro ao salvar o local ${name}!`);
      });
  }
}
