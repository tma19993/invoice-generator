import { Component, inject, Signal } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { RouterModule } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-invoice-summary',
    imports: [RouterModule],
    templateUrl: './invoice-summary.component.html',
    styleUrl: './invoice-summary.component.scss'
})
export class InvoiceSummaryComponent {
  private invoiceService: InvoiceService = inject(InvoiceService);
  private companyService: CompanyService = inject(CompanyService);

  public products: Product[] = this.invoiceService.products();
  public companyData: Signal<Company> = this.companyService.company;
  public total: number = 0;

  ngOnInit(): void {
    this.companyService.getCompany();
    this.countTotal();
  }

  private countTotal(): void {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price * product.count;
    })
    this.total = total;
  }
}
