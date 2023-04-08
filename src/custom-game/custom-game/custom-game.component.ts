import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomGameService } from 'src/custom-game/custom-game.service';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.scss']
})
export class CustomGameComponent implements OnInit, OnDestroy {
  
  constructor(private customGameService: CustomGameService) {}

  ngOnInit(): void {
    this.customGameService.startSetup();
  }

  ngOnDestroy(): void {
    this.customGameService.exitSetup();
  }
}
