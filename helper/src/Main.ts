/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Player, world, system } from "@minecraft/server";
import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";

import { openTeleporterForm } from "./openTeleporterForm";
import { openTimeSetForm } from "./openTimeSetForm";
import { openWeatherSet } from "./openWeatherSet";

interface Option {
  name: string;
  icon: string;
  callback: (player: Player) => void;
}

const Options: Option[] = [
  {
    name: "Teleportar",
    icon: "textures/items/compass_item",
    callback: openTeleporterForm,
  },
  {
    name: "Mudar hora",
    icon: "textures/items/clock_item",
    callback: openTimeSetForm,
  },
  {
    name: "Mudar clima",
    icon: "textures/forms/weather",
    callback: openWeatherSet,
  },
];

async function openHelperForm(player: Player): Promise<void> {
  player.sendMessage("§aAbrindo menu de ajudante... Por favor, saia do chat.");
  const form = new ActionFormData();
  form.title("Ajudante");
  form.body("Escolha uma opção:");
  for (const option of Options) {
    form.button(option.name, option.icon);
  }
  async function openForm(): Promise<void> {
    const response = await form.show(player);
    if (
      response.canceled &&
      response.cancelationReason === FormCancelationReason.UserBusy
    ) {
      system.run(openForm);
    } else if (response.canceled) {
      player.sendMessage("§cVocê fechou o menu de ajudante.");
    } else if (response.selection !== undefined) {
      const option = Options[response.selection];
      option.callback(player);
    }
  }

  system.run(openForm);
}

world.beforeEvents.chatSend.subscribe((event) => {
  const message = event.message;
  if (message === "!helper") {
    // event.cancel = true;
  }
});
world.afterEvents.chatSend.subscribe((event) => {
  const message = event.message;
  if (message === "!helper") {
    openHelperForm(event.sender).catch((error) => {
      console.error(error);
      event.sender.sendMessage(
        "§cOcorreu um erro ao abrir o menu de ajudante.",
      );
    });
  }
});
