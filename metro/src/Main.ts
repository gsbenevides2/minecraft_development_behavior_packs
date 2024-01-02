import { ItemStack, system, world } from "@minecraft/server";
import {
  Announcement,
  AnnouncementOperationalCategory,
  AnnouncementType,
  AnouncementOperationLineWay,
} from "./typePaCodeMaker";
import db from "./db.json";

const eventSubnameMap = {
  station_enter: (args: string[]) => {
    const [playerNameTag, stationId] = args;
    const ann = new Announcement(AnnouncementType.OPERATIONAL);
    ann.operationalStation = stationId;
    ann.operationalCategory = AnnouncementOperationalCategory.WELCOME_STATION;
    const code = ann.code;
    const findedPa = db.announcements.find((pa) => pa.code === code);
    const player = world
      .getPlayers()
      .find((p) => p.nameTag.toLowerCase() === playerNameTag.toLowerCase());
    if (player == null || findedPa == null) return;

    player.sendMessage(findedPa.text);
    player.playSound("voice.metro." + code);

    const inventory = player.getComponent("minecraft:inventory")?.container;
    if (inventory == null) return;

    const size = inventory.size;
    for (let i = 0; i < size; i++) {
      const item = inventory?.getItem(i);
      if (item?.nameTag === "Minecart Espacial") {
        inventory.setItem(i, undefined);
      }
    }

    const item = new ItemStack("minecraft:minecart", 1);
    item.nameTag = "Minecart Espacial";
    player.getComponent("minecraft:inventory")?.container?.addItem(item);
  },
  station_leave: (args: string[]) => {
    const [playerNameTag] = args;

    const player = world
      .getPlayers()
      .find((p) => p.nameTag.toLowerCase() === playerNameTag.toLowerCase());

    if (player == null) return;

    const inventory = player.getComponent("minecraft:inventory")?.container;
    if (inventory == null) return;
    const size = inventory.size;

    for (let i = 0; i < size; i++) {
      const item = inventory?.getItem(i);
      if (item?.nameTag === "Minecart Espacial") {
        inventory.setItem(i, undefined);
      }
    }
    const pa = db.announcements.find((pa) => pa.code === "00169344");
    if (pa == null) return;
    player.sendMessage(pa.text);
    player.playSound("voice.metro." + pa.code);
  },
  line_station_next: (args: string[]) => {
    const [playerNameTag, nextStation, lineId] = args;
    const ann = new Announcement(AnnouncementType.OPERATIONAL);
    ann.operationalStation = nextStation;
    ann.operationalCategory = AnnouncementOperationalCategory.NEXT_STATION;
    ann.operationalLine = Number(lineId);
    const code = ann.code;
    const findedPa = db.announcements.find((pa) => pa.code === code);
    const player = world
      .getPlayers()
      .find((p) => p.nameTag.toLowerCase() === playerNameTag.toLowerCase());
    if (player == null || findedPa == null) return;
    player.sendMessage(findedPa.text);
    player.playSound("voice.metro." + code);
  },
  line_station_comming: (args: string[]) => {
    const [playerNameTag, stationId, lineId, lineWay] = args;
    const ann = new Announcement(AnnouncementType.OPERATIONAL);
    ann.operationalStation = stationId;
    ann.operationalCategory = AnnouncementOperationalCategory.COMING_STATION;
    ann.operationalLine = Number(lineId);
    ann.operationalLineWay =
      lineWay === "1"
        ? AnouncementOperationLineWay.IDA
        : AnouncementOperationLineWay.VOLTA;
    const code = ann.code;
    const findedPa = db.announcements.find((pa) => pa.code === code);
    const player = world
      .getPlayers()
      .find((p) => p.nameTag.toLowerCase() === playerNameTag.toLowerCase());
    if (player == null || findedPa == null) return;
    player.sendMessage(findedPa.text);
    player.playSound("voice.metro." + code);
  },
  intitucional: (args: string[]) => {
    const [playerNameTag] = args;
    const findedPa = db.announcements.filter(
      (pa) => pa.type === AnnouncementType.INSTITUCIONAL,
    );
    const player = world
      .getPlayers()
      .find((p) => p.nameTag.toLowerCase() === playerNameTag.toLowerCase());

    if (player == null || findedPa == null) return;

    const randomIndex = Math.floor(Math.random() * findedPa.length);
    const randomPa = findedPa[randomIndex];
    player.sendMessage(randomPa.text);
    player.playSound("voice.metro." + randomPa.code);
  },
};

system.afterEvents.scriptEventReceive.subscribe((eventData) => {
  const data = eventData.id + ":" + eventData.message;
  console.log("ScriptEventReceive: " + data);
  const [author, name, subname, ...args] = data.split(":");
  if (author !== "gsbenevides" && name !== "metro") return;
  eventSubnameMap[subname](args);
});

// scriptevent gsbenevides:metro station_enter:gsbenevides2:CMT
// scriptevent gsbenevides:metro station_leave:gsbenevides2
// scriptevent gsbenevides:metro line_station_next:gsbenevides2:VQD:1
// scriptevent gsbenevides:metro line_station_comming:gsbenevides2:VQD:1:2
// scriptevent gsbenevides:metro station_enter:@:CMT
