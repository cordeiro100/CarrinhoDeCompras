import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';


import { Ofertas } from 'src/app/models/ofertas';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { UsersService } from 'src/app/services/users.service';

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

 itemTotal: number;
user$ = this.usersService.currentUserProfile$;

  constructor(private ofertaService: OfertaService, private carrinhoService: CarrinhoService, public authService: AuthenticationService, private router: Router, private usersService: UsersService) { }

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
