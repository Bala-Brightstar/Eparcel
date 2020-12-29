import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMetaRoutersRoutingModule } from './dashboard-meta-routers-routing.module';
import { GrsButtonComponent } from 'src/app/shared-modules/components/grs-button/grs-button.component';
import { GrsDropdownComponent } from 'src/app/shared-modules/components/grs-dropdown/grs-dropdown.component';
import { GrsFormArrayInputsComponent } from 'src/app/shared-modules/components/grs-form-array-inputs/grs-form-array-inputs.component';
import { GrsInputComponent } from 'src/app/shared-modules/components/grs-input/grs-input.component';
import { GrsRadioComponent } from 'src/app/shared-modules/components/grs-radio/grs-radio.component';
import { DashboardComponent } from '../dashboard.component';
import { GrsAdminComponent } from '../grs-admin/grs-admin.component';
import { GrsDekitComponent } from '../grs-dekit/grs-dekit.component';
import { GrsWelcomeComponent } from '../grs-welcome/grs-welcome.component';
import { CommonMaterialModule } from 'src/app/app.materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrsTextareaComponent } from 'src/app/shared-modules/components/grs-textarea/grs-textarea.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GrsCheckboxComponent } from 'src/app/shared-modules/components/grs-checkbox/grs-checkbox.component';
import { GrsProgressBarComponent } from 'src/app/shared-modules/components/grs-progress-bar/grs-progress-bar.component';
import { GrsGroupInputComponent } from 'src/app/shared-modules/components/grs-group-input/grs-group-input.component';
import { GrsInputOldComponent } from 'src/app/shared-modules/components/grs-input-old/grs-input-old.component';
import { GrsGetdekitComponent } from '../grs-getdekit/grs-getdekit.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavItemListComponent } from '../sidenav/sidenav-item-list/sidenav-item-list.component';
import { GrsGetRmaComponent } from '../grs-rma/grs-get-rma/grs-get-rma.component';
import { GrsReceiveRmaComponent } from '../grs-rma/grs-receive-rma/grs-receive-rma.component';
import { GrsHandsetAttributesComponent } from '../grs-rma/grs-receive-rma/grs-handset-attributes/grs-handset-attributes.component';
import { MenuComponent } from '../menu/menu.component';
import { GrsAutoCompleteComponent } from 'src/app/shared-modules/components/grs-auto-complete/grs-auto-complete.component';
import { LogoutDialogComponent } from '../menu/logout-dialog/logout-dialog.component';
import { GrsLocationComponent } from '../grs-location/grs-location.component';
import { GrsAlertsComponent } from 'src/app/shared-modules/components/grs-alerts/grs-alerts.component';
import { GbpTelstraDashboardComponent } from '../gbp-telstra-dashboard/gbp-telstra-dashboard.component'

@NgModule({
  declarations: [
    DashboardComponent,
    GrsAdminComponent,
    GrsAdminComponent,
    GrsWelcomeComponent,
    GrsDekitComponent,
    GrsButtonComponent,
    GrsInputComponent,
    GrsRadioComponent,
    GrsDropdownComponent,
    GrsFormArrayInputsComponent,
    GrsTextareaComponent,
    GrsGroupInputComponent,
    GrsProgressBarComponent,
    GrsCheckboxComponent,
    GrsGetdekitComponent,
    GrsInputOldComponent,
    SidenavComponent,
    SidenavItemListComponent,
    GrsGetRmaComponent,
    GrsReceiveRmaComponent,
    GrsHandsetAttributesComponent,
    MenuComponent,
    GrsAutoCompleteComponent,
    LogoutDialogComponent,
    GrsLocationComponent,
    GrsAlertsComponent,
    GbpTelstraDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardMetaRoutersRoutingModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [GrsInputComponent, GrsDropdownComponent, GrsRadioComponent, GrsGroupInputComponent, GrsButtonComponent,
    GrsProgressBarComponent, GrsCheckboxComponent, GrsHandsetAttributesComponent, LogoutDialogComponent]
})
export class DashboardMetaRoutersModule { }
