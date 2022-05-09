import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ofertas } from 'src/app/models/ofertas';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OfertaService } from 'src/app/services/oferta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],

})
export class OfertasComponent implements OnInit {
  @Input() id: string;

  public oferta: Ofertas;
  

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    private carrinhoService: CarrinhoService
  ) {}


  ngOnInit() {
    
     console.log(this.carrinhoService.exbibirItens())
    
    
    console.log(this.route.snapshot.params)
  this.id =  this.route.snapshot.params['id']; 
     
      this.getOferta()
  }
  


  getOferta(): void {

      this.ofertaService.getOfertasById(this.id).subscribe((res) => {
        this.oferta = res;
      });
    }
    adicionarItemCarrinho(){
      this.carrinhoService.incluirItem(this.oferta)
      
     console.log(this.carrinhoService.exbibirItens()) 
    
    }

  }

