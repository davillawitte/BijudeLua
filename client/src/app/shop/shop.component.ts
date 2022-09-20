import { IType } from './../shared/models/productType';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
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
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
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
    this.shopParams.typeId = typeId;
    this.getProducts();
  }


  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }


}
