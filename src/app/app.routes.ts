import { Routes } from '@angular/router';
import { InvoiceFormComponent } from './pages/invoice-form/invoice-form.component';
import { InvoiceSummaryComponent } from './pages/invoice-summary/invoice-summary.component';

export const routes: Routes = [
    { path: '', redirectTo: 'invoice-form', pathMatch: 'full' },
  { path: 'invoice-form', component: InvoiceFormComponent },
  { path: 'invoice-summary', component: InvoiceSummaryComponent },
];
