import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { CommitResponseModel } from '../../shared/models/dto/commit-response.mode';
import { CommitsTableModel } from '../../shared/models/ui/commits-table.model';
import { GithubService } from '../../shared/services/github.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
})
export class CommitsComponent implements OnInit, OnDestroy {
  public commits$!: Observable<CommitsTableModel[]>;

  private _onDestroyObservable$: Subject<void> = new Subject();
  constructor(private githubService: GithubService, private route: ActivatedRoute) {
    this.loadCommitsByRepoName();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._onDestroyObservable$.next();
    this._onDestroyObservable$.complete();
  }

  public loadCommitsByRepoName(): void {
    this.commits$ = this.route.queryParams.pipe(
      map((params) => params['repositoryName']),
      switchMap((repoName) => this.githubService.getCommitsByRepoName(repoName)),
      map((response: CommitResponseModel[]) =>
        response.map((c: CommitResponseModel) => {
          const commitTable: CommitsTableModel = {
            author: { data: c.commit.author.name, type: 'text' },
            message: { data: c.commit.message, type: 'text' },
            url: { data: c.html_url, type: 'link' },
          };
          return commitTable;
        })
      )
    );
  }
}
