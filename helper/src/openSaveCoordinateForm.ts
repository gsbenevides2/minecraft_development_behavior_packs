import { type Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { ApiFacade } from "./api";

export async function openSaveCoordinateForm(player: Player): Promise<void> {
  const api = new ApiFacade();
  const form = new ModalFormData();
  form.title("Salvar local");
  form.textField("Nome do Local:", "Digite o nome do local aqui");
  const response = await form.show(player);
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.formValues?.[0] != null) {
    const name = response.formValues[0] as string;
    const position = player.location;
    api
      .createCoordinate({
        name,
        x: position.x,
        y: position.y,
        z: position.z,
      })
      .then(() => {
        player.sendMessage(`§aLocal ${name} salvo com sucesso!`);
      })
      .catch(() => {
        player.sendMessage(`§cOcorreu um erro ao salvar o local ${name}!`);
      });
  }
}
