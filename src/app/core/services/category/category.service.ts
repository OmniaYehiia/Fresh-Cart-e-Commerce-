import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSubCategories(categoryId: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/categories/${categoryId}/subcategories`);
  }
}
