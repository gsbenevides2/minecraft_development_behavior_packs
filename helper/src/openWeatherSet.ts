import { type Player, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

export async function openWeatherSet(player: Player): Promise<void> {
  const form = new ActionFormData();
  form.title("Mudar hora");
  form.body("Escolha uma opção:");
  form.button("Limpo", "textures/forms/limpo");
  form.button("Chuvoso", "textures/forms/chuvoso");
  form.button("Trovoada", "textures/forms/trovoada");

  const response = await form.show(player);
  const ptBr = ["limpo", "chuvoso", "trovoada"];
  const weather = ["clear", "rain", "thunder"];
  if (response.canceled) {
    player.sendMessage("§cVocê fechou o menu de ajudante.");
  } else if (response.selection !== undefined) {
    world
      .getDimension("overworld")
      .runCommand(`weather ${weather[response.selection]}`);
    player.sendMessage(`§aClima alterado para ${ptBr[response.selection]}.`);
  }
}
