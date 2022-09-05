import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, map, Observable } from 'rxjs';
import { AppRoutesEnum } from '../../app-routes.enum';
import { BaseSearchResponseModel } from '../../shared/models/dto/base-response.model';
import { RepositoryResponseModel } from '../../shared/models/dto/repository-response.model';
import { RepositoryTableModel } from '../../shared/models/ui/repository-table.model';
import { GithubService } from '../../shared/services/http/github.service';
import { SpinnerService } from '../../shared/services/utils/spinner.service';
import { DataRowObject } from '../../ui/table/table.component';

interface FiltersFormModel {
  repositoryName: FormControl<string>;
  programmingLanguage: FormControl<string>;
  minNumberOfStars: FormControl<string>;
  textContainedInTheTitle: FormControl<string>;
}

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
  public repositories$!: Observable<RepositoryTableModel[]>;
  public filtersForm!: FormGroup<FiltersFormModel>;

  constructor(private githubService: GithubService, private router: Router, private spinnerService: SpinnerService) {
    this.createForm();
  }

  public ngOnInit(): void {}

  public createForm(): void {
    this.filtersForm = new FormGroup<FiltersFormModel>({
      repositoryName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      programmingLanguage: new FormControl('', { nonNullable: true }),
      minNumberOfStars: new FormControl('', { nonNullable: true }),
      textContainedInTheTitle: new FormControl('', { nonNullable: true }),
    });
  }

  /**
   * load repositories
   * @returns void
   */
  public getRepositoriesByFilters(): void {
    this.spinnerService.show();
    const queryString = this.createQueryString();
    this.repositories$ = this.githubService.getRepositories(queryString).pipe(
      map(({ items }: BaseSearchResponseModel<RepositoryResponseModel>) =>
        items.map((repo: RepositoryResponseModel) => {
          const repositoryTable: RepositoryTableModel = {
            avatarOwner: { data: repo.owner.avatar_url, type: 'image' },
            name: { data: repo.name, type: 'text' },
            creationDate: { data: repo.created_at, type: 'date' },
            fullName: { data: repo.full_name, type: 'text' },
            programmingLanguage: { data: repo.language, type: 'text' },
          };
          return repositoryTable;
        })
      ),
      finalize(() => this.spinnerService.hide())
    );
  }

  /**
   * handle click on single row
   * @param  {DataRowObject} event
   * @returns void
   */
  public onRepoRowClick(event: DataRowObject): void {
    this.router.navigate([AppRoutesEnum.commits], {
      queryParams: {
        repositoryName: (event as unknown as RepositoryTableModel).fullName.data,
        language: (event as unknown as RepositoryTableModel).programmingLanguage.data,
      },
    });
  }

  private createQueryString(): string {
    let queryString: string = this.filtersForm.controls.repositoryName.value;

    if (!!this.filtersForm.controls.programmingLanguage.value) {
      queryString += `+language:${this.filtersForm.controls.programmingLanguage.value}`;
    }

    if (!!this.filtersForm.controls.minNumberOfStars.value) {
      queryString += `+stars:>=${this.filtersForm.controls.minNumberOfStars.value}`;
    }

    if (!!this.filtersForm.controls.textContainedInTheTitle.value) {
      // queryString += `+in:issues+state:open,closed+in:title${this.filtersForm.controls.textContainedInTheTitle.value}`; TODO verificare query string
    }

    return encodeURIComponent(queryString);
  }
}
