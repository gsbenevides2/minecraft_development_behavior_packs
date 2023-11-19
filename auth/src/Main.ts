import { world } from "@minecraft/server";
import { ApiFacade } from "./api";
import { type HttpError } from "@gsbenevides2/minecraft_http_server_client/dist/core/httpError";
function runCommandInAllDimensions(command: string): void {
  console.log(command);
  world.getDimension("overworld").runCommand(command);
  world.getDimension("nether").runCommand(command);
  world.getDimension("the_end").runCommand(command);
}

function kickPlayer(playerName: string, reason: string): void {
  runCommandInAllDimensions(`kick ${playerName} ${reason}`);
}

function sendMessageToPlayer(playerName: string, message: string): void {
  world.getAllPlayers().forEach((player) => {
    if (player.name !== playerName) return;
    player.sendMessage(message);
  });
}

world.afterEvents.playerJoin.subscribe((event) => {
  const api = new ApiFacade();
  api
    .getPlayer(event.playerName)
    .then(async ({ data }) => {
      if (data == null) {
        kickPlayer(
          event.playerName,
          "Ocorreu um erro ao tentar se autenticar, fale com um administrador. ERR: 1",
        );
      } else if (!data.isAllowed) {
        kickPlayer(
          event.playerName,
          "Você não está registrado no servidor, fale com um administrador para se registrar.",
        );
      } else if (data.isBanned) {
        kickPlayer(
          event.playerName,
          data.banReason?.length != null
            ? "Você foi banido, motivo: " + data.banReason
            : "Você foi banido.",
        );
      } else {
        const date = new Date(data.lastLogin);
        function send(): void {
          sendMessageToPlayer(
            event.playerName,
            `§aBem vindo de volta, ${
              event.playerName
            }! §7Último login: ${date.toLocaleString()}`,
          );
          world.afterEvents.playerSpawn.unsubscribe(send);
        }
        world.afterEvents.playerSpawn.subscribe(send);
      }

      await api.registerLogin({ username: event.playerName });
    })
    .catch(async (err: HttpError) => {
      if (err?.response.statusLine.statusCode === 404) {
        kickPlayer(
          event.playerName,
          "Você não está registrado no servidor, fale com um administrador para se registrar.",
        );
        await api.registerLogin({ username: event.playerName });
      } else {
        kickPlayer(
          event.playerName,
          "Ocorreu um erro ao tentar se autenticar, fale com um administrador. ERR: 2",
        );
      }
    });
});
