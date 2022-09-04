import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppRoutesEnum } from '../../app-routes.enum';
import { BaseSearchResponseModel } from '../../shared/models/dto/base-response.model';
import { RepositoryResponseModel } from '../../shared/models/dto/repository-response.model';
import { RepositoryTableModel } from '../../shared/models/ui/repository-table.model';
import { GithubService } from '../../shared/services/github.service';
import { DataRowObject } from '../../ui/table/table.component';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  public repositories$!: Observable<RepositoryTableModel[]>;

  constructor(private githubService: GithubService, private router: Router) {}

  public ngOnInit(): void {
    this.getRepositories();
  }

  public getRepositories(): void {
    this.repositories$ = this.githubService.getRepositories('angular').pipe(
      map((res: BaseSearchResponseModel<RepositoryResponseModel>) =>
        res.items.map((repo: RepositoryResponseModel) => {
          const repositoryTable: RepositoryTableModel = {
            avatarOwner: { data: repo.owner.avatar_url, type: 'image' },
            name: { data: repo.name, type: 'text' },
            creationDate: { data: repo.created_at, type: 'date' },
            fullName: { data: repo.full_name, type: 'text' },
          };
          return repositoryTable;
        })
      )
    );
  }

  public onRepoRowClick(event: DataRowObject): void {
    this.router.navigate([AppRoutesEnum.commits], {
      queryParams: {
        repositoryName: (event as unknown as RepositoryTableModel).fullName.data,
      },
    });
    // this.githubService.getCommitsByRepoName((event as unknown as RepositoryTableModel).fullName.data).subscribe((data) => console.log(data));
  }
}
