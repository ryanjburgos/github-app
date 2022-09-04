import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseSearchResponseModel } from '../models/dto/base-response.model';
import { CommitResponseModel } from '../models/dto/commit-response.mode';
import { RepositoryResponseModel } from '../models/dto/repository-response.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly BASE_URL: string = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  public getRepositories(text: string): Observable<BaseSearchResponseModel<RepositoryResponseModel>> {
    const queryParams = {
      q: text,
    };
    return this.http.get<BaseSearchResponseModel<RepositoryResponseModel>>(`${this.BASE_URL}/search/repositories`, { params: queryParams });
  }

  public getCommitsByRepoName(fullName: string): Observable<CommitResponseModel[]> {
    return this.http.get<CommitResponseModel[]>(`${this.BASE_URL}/repos/${fullName}/commits`);
  }
}
