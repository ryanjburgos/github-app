import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseSearchResponseModel } from '../../models/dto/base-response.model';
import { CommitResponseModel } from '../../models/dto/commit-response.mode';
import { RepositoryResponseModel } from '../../models/dto/repository-response.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly BASE_URL: string = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  public getRepositories(text: string): Observable<BaseSearchResponseModel<RepositoryResponseModel>> {
    const queryParams = {
      q: text,
    };
    return this.http.get<BaseSearchResponseModel<RepositoryResponseModel>>(`${this.BASE_URL}/repositories`, { params: queryParams });
  }

  public getCommitsByRepoName(text: string): Observable<BaseSearchResponseModel<CommitResponseModel>> {
    const queryParams = {
      q: text,
    };
    return this.http.get<BaseSearchResponseModel<CommitResponseModel>>(`${this.BASE_URL}/commits`, { params: queryParams });
  }
}
