import { Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
 public products: WritableSignal<Product[]> = signal<Product[]>([] as Product[])

  constructor() { }

  public setProducts(invoice: Product[]): void {
   this.products.set(invoice);
  }
}
