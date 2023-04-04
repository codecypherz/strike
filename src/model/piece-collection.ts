import { Injectable, Optional, SkipSelf } from "@angular/core";
import { ApexClawstrider } from "./machine/apex-clawstrider";
import { Behemoth } from "./machine/behemoth";
import { Bellowback } from "./machine/bellowback";
import { Burrower } from "./machine/burrower";
import { Charger } from "./machine/charger";
import { Clamberjaw } from "./machine/clamberjaw";
import { Clawstrider } from "./machine/clawstrider";
import { Dreadwing } from "./machine/dreadwing";
import { ElementalClawstrider } from "./machine/elemental-clawstrider";
import { Fanghorn } from "./machine/fanghorn";
import { Fireclaw } from "./machine/fireclaw";
import { Frostclaw } from "./machine/frostclaw";
import { Glinthawk } from "./machine/glinthawk";
import { Grazer } from "./machine/grazer";
import { Lancehorn } from "./machine/lancehorn";
import { Leaplasher } from "./machine/leaplasher";
import { Longleg } from "./machine/longleg";
import { Plowhorn } from "./machine/plowhorn";
import { Ravager } from "./machine/ravager";
import { RedeyeWatcher } from "./machine/redeye-watcher";
import { Rockbreaker } from "./machine/rockbreaker";
import { Rollerback } from "./machine/rollerback";
import { Scorcher } from "./machine/scorcher";
import { Scrapper } from "./machine/scrapper";
import { Scrounger } from "./machine/scrounger";
import { ShellWalker } from "./machine/shell-walker";
import { Shellsnapper } from "./machine/shellsnapper";
import { Skydrifter } from "./machine/skydrifter";
import { Slaughterspine } from "./machine/slaughterspine";
import { Slitherfang } from "./machine/slitherfang";
import { Snapmaw } from "./machine/snapmaw";
import { Spikesnout } from "./machine/spikesnout";
import { Stalker } from "./machine/stalker";
import { Stormbird } from "./machine/stormbird";
import { Sunwing } from "./machine/sunwing";
import { Thunderjaw } from "./machine/thunderjaw";
import { Tideripper } from "./machine/tideripper";
import { TrackerBurrower } from "./machine/tracker-burrower";
import { Tremortusk } from "./machine/tremortusk";
import { Widemaw } from "./machine/widemaw";
import { PieceSet } from "./piece-set";

/**
 * This is the collection of all pieces in the game.
 */
@Injectable()
export class PieceCollection {

  constructor(
    @Optional() @SkipSelf() service: PieceCollection) {
    if (service) {
      throw new Error('Singleton violation: PieceCollection');
    }
  }

  createAllPieces(): PieceSet {
    const allPieces = new PieceSet();

    allPieces.add(new ApexClawstrider());
    allPieces.add(new Behemoth());
    allPieces.add(new Bellowback());
    allPieces.add(new Burrower());
    allPieces.add(new Charger());
    allPieces.add(new Clamberjaw());
    allPieces.add(new Clawstrider());
    allPieces.add(new Dreadwing());
    allPieces.add(new ElementalClawstrider());
    allPieces.add(new Fanghorn());
    allPieces.add(new Fireclaw());
    allPieces.add(new Frostclaw());
    allPieces.add(new Glinthawk());
    allPieces.add(new Grazer());
    allPieces.add(new Lancehorn());
    allPieces.add(new Leaplasher());
    allPieces.add(new Longleg());
    allPieces.add(new Plowhorn());
    allPieces.add(new Ravager());
    allPieces.add(new RedeyeWatcher());
    allPieces.add(new Rockbreaker());
    allPieces.add(new Rollerback());
    allPieces.add(new Scorcher());
    allPieces.add(new Scrapper());
    allPieces.add(new Scrounger());
    allPieces.add(new ShellWalker());
    allPieces.add(new Shellsnapper());
    allPieces.add(new Skydrifter());
    allPieces.add(new Slaughterspine());
    allPieces.add(new Slitherfang());
    allPieces.add(new Snapmaw());
    allPieces.add(new Spikesnout());
    allPieces.add(new Stalker());
    allPieces.add(new Stormbird());
    allPieces.add(new Sunwing());
    allPieces.add(new Thunderjaw());
    allPieces.add(new Tideripper());
    allPieces.add(new TrackerBurrower());
    allPieces.add(new Tremortusk());
    allPieces.add(new Widemaw());

    return allPieces;
  }
}