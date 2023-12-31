import { type Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { openTeleporterToPlayerForm } from "./openTeleporterToPlayerForm.";
import { openTeleporterToSavedCoordinateForm } from "./openTeleporterToSavedCoordinate";
import { openSaveCoordinateForm } from "./openSaveCoordinateForm";
import { openChangeCoordinateFormName } from "./openChangeCoordinateNameForm";

const Options = [
  {
    name: "Teleportar para um local salvo",
    icon: "textures/forms/save",
    callback: openTeleporterToSavedCoordinateForm,
  },
  {
    name: "Teleportar para um jogador",
    icon: "textures/forms/friends",
    callback: openTeleporterToPlayerForm,
  },
  {
    name: "Salvar local",
    icon: "textures/items/name_tag",
    callback: openSaveCoordinateForm,
  },
  {
    name: "Mudar nome de um local salvo",
    icon: "textures/forms/save",
    callback: openChangeCoordinateFormName,
  },
];

export async function openTeleporterForm(player: Player): Promise<void> {
  const form = new ActionFormData();
  form.title("Teleportar");
  form.body("Escolha uma opção:");

  for (const option of Options) {
    form.button(option.name, option.icon);
  }

  const response = await form.show(player);
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.selection !== undefined) {
    const option = Options[response.selection];
    await option.callback(player);
  }
}
