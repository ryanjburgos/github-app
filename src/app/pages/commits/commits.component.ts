import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize, map, Observable, take } from 'rxjs';
import { AppRoutesEnum } from '../../app-routes.enum';
import { BaseSearchResponseModel } from '../../shared/models/dto/base-response.model';
import { CommitResponseModel } from '../../shared/models/dto/commit-response.mode';
import { CommitsTableModel } from '../../shared/models/ui/commits-table.model';
import { GithubService } from '../../shared/services/http/github.service';
import { SpinnerService } from '../../shared/services/utils/spinner.service';

interface CommitsFiltersFormModel {
  text: FormControl<string>;
}

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
})
export class CommitsComponent implements OnInit {
  public commits$!: Observable<CommitsTableModel[]>;
  public filtersForm!: FormGroup<CommitsFiltersFormModel>;
  public repoName!: string;

  constructor(private githubService: GithubService, private route: ActivatedRoute, private router: Router, private spinnerService: SpinnerService) {
    this.setRepoName();
    this.createForm();
  }

  public ngOnInit(): void {}

  public getCommitsByFilter(): void {
    this.spinnerService.show();
    const queryString = this.createQueryString();
    this.commits$ = this.githubService.getCommitsByRepoName(queryString).pipe(
      map(({ items }: BaseSearchResponseModel<CommitResponseModel>) =>
        items.map((c: CommitResponseModel) => {
          const commitTable: CommitsTableModel = {
            author: { data: c.author.login, type: 'text' },
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
    this.router.navigate([AppRoutesEnum.repos]);
  }

  private createForm(): void {
    this.filtersForm = new FormGroup<CommitsFiltersFormModel>({
      text: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  private createQueryString(): string {
    let queryString: string = `${this.filtersForm.controls.text.value}+repo:${this.repoName}`;
    return queryString;
  }

  private setRepoName(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.repoName = params['repositoryName'];
    });
  }
}
