import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewcamComponent } from './newcam/newcam.component';
import { OldcamComponent } from './oldcam/oldcam.component';

const routes: Routes = [
  {path:'gary', component: OldcamComponent},
  {path:'', component: NewcamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
