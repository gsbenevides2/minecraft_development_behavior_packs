import { type Player, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

export async function openTimeSetForm(player: Player): Promise<void> {
  const form = new ActionFormData();
  form.title("Mudar hora");
  form.body("Escolha uma opção:");
  form.button("Manhã", "textures/forms/manha");
  form.button("Meio-dia", "textures/forms/meio_dia");
  form.button("Tarde", "textures/forms/tarde");
  form.button("Noite", "textures/forms/noite");

  const response = await form.show(player);
  const times = [0, 6000, 12000, 18000];
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.selection !== undefined) {
    world
      .getDimension("overworld")
      .runCommand(`time set ${times[response.selection]}`);
  }
}
