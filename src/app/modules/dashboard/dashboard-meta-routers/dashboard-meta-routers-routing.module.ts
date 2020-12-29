import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { GrsAdminComponent } from '../grs-admin/grs-admin.component';
import { GrsDekitComponent } from '../grs-dekit/grs-dekit.component';
import { GrsGetdekitComponent } from '../grs-getdekit/grs-getdekit.component';
import { GrsLocationComponent } from '../grs-location/grs-location.component';
import { GrsGetRmaComponent } from '../grs-rma/grs-get-rma/grs-get-rma.component';
import { GrsReceiveRmaComponent } from '../grs-rma/grs-receive-rma/grs-receive-rma.component';
import { GrsWelcomeComponent } from '../grs-welcome/grs-welcome.component';
import { GbpTelstraDashboardComponent } from '../gbp-telstra-dashboard/gbp-telstra-dashboard.component'


export const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '', component: GrsWelcomeComponent
      },
      {
        path: 'dekit', component: GrsDekitComponent
      },
      {
        path: 'getdekit', component: GrsGetdekitComponent
      },
      {
        path: 'receiverma', component: GrsReceiveRmaComponent
      },
      {
        path: 'getrma', component: GrsGetRmaComponent
      },
      {
        path: 'admin', component: GrsAdminComponent
      },
      {
        path: 'location', component: GrsLocationComponent
      },
      {
        path: 'dashboardTable', component: GbpTelstraDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMetaRoutersRoutingModule { }
