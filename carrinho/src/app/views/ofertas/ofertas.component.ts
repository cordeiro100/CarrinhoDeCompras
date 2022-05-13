import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Ofertas } from 'src/app/models/ofertas';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  @Input() id: string;

  public oferta: Ofertas;
  number: any;
user$ = this.usersService.currentUserProfile$;
itemTotal: number

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    private carrinhoService: CarrinhoService,
    private toast: ToastrService,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router
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

  logOut(){
    this.authService.logout().subscribe(() =>{
      this.router.navigateByUrl("/")
    })

  }
}
