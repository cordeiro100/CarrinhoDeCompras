import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ofertas } from 'src/app/models/ofertas';
import { Pedido } from 'src/app/models/pedido';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
})
export class OrdemCompraComponent implements OnInit {
  endereco: string;
  numero: string;
  complemento: string;
  formaPagamento: string;
  compraForm: FormGroup;
  oferta: Ofertas[] = [];
  user$ = this.authService.currentUser$;
  constructor(
    private formBuilder: FormBuilder,
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.compraForm = this.formBuilder.group({
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      formaPagamento: ['', [Validators.required]],
    });

    this.oferta = this.carrinhoService.exibirItens();
  }

  comprar() {
    if (this.carrinhoService.exibirItens().length === 0) {
      this.alert();
      
    } else {
      const pedido = new Pedido(
        this.compraForm.value.endereco,
        this.compraForm.value.numero,
        this.compraForm.value.complemento,
        this.compraForm.value.formaPagamento,
        this.carrinhoService.exibirItens()
      );

      console.log(pedido);

      this.ordemCompraService
        .addPedido(pedido)
        .then(() => this.compraForm.reset());

      this.router.navigateByUrl('compraefetuada');
      this.carrinhoService.limparCarrinho();
    }
  }

  adicionar(oferta: Ofertas): void {
    this.carrinhoService.adicionarQuantidade(oferta);
  }

  subtrair(oferta: Ofertas): void {
    this.carrinhoService.subtrairQuantidade(oferta);
  }

  alert() {
    Swal.fire({
      title: 'Carrinho vazio',
      text: 'Você precisa adicionar um item no carrinho para finalizar a compra!',
      icon: 'error',

      cancelButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Adicione um produto');
        this.router.navigateByUrl('/');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
