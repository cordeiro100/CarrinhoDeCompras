import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './views/admin/admin.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { CompraefetuadaComponent } from './views/compraefetuada/compraefetuada.component';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { OrdemCompraComponent } from './views/ordem-compra/ordem-compra.component';

import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "ordem-compra", component: OrdemCompraComponent},
  {path: "ofertas", component: OfertasComponent},
  {path: "ofertas/:id", component: OfertasComponent},
  {path: "admin", component: AdminComponent},
  {path: "compraefetuada", component: CompraefetuadaComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
