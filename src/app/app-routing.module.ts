import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SorteosComponent } from './pages/sorteos/sorteos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sorteos/:id', component: SorteosComponent },


  { path: '**', redirectTo: '', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
