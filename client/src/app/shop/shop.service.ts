import { ShopParams } from './../shared/models/shopParams';
import { IPagination } from '../shared/models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IType } from '../shared/models/productType';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if (shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

      params = params.append('sort', shopParams.sort);
      params = params.append('pageIndex', shopParams.pageNumber.toString());
      params = params.append('pageIndex', shopParams.pageSize.toString())
    
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

}
