import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataCreateComponent } from "./data-create/data-create.component";
import { DataListComponent } from "./data-list/data-list.component";

const routes: Routes = [
  { path:'', component: DataListComponent},
  { path:'create', component: DataCreateComponent},
  //{ path:'edit/:postId', component:DataCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
