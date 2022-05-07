import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ofertas } from 'src/app/models/ofertas';
import { OfertaService } from 'src/app/services/oferta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})


export class OfertasComponent implements OnInit {

@Input() id: string

public oferta: Ofertas



  constructor(private route: ActivatedRoute, private ofertaService: OfertaService ) { }

  ngOnInit(): void {
    if(this.id)
    this.ofertaService.getOfertasById(this.id).subscribe(res =>{
      this.oferta = res
    })
     
    
  
  }
}
