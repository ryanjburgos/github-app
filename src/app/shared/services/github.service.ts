import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/dto/base-response.model';
import { RepositoryResponseModel } from '../models/dto/repository-response.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly BASE_URL: string = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  public getRepositories(text: string): Observable<BaseResponseModel<RepositoryResponseModel>> {
    const queryParams = {
      q: text,
    };

    return this.http.get<BaseResponseModel<RepositoryResponseModel>>(`${this.BASE_URL}/repositories`, { params: queryParams });
  }
}
