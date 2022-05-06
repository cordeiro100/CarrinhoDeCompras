import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { OrdemCompraComponent } from './views/ordem-compra/ordem-compra.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "ordem-compra", component: OrdemCompraComponent},
  {path: "ofertas", component: OfertasComponent},
  {path: "ofertas/:id", component: OfertasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
