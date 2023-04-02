import { Component, OnDestroy } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.scss']
})
export class CustomGameComponent implements OnDestroy {
  
  constructor(private customGameService: CustomGameService) {}

  ngOnDestroy(): void {
    this.customGameService.exitSetup();
  }
}
