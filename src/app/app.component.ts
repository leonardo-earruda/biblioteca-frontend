import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') className = 'light-mode';

  constructor(private overlay: OverlayContainer) {
    overlay.getContainerElement().classList.add('light-mode');
  }

  ngOnInit(): void {
  }
}
