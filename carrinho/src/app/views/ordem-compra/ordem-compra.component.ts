import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ofertas } from 'src/app/models/ofertas';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

endereco: string
numero: string
complemento: string
formaPagamento: string
compraForm: FormGroup
oferta: Ofertas[] = []

  constructor(private formBuilder: FormBuilder, private ordemCompraService: OrdemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.compraForm = this.formBuilder.group({
      endereco: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: ["", [Validators.required]],
      formaPagamento: ["",[Validators.required]]
    })

     this.oferta = this.carrinhoService.exibirItens()


    this.comprar()

  
  }


comprar(){
  this.ordemCompraService.addPedido(this.compraForm.value)
  .then(() => this.compraForm.reset())
}

adicionar(oferta: Ofertas): void{
  this.carrinhoService.adicionarQuantidade(oferta)
}

subtrair(oferta: Ofertas):void {
  this.carrinhoService.subtrairQuantidade(oferta)
}

}