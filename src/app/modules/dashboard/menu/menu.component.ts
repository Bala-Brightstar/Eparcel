import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import screenfull from 'screenfull';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public collapsedNav: boolean;
  public mobileQuery: MediaQueryList;
  previousUrl;
  upper;
  username = 'N/A';
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(private router: Router,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private auth: AuthStateService,
              public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
        this.upper = this.previousUrl.charAt(1).toUpperCase() + this.previousUrl.substring(2);
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // tslint:disable-next-line: typedef
  public toggleFullscreen() {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }

  ngOnInit() {
    this.username = this.auth.getFirstname() + ' ' + this.auth.getLastname();
  }

  signout() {
    this.auth.signOut();
  }
  openLogoutDialog() {
    this.dialog.open(LogoutDialogComponent, {
    });
  }

}
