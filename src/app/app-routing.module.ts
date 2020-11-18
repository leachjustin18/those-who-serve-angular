import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routes
import { HomeComponent } from './home/home.component';
import { ServantsComponent } from './servants/servants.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servants', component: ServantsComponent },
  { path: 'create-schedule', component: CreateScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
