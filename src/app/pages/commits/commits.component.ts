import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { finalize, map, Observable, switchMap, take, tap } from 'rxjs';
import { BaseSearchResponseModel } from '../../shared/models/dto/base-response.model';
import { CommitResponseModel } from '../../shared/models/dto/commit-response.mode';
import { CommitsTableModel } from '../../shared/models/ui/commits-table.model';
import { GithubService } from '../../shared/services/http/github.service';
import { SpinnerService } from '../../shared/services/utils/spinner.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
})
export class CommitsComponent implements OnInit {
  public commits$!: Observable<CommitsTableModel[]>;

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute,
    private location: Location,
    private spinnerService: SpinnerService
  ) {
    this.loadCommitsByRepoName();
  }

  public ngOnInit(): void {}

  public loadCommitsByRepoName(): void {
    this.commits$ = this.route.queryParams.pipe(
      tap(() => this.spinnerService.show()),
      take(1),
      map((params: Params) => this.createQueryString(params)),
      switchMap((repoName: string) => this.githubService.getCommitsByRepoName(repoName)),
      map(({ items }: BaseSearchResponseModel<CommitResponseModel>) =>
        items.map((c: CommitResponseModel) => {
          const commitTable: CommitsTableModel = {
            author: { data: c.commit.author.name, type: 'text' },
            message: { data: c.commit.message, type: 'text' },
            url: { data: c.html_url, type: 'link' },
          };
          return commitTable;
        })
      ),
      finalize(() => this.spinnerService.hide())
    );
  }

  public goBack(): void {
    this.location.back();
  }

  public createQueryString(params: Params): string {
    let queryString: string = params['repositoryName'];
    if (params['language']) queryString += `+${params['repositoryName']}`;
    return queryString;
  }
}
