import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { Ofertas } from 'src/app/models/ofertas';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OfertaService } from 'src/app/services/oferta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertaService]

  
 
})
export class HomeComponent implements OnInit {
 public oferta:  Ofertas[]

  constructor(private ofertaService: OfertaService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
 //this.oferta = this.ofertaService.getOfertas()

 console.log("oferta", this.carrinhoService.exibirItens())

    this.ofertaService.getOfertas2().then((oferta: Ofertas[]) =>{
      this.oferta = oferta
    })

  }

  public adicionarItemCarrinho(): void{
    this.oferta
   
 
  }
}
