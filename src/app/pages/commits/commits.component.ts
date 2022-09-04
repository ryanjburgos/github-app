import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, Subject, switchMap, take, tap } from 'rxjs';
import { CommitResponseModel } from '../../shared/models/dto/commit-response.mode';
import { CommitsTableModel } from '../../shared/models/ui/commits-table.model';
import { GithubService } from '../../shared/services/http/github.service';
import { SpinnerService } from '../../shared/services/utils/spinner.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
})
export class CommitsComponent implements OnInit, OnDestroy {
  public commits$!: Observable<CommitsTableModel[]>;

  private _onDestroyObservable$: Subject<void> = new Subject();

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute,
    private location: Location,
    private spinnerService: SpinnerService
  ) {
    this.loadCommitsByRepoName();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._onDestroyObservable$.next();
    this._onDestroyObservable$.complete();
  }

  public loadCommitsByRepoName(): void {
    this.commits$ = this.route.queryParams.pipe(
      tap(() => this.spinnerService.show()),
      take(1),
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
      ),
      finalize(() => this.spinnerService.hide())
    );
  }

  public goBack(): void {
    this.location.back();
  }
}
