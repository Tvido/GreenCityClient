import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';

import { IAppState } from 'src/app/store/state/app.state';
import { Employees, Page } from 'src/app/ubs/ubs-admin/models/ubs-admin.interface';
import { UbsAdminEmployeeService } from 'src/app/ubs/ubs-admin/services/ubs-admin-employee.service';
import { UbsAdminEmployeeEditFormComponent } from '../ubs-admin-employee-edit-form/ubs-admin-employee-edit-form.component';
import { DeleteEmployee, GetEmployees } from 'src/app/store/actions/employee.actions';
import { DialogPopUpComponent } from '../../../../../shared/dialog-pop-up/dialog-pop-up.component';
import { UbsAdminEmployeeRightsFormComponent } from '../ubs-admin-employee-rights-form/ubs-admin-employee-rights-form.component';

@Component({
  selector: 'app-ubs-admin-employee-table',
  templateUrl: './ubs-admin-employee-table.component.html',
  styleUrls: ['./ubs-admin-employee-table.component.scss']
})
export class UbsAdminEmployeeTableComponent implements OnInit {
  currentPageForTable = 0;
  isUpdateTable = false;
  isLoading = true;
  sizeForTable = 30;
  search: string;
  searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  totalPagesForTable: number;
  tableData: Page[];
  employees: Page[];
  isStationsOpen = false;
  isPositionsOpen = false;
  allPositions: any[] = [];
  allStations: any[] = [];
  selectedStations: string[] = [];
  selectedPositions: string[] = [];
  filteredTableData: Page[] = [];
  firstPageLoad = true;
  reset = true;
  employees$ = this.store.select((state: IAppState): Employees => state.employees.employees);
  public isTooltipOpened: boolean;
  public viewMode: boolean;
  public editMode: boolean;
  public isUploading: boolean;
  public isDeleting: boolean;
  public deleteDialogData = {
    popupTitle: 'employees.warning-title',
    popupConfirm: 'employees.btn.delete',
    popupCancel: 'employees.btn.cancel'
  };
  public icons = {
    edit: './assets/img/ubs-admin-employees/edit.svg',
    settings: './assets/img/ubs-admin-employees/gear.svg',
    delete: './assets/img/ubs-admin-employees/bin.svg',
    crumbs: './assets/img/ubs-admin-employees/crumbs.svg',
    email: './assets/img/ubs-admin-employees/mail.svg',
    phone: './assets/img/ubs-admin-employees/phone.svg',
    location: './assets/img/ubs-admin-employees/location.svg',
    filter: './assets/img/ubs-admin-employees/filter.svg',
    info: './assets/img/ubs-admin-employees/info.svg'
  };

  constructor(
    private ubsAdminEmployeeService: UbsAdminEmployeeService,
    private dialog: MatDialog,
    private store: Store<IAppState>,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    this.ubsAdminEmployeeService.searchValue.pipe(debounceTime(500), distinctUntilChanged()).subscribe((item) => {
      this.search = item;
      this.currentPageForTable = 0;
      this.reset = true;
      this.firstPageLoad = true;
      this.getTable();
    });
  }

  getTable() {
    this.isLoading = true;
    this.getEmployeesPages();

    this.employees$.subscribe((item: Employees) => {
      if (item) {
        this.tableData = item[`content`];
        this.employees = this.tableData.map((employee: Page) => ({
          ...employee,
          expanded: false
        }));
        this.totalPagesForTable = item[`totalPages`];
        if (this.firstPageLoad) {
          this.isLoading = false;
          this.firstPageLoad = false;
        }
        this.isUpdateTable = false;
        this.reset = false;
      }
    });
  }

  openRightsDialog(event: Event): void {
    event.stopPropagation();
    this.dialog.open(UbsAdminEmployeeRightsFormComponent, {
      data: this.deleteDialogData,
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
  }

  openDeleteDialog(employeeData: Page, event: Event): void {
    event.stopPropagation();
    const matDialogRef = this.dialog.open(DialogPopUpComponent, {
      data: this.deleteDialogData,
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'delete-dialog-container'
    });

    matDialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.isDeleting = true;
          this.store.dispatch(DeleteEmployee({ id: employeeData.id }));
        }
      });
  }

  updateTable() {
    this.isUpdateTable = true;
    this.getEmployeesPages();
  }

  getEmployeesPages(): void {
    this.store.dispatch(
      GetEmployees({
        pageNumber: this.currentPageForTable,
        pageSize: this.sizeForTable,
        search: this.search,
        reset: this.reset
      })
    );
  }

  onScroll() {
    if (!this.isUpdateTable && this.currentPageForTable < this.totalPagesForTable - 1) {
      this.currentPageForTable++;
      this.updateTable();
    }
  }

  openPositions() {
    this.isPositionsOpen = !this.isPositionsOpen;
    this.isStationsOpen = false;
    if (this.allPositions.length === 0) {
      this.ubsAdminEmployeeService.getAllPositions().subscribe((pos) => {
        this.allPositions = pos;
      });
    }
    if (this.isPositionsOpen === false) {
      this.selectedPositions = [];
    }
  }

  getPositionId(e: any, id: string) {
    if (e.target.checked) {
      this.selectedPositions.push(id);
      this.positionsFilter();
    } else {
      this.selectedPositions = this.selectedPositions.filter((m) => m !== id);
      this.positionsFilter();
    }
  }

  positionsFilter() {
    if (this.selectedPositions.length !== 0) {
      this.onPositionSelected();
    } else if (this.selectedStations.length === 0 && this.selectedPositions.length === 0) {
      this.dataSource.data = this.tableData;
    }
  }

  onPositionSelected() {
    this.filteredTableData = this.tableData.filter((user) => {
      return user.employeePositions.some((position) => {
        return this.selectedPositions.some((ids) => position.id === +ids);
      });
    });
    this.dataSource.data = this.filteredTableData;
  }

  getStationId(e: any, id: string) {
    if (e.target.checked) {
      this.selectedStations.push(id);
      this.stationsFilter();
    } else {
      this.selectedStations = this.selectedStations.filter((m) => m !== id);
      this.stationsFilter();
    }
  }

  stationsFilter() {
    if (this.selectedStations.length !== 0) {
      this.onStationSelected();
    } else if (this.selectedPositions.length === 0 && this.selectedStations.length === 0) {
      this.dataSource.data = this.tableData;
    }
  }

  onStationSelected() {
    this.filteredTableData = this.tableData.filter((user) => {
      return user.receivingStations.some((station) => {
        return this.selectedStations.some((ids) => station.id === +ids);
      });
    });
    this.dataSource.data = this.filteredTableData;
  }

  openStations() {
    this.isStationsOpen = !this.isStationsOpen;
    this.isPositionsOpen = false;
    if (this.allStations.length === 0) {
      this.ubsAdminEmployeeService.getAllStations().subscribe((stations) => {
        this.allStations = stations;
      });
    }
    if (this.isStationsOpen === false) {
      this.selectedStations = [];
    }
  }

  openEditDialog(employeeData: Page, event: Event) {
    event.stopPropagation();
    this.dialog.open(UbsAdminEmployeeEditFormComponent, {
      data: employeeData,
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
  }
}
