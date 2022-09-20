import { IType } from './../shared/models/productType';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  types: IType[];
  typeIdSelected = 0; //seleciona automaticamente o Id 0 - Home atualiza com "todos" selecionado
  sortSelected = 'name';
  sortOptions = [
    {name: 'Ordem Alfabética', value: 'name'},
    {name: 'Preço: Menor para o Maior', value: 'priceAsc'},
    {name: 'Preço: Maior para o Menor', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.typeIdSelected, this.sortSelected).subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response =>{
      //Faz o filtro do Shop component por modelos de produtos
      this.types = [{id:0, name:'Todos'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }


  onSortSelected(sort: string){
    this.sortSelected = sort;
    this.getProducts();
  }




}
