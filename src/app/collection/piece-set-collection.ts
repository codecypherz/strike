import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Burrower } from "../model/machine/burrower";
import { Fireclaw } from "../model/machine/fireclaw";
import { Glinthawk } from "../model/machine/glinthawk";
import { Grazer } from "../model/machine/grazer";
import { Leaplasher } from "../model/machine/leaplasher";
import { Longleg } from "../model/machine/longleg";
import { Ravager } from "../model/machine/ravager";
import { RedeyeWatcher } from "../model/machine/redeye-watcher";
import { Rollerback } from "../model/machine/rollerback";
import { Skydrifter } from "../model/machine/skydrifter";
import { Slaughterspine } from "../model/machine/slaughterspine";
import { Slitherfang } from "../model/machine/slitherfang";
import { Snapmaw } from "../model/machine/snapmaw";
import { Stormbird } from "../model/machine/stormbird";
import { Thunderjaw } from "../model/machine/thunderjaw";
import { Tideripper } from "../model/machine/tideripper";
import { Widemaw } from "../model/machine/widemaw";
import { PieceSet } from "../model/piece-set";

@Injectable()
export class PieceSetCollection {

  constructor(
    @Optional() @SkipSelf() service: PieceSetCollection) {
    if (service) {
      throw new Error('Singleton violation: PieceSetCollection');
    }
  }

  createSet1(): PieceSet {
    const pieceSet = new PieceSet('Set 1');
    pieceSet.add(new Fireclaw());
    pieceSet.add(new Burrower());
    pieceSet.add(new Grazer());
    return pieceSet;
  }

  createSet2(): PieceSet {
    const pieceSet = new PieceSet('Set 2');
    pieceSet.add(new Glinthawk());
    pieceSet.add(new Ravager());
    pieceSet.add(new Ravager());
    return pieceSet;
  }

  createSet3(): PieceSet {
    const pieceSet = new PieceSet('Set 3');
    pieceSet.add(new Slitherfang());
    pieceSet.add(new Leaplasher());
    return pieceSet;
  }

  createSet4(): PieceSet {
    const pieceSet = new PieceSet('Set 4');
    pieceSet.add(new Longleg());
    pieceSet.add(new RedeyeWatcher());
    pieceSet.add(new Rollerback());
    return pieceSet;
  }

  createSet5(): PieceSet {
    const pieceSet = new PieceSet('Set 5');
    pieceSet.add(new Tideripper());
    pieceSet.add(new Widemaw());
    return pieceSet;
  }

  createSet6(): PieceSet {
    const pieceSet = new PieceSet('Set 6');
    pieceSet.add(new Thunderjaw());
    pieceSet.add(new Snapmaw());
    return pieceSet;
  }

  createSet7(): PieceSet {
    const pieceSet = new PieceSet('Set 7');
    pieceSet.add(new Stormbird());
    pieceSet.add(new Skydrifter());
    pieceSet.add(new Skydrifter());
    return pieceSet;
  }

  createSet8(): PieceSet {
    const pieceSet = new PieceSet('Set 8');
    pieceSet.add(new Slaughterspine());
    return pieceSet;
  }
}