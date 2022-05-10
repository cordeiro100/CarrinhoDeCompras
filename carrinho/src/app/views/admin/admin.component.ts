import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Pedido } from 'src/app/models/pedido';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

public pedidos: Pedido[]
public oferta: Ofertas[]
pedido: any[]

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getCompra().subscribe((pedido: Pedido[])=>{
      this.pedidos = pedido
    })
  }

}
