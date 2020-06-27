import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {TimeSlotListComponent} from './time-slot-list/time-slot-list.component';
import { TimeSlotDetailComponent } from './time-slot-detail/time-slot-detail.component';
import { TimeSlotEditComponent } from './time-slot-edit/time-slot-edit.component';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {TimeSlotResolverService} from './time-slot-resolver.service';
import {TimeSlotEditSlotComponent} from './time-slot-edit/time-slot-edit-slot.component';
import {TimeSlotEditClientComponent} from './time-slot-edit/time-slot-edit-client.component';
import {TimeSlotDetailClientComponent} from './time-slot-detail/time-slot-detail-client.component';
import {TimeSlotDetailSlotComponent} from './time-slot-detail/time-slot-detail-slot.component';



@NgModule({
  declarations: [
    TimeSlotListComponent,
    TimeSlotDetailComponent,
    TimeSlotEditComponent,
    TimeSlotEditSlotComponent,
    TimeSlotEditClientComponent,
    TimeSlotDetailClientComponent,
    TimeSlotDetailSlotComponent
  ],
    imports: [
        SharedModule,
        RouterModule.forChild([
          {
            path: 'timeSlots',
            children: [
              {
                path: '',
                component: TimeSlotListComponent
              },
              {
                path: ':id',
                component: TimeSlotDetailComponent,
                resolve: {resolvedData: TimeSlotResolverService},
                children: [
                  {
                    path: '',
                    redirectTo: 'slot',
                    pathMatch: 'full'
                  },
                  {
                    path: 'slot',
                    component: TimeSlotDetailSlotComponent
                  },
                  {
                    path: 'client',
                    component: TimeSlotDetailClientComponent
                  }
                ]
              },
              {
                path: ':id/edit',
                component: TimeSlotEditComponent,
                resolve: {resolvedData: TimeSlotResolverService},
                children: [
                  {
                    path: '',
                    redirectTo: 'slot',
                    pathMatch: 'full'
                  },
                  {
                    path: 'slot',
                    component: TimeSlotEditSlotComponent
                  },
                  {
                    path: 'client',
                    component: TimeSlotEditClientComponent
                  }
                ]
              }
            ]
          }
        ]),
        NgbDatepickerModule,
        NgbPaginationModule
    ]
})
export class TimeSlotModule { }
