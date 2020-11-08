import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routes
import { HomeComponent } from './home/home.component';
import { ServantsComponent } from './servants/servants.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servants', component: ServantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
