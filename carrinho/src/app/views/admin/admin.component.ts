import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Pedido } from 'src/app/models/pedido';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public pedidos: Pedido[];
  public oferta: Ofertas[];
  pedido: any[];
  user$ = this.usersService.currentUserProfile$;
  constructor(
    private adminService: AdminService,
    private usersService: UsersService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.adminService.getCompra().subscribe((pedido: Pedido[]) => {
      this.pedidos = pedido;
    });
  }
}
