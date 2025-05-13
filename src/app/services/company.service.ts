import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http: HttpClient = inject(HttpClient);
  public company: WritableSignal<Company> = signal<Company>({} as Company);
  constructor() { }

  public getCompany(): void {
    this.http.get<Company>('assets/company.json').subscribe((data: Company) => {
      this.company.set(data);
    });
  }
}