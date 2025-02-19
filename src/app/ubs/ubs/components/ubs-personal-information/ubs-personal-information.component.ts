import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseComponent } from '@shared/components/form-base/form-base.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UBSOrderFormService } from '../../services/ubs-order-form.service';
import { OrderService } from '../../services/order.service';
import { Address, Bag, CourierLocations, OrderBag, OrderDetails, PersonalData } from '../../models/ubs.interface';
import { Order } from '../../models/ubs.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PhoneNumberValidator } from 'src/app/shared/phone-validator/phone.validator';
import { LocalStorageService } from '@global-service/localstorage/local-storage.service';
import { UBSAddAddressPopUpComponent } from 'src/app/shared/ubs-add-address-pop-up/ubs-add-address-pop-up.component';
import { Masks, Patterns } from 'src/assets/patterns/patterns';

@Component({
  selector: 'app-ubs-personal-information',
  templateUrl: './ubs-personal-information.component.html',
  styleUrls: ['./ubs-personal-information.component.scss']
})
export class UBSPersonalInformationComponent extends FormBaseComponent implements OnInit, OnDestroy, OnChanges {
  locationId = 1;
  addressId: number;
  orderDetails: OrderDetails;
  personalData: PersonalData;
  personalDataForm: FormGroup;
  shouldBePaid = true;
  order: Order;
  addresses: Address[] = [];
  maxAddressLength = 4;
  namePattern = Patterns.NamePattern;
  emailPattern = Patterns.ubsMailPattern;
  phoneMask = Masks.phoneMask;
  firstOrder = true;
  anotherClient = false;
  currentLocation = {};
  currentLocationId: number;
  locations: CourierLocations;
  currentLanguage: string;
  mainUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB3xs7Kczo46LFcQRFKPMdrE0lU4qsR_S4&libraries=places&language=';
  private destroy: Subject<boolean> = new Subject<boolean>();
  private personalDataFormValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern(this.namePattern)
  ];
  popupConfig = {
    hasBackdrop: true,
    closeOnNavigation: true,
    disableClose: true,
    panelClass: 'custom-ubs-style',
    data: {
      popupTitle: 'confirmation.title',
      popupSubtitle: 'confirmation.subTitle',
      popupConfirm: 'confirmation.cancel',
      popupCancel: 'confirmation.dismiss',
      isUBS: true
    }
  };

  @Input() completed;

  constructor(
    public router: Router,
    public orderService: OrderService,
    private shareFormService: UBSOrderFormService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private localService: LocalStorageService
  ) {
    super(router, dialog, orderService);
    this.initForm();
  }

  ngOnInit() {
    this.currentLanguage = this.localService.getCurrentLanguage();
    if (localStorage.getItem('anotherClient')) {
      this.anotherClient = JSON.parse(localStorage.getItem('anotherClient'));
    }
    this.takeUserData();
    if (localStorage.getItem('currentLocationId')) {
      this.currentLocationId = JSON.parse(localStorage.getItem('currentLocationId'));
      this.locations = JSON.parse(localStorage.getItem('locations'));

      this.currentLocation = this.locations.locationsDtosList[0].nameEn;
    }
    this.orderService.locationSub.subscribe((data) => {
      this.currentLocation = data;
    });
    this.orderService.currentAddress.subscribe((data: Address) => {
      this.personalDataForm.controls.address.setValue(data);
      this.personalDataForm.controls.addressComment.setValue(data.addressComment);
    });
    this.loadScript();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shareFormService.changePersonalData();
    if (changes.completed?.currentValue) {
      this.submit();
    }
  }

  getFormValues(): boolean {
    return true;
  }

  loadScript(): void {
    const script = document.getElementById('googleMaps') as HTMLScriptElement;
    if (script) {
      script.src = this.mainUrl + this.currentLanguage;
    } else {
      const google = document.createElement('script');
      google.type = 'text/javascript';
      google.id = 'googleMaps';
      google.setAttribute('src', this.mainUrl + this.currentLanguage);
      document.getElementsByTagName('head')[0].appendChild(google);
    }
  }

  findAllAddresses(isCheck: boolean) {
    this.orderService
      .findAllAddresses()
      .pipe(takeUntil(this.destroy))
      .subscribe((list) => {
        this.addresses = list.addressList;
        localStorage.setItem('addresses', JSON.stringify(this.addresses));
        this.personalDataForm.patchValue({
          address: this.addresses
        });

        const addressId = JSON.parse(localStorage.getItem('addressId'));
        if (this.addresses[0] && isCheck) {
          this.checkAddress(addressId ?? this.addresses[0].id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  initForm() {
    this.personalDataForm = this.fb.group({
      firstName: ['', this.personalDataFormValidators],
      lastName: ['', this.personalDataFormValidators],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40), Validators.pattern(this.emailPattern)]],
      phoneNumber: ['+38 0', [Validators.required, Validators.minLength(12), PhoneNumberValidator('UA')]],
      anotherClientFirstName: [''],
      anotherClientLastName: [''],
      anotherClientEmail: ['', [Validators.email, Validators.maxLength(40), Validators.pattern(this.emailPattern)]],
      anotherClientPhoneNumber: [''],
      address: ['', Validators.required],
      addressComment: ['', Validators.maxLength(255)]
    });
  }

  public takeUserData() {
    this.orderService
      .getPersonalData()
      .pipe(takeUntil(this.destroy))
      .subscribe((personalData: PersonalData) => {
        this.personalData = this.shareFormService.personalData;
        this.setFormData();
        this.findAllAddresses(true);
      });
  }

  checkAddress(addressId) {
    this.addresses.forEach((address) => {
      if ((address.id !== addressId && address.actual) || (address.id === addressId && !address.actual)) {
        address.actual = !address.actual;
      }
      if (address.actual) {
        this.orderService.setCurrentAddress(address);
      }
    });
    localStorage.setItem('addressId', JSON.stringify(addressId));
    this.changeAddressInPersonalData();
  }

  changeAddressInPersonalData() {
    const activeAddress = this.addresses.find((address) => address.actual);
    this.personalData.city = activeAddress.city;
    this.personalData.cityEn = activeAddress.cityEn;
    this.personalData.district = activeAddress.district;
    this.personalData.districtEn = activeAddress.districtEn;
    this.personalData.region = activeAddress.region;
    this.personalData.regionEn = activeAddress.regionEn;
    this.personalData.street = activeAddress.street;
    this.personalData.streetEn = activeAddress.streetEn;
    this.personalData.houseNumber = activeAddress.houseNumber;
    this.personalData.houseCorpus = activeAddress.houseCorpus;
    this.personalData.entranceNumber = activeAddress.entranceNumber;
    this.personalData.latitude = activeAddress.coordinates.latitude;
    this.personalData.longitude = activeAddress.coordinates.longitude;
    this.shareFormService.saveDataOnLocalStorage();
  }

  changeAnotherClientInPersonalData() {
    this.personalData.senderFirstName = this.personalDataForm.get('anotherClientFirstName').value;
    this.personalData.senderLastName = this.personalDataForm.get('anotherClientLastName').value;
    this.personalData.senderEmail = this.personalDataForm.get('anotherClientEmail').value;
    this.personalData.senderPhoneNumber = this.personalDataForm.get('anotherClientPhoneNumber').value;
    this.shareFormService.saveDataOnLocalStorage();
  }

  setFormData(): void {
    this.personalDataForm.patchValue({
      firstName: this.personalData.firstName,
      lastName: this.personalData.lastName,
      email: this.personalData.email,
      phoneNumber: this.personalData.phoneNumber,
      anotherClientFirstName: this.personalData.senderFirstName,
      anotherClientLastName: this.personalData.senderLastName,
      anotherClientEmail: this.personalData.senderEmail,
      anotherClientPhoneNumber: this.personalData.senderPhoneNumber,
      addressComment: this.addresses.length > 0 ? this.personalData.addressComment : ''
    });
    this.personalDataForm.markAllAsTouched();
  }

  togglClient(): void {
    const anotherClientFirstName = this.getControl('anotherClientFirstName');
    const anotherClientLastName = this.getControl('anotherClientLastName');
    const anotherClientPhoneNumber = this.getControl('anotherClientPhoneNumber');
    const anotherClientEmail = this.getControl('anotherClientEmail');
    this.anotherClient = !this.anotherClient;
    if (this.anotherClient) {
      anotherClientFirstName.markAsUntouched();
      anotherClientLastName.markAsUntouched();
      anotherClientPhoneNumber.markAsUntouched();
      anotherClientEmail.markAsUntouched();
      anotherClientFirstName.setValidators(this.personalDataFormValidators);
      anotherClientLastName.setValidators(this.personalDataFormValidators);
      anotherClientPhoneNumber.setValidators([Validators.required, Validators.minLength(12)]);
      anotherClientPhoneNumber.setValue('+380');
      localStorage.setItem('anotherClient', JSON.stringify(true));
    } else {
      anotherClientFirstName.setValue('');
      anotherClientFirstName.clearValidators();
      anotherClientLastName.setValue('');
      anotherClientLastName.clearValidators();
      anotherClientPhoneNumber.setValue('');
      anotherClientPhoneNumber.clearValidators();
      anotherClientEmail.setValue('');
      localStorage.removeItem('anotherClient');
    }
    anotherClientFirstName.updateValueAndValidity();
    anotherClientLastName.updateValueAndValidity();
    anotherClientPhoneNumber.updateValueAndValidity();
    this.changeAnotherClientInPersonalData();
  }

  editAddress(addressId: number) {
    this.openDialog(true, addressId);
  }

  activeAddressId() {
    const activeAddress = this.addresses.find((address) => address.actual);
    this.addressId = activeAddress.id;
  }

  deleteAddress(address: Address) {
    this.orderService
      .deleteAddress(address)
      .pipe(takeUntil(this.destroy))
      .subscribe((list: { addressList: Address[] }) => {
        this.addresses = list.addressList;
        if (this.addresses[0]) {
          this.checkAddress(this.addresses[0].id);
        } else {
          this.personalDataForm.patchValue({
            address: ''
          });
        }
      });
  }

  addNewAddress() {
    this.openDialog(false);
    this.personalDataForm.patchValue({
      address: this.addresses
    });
  }

  getControl(control: string) {
    return this.personalDataForm.get(control);
  }

  openDialog(isEdit: boolean, addressId?: number): void {
    const currentAddress = this.addresses.find((address) => address.id === addressId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'address-matDialog-styles';
    dialogConfig.data = {
      edit: isEdit,
      currentLocation: this.currentLocation
    };
    if (isEdit) {
      dialogConfig.data.address = currentAddress;
    } else {
      dialogConfig.data.address = {};
    }
    const dialogRef = this.dialog.open(UBSAddAddressPopUpComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.findAllAddresses(false);
        }
      });
  }

  submit(): void {
    this.firstOrder = false;
    this.activeAddressId();
    this.changeAddressInPersonalData();
    this.orderDetails = this.shareFormService.orderDetails;
    let orderBags: OrderBag[] = [];
    this.orderDetails.bags.forEach((bagItem: Bag, index: number) => {
      if (bagItem.quantity !== null) {
        const bag: OrderBag = { amount: bagItem.quantity, id: bagItem.id };
        orderBags.push(bag);
      }
    });
    orderBags = orderBags.filter((bag) => bag.amount && bag.amount !== 0);
    this.personalData.firstName = this.personalDataForm.get('firstName').value;
    this.personalData.lastName = this.personalDataForm.get('lastName').value;
    this.personalData.email = this.personalDataForm.get('email').value;
    this.personalData.phoneNumber = this.personalDataForm.get('phoneNumber').value;
    this.personalData.addressComment = this.personalDataForm.get('addressComment').value;
    this.personalData.senderFirstName = this.personalDataForm.get('anotherClientFirstName').value;
    this.personalData.senderLastName = this.personalDataForm.get('anotherClientLastName').value;
    this.personalData.senderEmail = this.personalDataForm.get('anotherClientEmail').value;
    this.personalData.senderPhoneNumber = this.personalDataForm.get('anotherClientPhoneNumber').value;
    this.order = new Order(
      this.shareFormService.orderDetails.additionalOrders[0] !== '' ? this.shareFormService.orderDetails.additionalOrders : null,
      this.addressId,
      orderBags,
      this.shareFormService.orderDetails.certificates,
      this.locationId,
      this.shareFormService.orderDetails.orderComment,
      this.personalData,
      this.shareFormService.orderDetails.pointsToUse,
      this.shouldBePaid
    );
    this.orderService.setOrder(this.order);
  }

  changeAddressComment() {
    this.addresses.forEach((address) => {
      if (address.actual) {
        address.addressComment = this.personalDataForm.controls.addressComment.value;
        this.orderService.updateAdress(address).subscribe(() => {
          this.orderService.setCurrentAddress(address);
          this.findAllAddresses(false);
        });
      }
    });
  }
}
