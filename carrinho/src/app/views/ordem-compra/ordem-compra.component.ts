import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ofertas } from 'src/app/models/ofertas';
import { Pedido } from 'src/app/models/pedido';
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

  constructor(private formBuilder: FormBuilder, private ordemCompraService: OrdemCompraService, public carrinhoService: CarrinhoService, private router: Router) { }

  ngOnInit(): void {
    this.compraForm = this.formBuilder.group({
      endereco: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: ["", [Validators.required]],
      formaPagamento: ["",[Validators.required]]

    
    })



     this.oferta = this.carrinhoService.exibirItens()




  
  }

 



comprar(){

if(this.carrinhoService.exibirItens().length === 0 ) {
  alert("Você nao adicionou nenhum produto ao carrinho")
}

const pedido = new Pedido(
  this.compraForm.value.endereco,
  this.compraForm.value.numero,
  this.compraForm.value.complemento,
  this.compraForm.value.formaPagamento,
  this.carrinhoService.exibirItens()
)

console.log(pedido)

  
this.ordemCompraService.addPedido(pedido)
.then(() => this.compraForm.reset())

this.router.navigateByUrl("admin")
this.carrinhoService.limparCarrinho()

}

adicionar(oferta: Ofertas): void{
  this.carrinhoService.adicionarQuantidade(oferta)
}

subtrair(oferta: Ofertas):void {
  this.carrinhoService.subtrairQuantidade(oferta)
}

}