import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { Filter } from 'src/app/models/filter';

import { Ofertas } from 'src/app/models/ofertas';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OfertaService } from 'src/app/services/oferta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertaService]
}


)
export class HomeComponent implements OnInit {
 public oferta:  Ofertas[]

 ofertas: any[]
 user$ = this.authService.currentUser$;
 itemTotal: number;


  constructor(private ofertaService: OfertaService, private carrinhoService: CarrinhoService, public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
console.log("Oninit")
this.carrinhoService.getTotalItens().subscribe(res =>{
  console.log("Estou aqui", res)
  this.itemTotal = res
})

    this.ofertaService.getOfertas().subscribe((oferta: Ofertas[]) =>{
      this.oferta = oferta 
    })



  }
logOut(){
  this.authService.logout().subscribe(() =>{
    this.router.navigateByUrl("/")
  })
}




}
