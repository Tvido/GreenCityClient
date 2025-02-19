import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from '@global-service/localstorage/local-storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Patterns } from 'src/assets/patterns/patterns';
import { TariffsService } from '../../../services/tariffs.service';

@Component({
  selector: 'app-ubs-admin-tariffs-station-pop-up',
  templateUrl: './ubs-admin-tariffs-station-pop-up.component.html',
  styleUrls: ['./ubs-admin-tariffs-station-pop-up.component.scss']
})
export class UbsAdminTariffsStationPopUpComponent implements OnInit, OnDestroy {
  stationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(Patterns.NamePattern)]]
  });

  get name() {
    return this.stationForm.get('name');
  }

  stationExist = false;
  authorName: string;
  unsubscribe: Subject<any> = new Subject();
  datePipe = new DatePipe('ua');
  newDate = this.datePipe.transform(new Date(), 'MMM dd, yyyy');
  stations = [];
  currentId: number;
  private destroy: Subject<boolean> = new Subject<boolean>();

  public icons = {
    arrowDown: '././assets/img/ubs-tariff/arrow-down.svg',
    cross: '././assets/img/ubs/cross.svg'
  };

  constructor(
    private fb: FormBuilder,
    private localeStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<UbsAdminTariffsStationPopUpComponent>,
    private tariffsService: TariffsService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      headerText: string;
      template: TemplateRef<any>;
      edit: boolean;
    }
  ) {}

  ngOnInit(): void {
    this.getReceivingStation();
    this.localeStorageService.firstNameBehaviourSubject.pipe(takeUntil(this.unsubscribe)).subscribe((firstName) => {
      this.authorName = firstName;
    });
    this.name.valueChanges.subscribe((value) => {
      this.stationExist = this.stations.some((it) => it.name === value.trim());
    });
  }

  getReceivingStation(): void {
    this.tariffsService
      .getAllStations()
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.stations = res;
      });
  }

  openAuto(event: Event, trigger: MatAutocompleteTrigger): void {
    event.stopPropagation();
    trigger.openPanel();
  }

  addStation(): void {
    this.tariffsService
      .addStation(this.name.value)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  editStation(): void {
    const newStation = { id: this.currentId, name: this.name.value };
    this.tariffsService
      .editStation(newStation)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  selectedStation(event): void {
    this.currentId = this.stations.find((it) => it.name === event.option.value).id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
