import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  private _productsUrl = './api/products/products.json';

    constructor(private _http: HttpClient) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productsUrl)
                   .do(data => console.log('All: ' + JSON.stringify(data)))
                   .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
    }

    getProduct(id: number): Observable<IProduct> {
      return this.getProducts()
                 .map((products: IProduct[]) => products.find(p => p.productId === id));
    }
}
