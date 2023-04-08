import { Injectable, Optional, SkipSelf } from "@angular/core";
import { ApexClawstrider } from "../model/machine/apex-clawstrider";
import { Behemoth } from "../model/machine/behemoth";
import { Bellowback } from "../model/machine/bellowback";
import { Burrower } from "../model/machine/burrower";
import { Charger } from "../model/machine/charger";
import { Clamberjaw } from "../model/machine/clamberjaw";
import { Clawstrider } from "../model/machine/clawstrider";
import { Dreadwing } from "../model/machine/dreadwing";
import { ElementalClawstrider } from "../model/machine/elemental-clawstrider";
import { Fanghorn } from "../model/machine/fanghorn";
import { Fireclaw } from "../model/machine/fireclaw";
import { Frostclaw } from "../model/machine/frostclaw";
import { Glinthawk } from "../model/machine/glinthawk";
import { Grazer } from "../model/machine/grazer";
import { Lancehorn } from "../model/machine/lancehorn";
import { Leaplasher } from "../model/machine/leaplasher";
import { Longleg } from "../model/machine/longleg";
import { Plowhorn } from "../model/machine/plowhorn";
import { Ravager } from "../model/machine/ravager";
import { RedeyeWatcher } from "../model/machine/redeye-watcher";
import { Rockbreaker } from "../model/machine/rockbreaker";
import { Rollerback } from "../model/machine/rollerback";
import { Scorcher } from "../model/machine/scorcher";
import { Scrapper } from "../model/machine/scrapper";
import { Scrounger } from "../model/machine/scrounger";
import { ShellWalker } from "../model/machine/shell-walker";
import { Shellsnapper } from "../model/machine/shellsnapper";
import { Skydrifter } from "../model/machine/skydrifter";
import { Slaughterspine } from "../model/machine/slaughterspine";
import { Slitherfang } from "../model/machine/slitherfang";
import { Snapmaw } from "../model/machine/snapmaw";
import { Spikesnout } from "../model/machine/spikesnout";
import { Stalker } from "../model/machine/stalker";
import { Stormbird } from "../model/machine/stormbird";
import { Sunwing } from "../model/machine/sunwing";
import { Thunderjaw } from "../model/machine/thunderjaw";
import { Tideripper } from "../model/machine/tideripper";
import { TrackerBurrower } from "../model/machine/tracker-burrower";
import { Tremortusk } from "../model/machine/tremortusk";
import { Widemaw } from "../model/machine/widemaw";
import { PieceSet } from "../model/piece-set";

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