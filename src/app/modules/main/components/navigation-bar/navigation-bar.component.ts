import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomDialogService } from 'src/app/core/services/custom-dialog.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  @HostBinding('class') className = 'light-mode';
  title = 'Gestão de Bibliotecas';
  darkThemeToggleControl = new FormControl(false);

  constructor(
    private router: Router,
    private overlay: OverlayContainer,
    private tokenService: TokenService,
    private dialogService: CustomDialogService
  ) {
    overlay.getContainerElement().classList.add('light-mode');
  }

  ngOnInit(): void {
    this._overlayToggleListen();
    this.changeDarkModeClass();
  }

  private _overlayToggleListen(): void {
    this.darkThemeToggleControl.valueChanges.subscribe((darkMode) => {
    });
  }

  public changeDarkModeClass(): void {
    const toggleDarkMode = this.darkThemeToggleControl.value;
    const darkClass = 'dark-mode';
    this.className = toggleDarkMode ? darkClass : 'light-mode';

    if (toggleDarkMode) {
      this.overlay.getContainerElement().classList.add(darkClass);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClass);
    }
  }

  public goTo(destino: String): void {
    this.router.navigate([destino]);
  }

  public deslogar(): void {
    this.dialogService.openConfirmDialog().subscribe((res) => {
      if (res) {
        this.tokenService.goBackToLoginScreen();
      }
    });
  }

  public goToWelcomePage(): void {
    this.router.navigate(['bem-vindo']);
  }
}
