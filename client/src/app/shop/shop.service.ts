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

  getProducts(typeId?:number, sort?: string){
    let params = new HttpParams();

    if (typeId){
      params = params.append('typeId', typeId.toString());
    }

    if (sort){
      params = params.append('sort', sort);
    }
    
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
