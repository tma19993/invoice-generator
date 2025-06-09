import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { count } from 'rxjs';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-invoice-form',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './invoice-form.component.html',
    styleUrl: './invoice-form.component.scss'
})
export class InvoiceFormComponent implements OnInit {
  private invoiceService: InvoiceService = inject(InvoiceService);
  private router: Router = inject(Router);

  public errorMessage: string = '';
  public form: FormGroup = new FormGroup({
    products: new FormArray([])
  });

  public get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  public ngOnInit(): void {
    this.initFormData();
    this.form.events.subscribe((event) => {
      if (event instanceof FormSubmittedEvent) {
        this.submitForm();
      }
    });
  }

  public remove(id: number) {
    (this.form.controls['products'] as FormArray).removeAt(id);
  }

  public addProduct(): void {
    this.errorMessage = '';
    this.products.push(this.initForm());
  }
  

  private initFormData(): void {
    if (this.invoiceService.products().length > 0) {
      this.invoiceService.products().forEach((product: Product) => {
        this.products.push(this.initForm(product));
      });
    }
  }

  private initForm(product?: Product): FormGroup {
    return new FormGroup({
      name: new FormControl(product?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      count: new FormControl(product?.count || '', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern('^[0-9]*$')]),
      price: new FormControl(product?.price || '', [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern('^[0-9]*$')]),
    });
  }

  private submitForm(): void {
    this.errorMessage = '';

    if (this.products.length === 0) {
      this.errorMessage = 'Please add items';
      return;
    }

    const validProduts = this.products.controls.filter(product => product.valid);
    if (validProduts.length === 0) {
      this.errorMessage = 'Please add at least one valid item';
      return;
    }

    this.invoiceService.setProducts(this.products.value);
    this.router.navigate(['/invoice-summary']);
  }
}

