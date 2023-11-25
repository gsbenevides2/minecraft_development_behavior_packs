import { type Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { ApiFacade } from "./api";

export async function openChangeCoordinateFormName(
  player: Player,
): Promise<void> {
  const form = new ModalFormData();
  const api = new ApiFacade();
  form.title("Alterar nome de coordenada.");
  const { data: coordinates } = await api.listCoordinates();
  if (coordinates == null) {
    player.sendMessage(
      "§4Por algum motivo desconhecido ocorreu um erro ao recuperar as coordenadas",
    );
    return;
  }
  if (coordinates.length === 0) {
    player.sendMessage("§4Não existem coordenadas salvas");
    return;
  }
  form.dropdown(
    "Selecione a coordenada que deseja alterar o nome:",
    coordinates.map((coordinate) => coordinate.name),
  );
  form.textField(
    "Digite o novo nome da coordenada:",
    "Digite o novo nome da coordenada aqui",
  );
  const response = await form.show(player);
  const selectedCoordinate = coordinates[response.formValues?.[0] as number];
  const newName = response.formValues?.[1] as string;

  if (selectedCoordinate == null) {
    player.sendMessage("§4Você não selecionou uma coordenada válida");
    return;
  }
  if (newName == null) {
    player.sendMessage("§4Você não digitou um nome válido");
    return;
  }

  const { x, y, z } = selectedCoordinate;
  const playerName = player.nameTag;
  const oldName = selectedCoordinate.name;
  await api
    .updateCoordinate({
      id: selectedCoordinate.id,
      name: newName,
      x,
      y,
      z,
    })
    .then(() => {
      player.sendMessage(
        `§aNome da coordenada ${oldName} alterado com sucesso!`,
      );
    })
    .catch((err) => {
      console.error(
        `O player ${playerName} tentou alterar o nome da coordenada ${oldName} para ${newName} com as posições ${x} ${y} ${z}. Mas a api resultou no erro:`,
      );
      console.error(err);
      player.sendMessage(
        `§cOcorreu um erro ao alterar o nome da coordenada ${oldName}!`,
      );
    });
}
