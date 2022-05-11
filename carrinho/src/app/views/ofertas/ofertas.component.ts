import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Ofertas } from 'src/app/models/ofertas';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  @Input() id: string;

  public oferta: Ofertas;
  number: any;

itemTotal: number

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    private carrinhoService: CarrinhoService,
    private toast: ToastrService
  ) {}

  ngOnInit() {

    console.log("Oninit")
    this.carrinhoService.getTotalItens().subscribe(res =>{
      console.log("Estou aqui", res)
      this.itemTotal = res
    })






    console.log(this.carrinhoService.exibirItens());

    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params['id'];

    this.getOferta();
  }



  getOferta(): void {
    this.ofertaService.getOfertasById(this.id).subscribe((res) => {
      this.oferta = res;
    });
  }
  adicionarItemCarrinho() {
   this.toast.success("Item adionado no seu carrinho");
   this.carrinhoService.incluirItem(this.oferta);
  
  
  
    console.log(this.carrinhoService.exibirItens());
  }




}
