import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalstoragetestComponent } from './localstoragetest/localstoragetest.component';


const routes: Routes = [

  {path:"",component:LocalstoragetestComponent},
  {path:"localstorage",component:LocalstoragetestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
