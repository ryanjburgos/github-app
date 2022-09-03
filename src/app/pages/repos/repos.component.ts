import { Component, OnInit } from '@angular/core';
import { BaseResponseModel } from '../../shared/models/dto/base-response.model';
import { RepositoryResponseModel } from '../../shared/models/dto/repository-response.model';
import { RepositoryTableModel } from '../../shared/models/ui/repository-table.model';
import { GithubService } from '../../shared/services/github.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  public repositories$!: Observable<RepositoryTableModel[]>;

  constructor(private githubService: GithubService) {}

  public ngOnInit(): void {
    this.getRepositories();
  }

  public getRepositories(): void {
    this.repositories$ = this.githubService.getRepositories('angular').pipe(
      map((res: BaseResponseModel<RepositoryResponseModel>) =>
        res.items.map((repo: RepositoryResponseModel) => {
          const repositoryTable: RepositoryTableModel = {
            avatarOwner: { data: repo.owner.avatar_url, type: 'image' },
            name: { data: repo.name, type: 'text' },
            creationDate: { data: repo.created_at, type: 'date' },
          };
          return repositoryTable;
        })
      )
    );
  }
}
