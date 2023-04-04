import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Burrower } from "./machine/burrower";
import { Fireclaw } from "./machine/fireclaw";
import { Glinthawk } from "./machine/glinthawk";
import { Grazer } from "./machine/grazer";
import { Leaplasher } from "./machine/leaplasher";
import { Longleg } from "./machine/longleg";
import { Ravager } from "./machine/ravager";
import { RedeyeWatcher } from "./machine/redeye-watcher";
import { Rollerback } from "./machine/rollerback";
import { Skydrifter } from "./machine/skydrifter";
import { Slaughterspine } from "./machine/slaughterspine";
import { Slitherfang } from "./machine/slitherfang";
import { Snapmaw } from "./machine/snapmaw";
import { Stormbird } from "./machine/stormbird";
import { Thunderjaw } from "./machine/thunderjaw";
import { Tideripper } from "./machine/tideripper";
import { Widemaw } from "./machine/widemaw";
import { PieceSet } from "./piece-set";

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