import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, OnDestroy, VERSION } from '@angular/core';
import * as screenfull from 'screenfull';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { env } from '../../../../environments/environment';
import { version } from '../../../../../package.json';
import { baseloader } from '../../../../assets/base-loaders/base.json';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  buildVersion = 'N/A';
  isExpanded = true;
  isHalfCollapsed = false;
  mainMenu: string;
  defaultNavigationIcon: string;
  navigationIconClass = 'navigationIconContainer';
  logo: string;
  baseLoader;
  public collapsedNav: boolean;
  public mobileQuery: MediaQueryList;
  public version = VERSION;
  private mobileQueryListener: () => void;
  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthStateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', () => {
      this.mobileQueryListener();
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', () => {
      this.mobileQueryListener();
    });
  }

  public toggleFullscreen() {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }
  ngOnInit() {
    this.baseLoader = baseloader;
    this.mainMenu = baseloader.sidenav.expandedMenuName;
    this.defaultNavigationIcon = baseloader.sidenav.showCollapsedMenuIcon;
    this.logo = baseloader.sidenav.brightstarLogo;
    this.getBuildVersion();
  }

  getBuildVersion() {
    let buildId = env.buildid;
    if (buildId.match('BUILD_BUILDID')) {
      buildId = 'local';
    }
    if (this.isExpanded) {
      this.buildVersion = 'build: ' + version + '-' + buildId + '-' + env.envid;
    } else {
      this.buildVersion = env.envid;
    }
  }

  toggleSideNav() {
    if (this.isExpanded) {
      this.logo = baseloader.sidenav.shortBrightstarLogo;
      this.defaultNavigationIcon = baseloader.sidenav.showexpandedMenuIcon;
      this.isHalfCollapsed = true;
      this.isExpanded = false;
      this.navigationIconClass = 'navigationIconContainer-collapsed';
      this.mainMenu = baseloader.sidenav.shortMenuName;
      this.getBuildVersion();
    } else {
      this.logo = baseloader.sidenav.brightstarLogo;
      this.defaultNavigationIcon = baseloader.sidenav.showCollapsedMenuIcon;
      this.isHalfCollapsed = false;
      this.isExpanded = true;
      this.navigationIconClass = 'navigationIconContainer';
      setTimeout(() => {
        this.mainMenu = baseloader.sidenav.expandedMenuName;
        this.getBuildVersion();
      }, 50);
    }
  }

}
