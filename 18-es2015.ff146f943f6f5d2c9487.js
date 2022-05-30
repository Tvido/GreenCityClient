(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"4y86":function(e,t,n){"use strict";n.r(t),t.default=".wrapper {\n  padding: 0 50px;\n}"},"7+5l":function(e,t,n){"use strict";n.r(t),t.default='<div class="example-card">\n  <div clas="image-container">\n    <div class="row">\n      <div class="title-wrapper">\n        <mat-label>Picture</mat-label>\n        <mat-label>{{ imageCount }}/5</mat-label>\n      </div>\n      <mat-label class="image-title">Download PNG or JPG only. File size should be less than 10MB</mat-label>\n      <div class="image-container" appDrag (files)="filesDropped($event)" *ngFor="let img of images; index as i">\n        <img class="image-preview" *ngIf="img.src" [src]="img.src" alt="image-of-violation" />\n        <div class="delete-block">\n          <div>{{ img.name }}</div>\n          <div (click)="deleteImage(i)">X</div>\n        </div>\n\n        <div *ngIf="img.isLabel" class="drag-inscription">\n          <label for="file-upload">\n            {{ img.label }}\n          </label>\n          <input\n            #takeInput\n            id="file-upload"\n            class="d-none"\n            [disabled]="false"\n            type="file"\n            accept="image/png,image/jpeg"\n            (change)="loadFile($event)"\n          />\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'},"7Y0F":function(e,t,n){"use strict";n.r(t),t.default=".date-container {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.time-container {\n  display: flex;\n  width: 100%;\n}\n\n.time-item {\n  max-width: 102px;\n  margin-right: 10px;\n}\n\n.time-button {\n  min-width: 100%;\n}\n\n.date {\n  max-width: 124px;\n  margin-right: 20px;\n}\n\n.mat-form-field {\n  font-size: 12px;\n}\n\n.isOfline {\n  display: none;\n}\n\n.active {\n  display: block;\n}\n\n.active .mat-form-field {\n  width: 100%;\n}\n\n.example-margin {\n  margin-right: 20px;\n}"},"98Gv":function(e,t,n){"use strict";n.r(t),t.default=".google-map {\n  height: 340px;\n  padding: 0 0 80px 0;\n}"},B6en:function(e,t,n){"use strict";n.r(t),t.default='<div [formGroup]="dateForm">\n  <div class="date-container">\n    <mat-form-field appearance="outline" class="date">\n      <mat-label>Choose a date </mat-label>\n      <input [min]="minDate" matInput [matDatepicker]="picker" formControlName="date" />\n      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>\n      <mat-datepicker #picker></mat-datepicker>\n    </mat-form-field>\n\n    <mat-form-field appearance="outline" class="time-item">\n      <mat-label>Set Start Time</mat-label>\n      <mat-select formControlName="startTime">\n        <mat-option *ngFor="let time of timeArrStart" [value]="time">\n          {{ time }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <h5 class="time-item">--</h5>\n    <mat-form-field appearance="outline" class="time-item">\n      <mat-label>Set End Time</mat-label>\n      <mat-select formControlName="endTime">\n        <mat-option *ngFor="let time of timeArrEnd" [value]="time">\n          {{ time }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <mat-checkbox class="example-margin" (change)="checkIfAllDay($event)">all day</mat-checkbox>\n  </div>\n  <div class="checkbox">\n    <mat-checkbox class="example-margin" (change)="checkIfOffline($event)">Place</mat-checkbox>\n    <mat-checkbox class="example-margin" (change)="checkIfOnline($event)">Online</mat-checkbox>\n  </div>\n\n  <div *ngIf="dateForm.get(\'place\')" class="active">\n    <mat-label>Location</mat-label>\n    <mat-form-field appearance="outline">\n      <mat-label>Event Ofline place.</mat-label>\n      <input matInput #placesRef matGoogleMapsAutocomplete formControlName="place" />\n    </mat-form-field>\n  </div>\n\n  <div *ngIf="dateForm.get(\'onlineLink\')" class="active">\n    <mat-label>Online Link</mat-label>\n    <mat-form-field appearance="outline">\n      <mat-label>EventOnline link (should start with http:/).</mat-label>\n      <input matInput formControlName="onlineLink" />\n    </mat-form-field>\n  </div>\n</div>\n'},BRC3:function(e,t,n){"use strict";n.r(t),t.default='<div class="wrapper">\n  <h1>Event-list</h1>\n\n  <div class="cont">\n    <h1 class="main-header">{{ \'homepage.events.title\' | translate }}</h1>\n    <a class="create" [routerLink]="[\'create-event\']" *ngIf="isLoggedIn">\n      <div class="secondary-global-button create-button">\n        <span class="create-button-text">Create</span>\n      </div>\n    </a>\n  </div>\n\n  <div class="event-list">\n    <mat-card\n      class="event-list-item"\n      *ngFor="\n        let event of eventsList\n          | paginate\n            : {\n                itemsPerPage: 9,\n                currentPage: page,\n                totalItems: total\n              }\n      "\n    >\n      <div class="image-container">\n        <img class="event-image" src="{{ event.titleImage }}" alt="event" />\n        <div class="event-stars">\n          <span class="fill"></span>\n          <span class="empty"></span>\n          <span class="empty"></span>\n        </div>\n        <div class="event-flags">\n          <span class="flag"></span>\n        </div>\n        <div class="event-title">\n          <h3>{{ event.title }}</h3>\n        </div>\n      </div>\n\n      <div class="main-container">\n        <div *ngIf="event.dates[0]" class="date-container">\n          <span class="clock"></span>\n          <div class="date">\n            {{ event.dates[0].startDate | date }}\n          </div>\n          <h5>{{ \' | \' }}</h5>\n          <div class="time">{{ event.dates[0].startDate | date: \'shortTime\' }}...</div>\n        </div>\n        <div *ngIf="event.dates[0]" class="date-container">\n          <div>\n            <span class="place"></span>\n          </div>\n          <div>\n            {{ \'Here should be adrress\' }}\n          </div>\n        </div>\n\n        <div [innerHTML]="event.description"></div>\n\n        <button class="secondary-global-button event-button">More</button>\n        <button class="primary-global-button event-button">Join Event</button>\n      </div>\n    </mat-card>\n\n    <pagination-controls (pageChange)="setPage($event)"></pagination-controls>\n  </div>\n</div>\n'},HlEG:function(e,t,n){"use strict";n.r(t),t.default='<div class="wrapper">\n  <router-outlet></router-outlet>\n</div>\n'},QDJE:function(e,t,n){"use strict";n.r(t),t.default=".image-container {\n  position: relative;\n  width: 108px;\n  height: 64px;\n  background: var(--ubs-secondary-white);\n  border: 1px solid var(--ubs-primary-light-grey);\n  box-sizing: border-box;\n  margin: 1px 1px 50px 1px;\n}\n\n.drag-inscription {\n  font-size: 22px;\n  color: var(--quaternary-grey);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  text-align: center;\n  transform: translate(-50%, -50%);\n  cursor: pointer;\n}\n\n.delete-block {\n  justify-content: space-between;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: var(--ubs-quaternary-light-grey);\n  opacity: 0.7;\n  width: 100%;\n  display: none;\n  max-height: 45px;\n}\n\n.delete-block:hover {\n  display: flex;\n  cursor: pointer;\n}\n\n.delete-block div:nth-of-type(1) {\n  width: calc(100% - 25px);\n  overflow: hidden;\n}\n\n.delete-block div:nth-of-type(2) {\n  width: 15px;\n}\n\n.image-preview {\n  width: 108px;\n  height: 64px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  cursor: pointer;\n}\n\n.image-preview:hover + .delete-block {\n  display: flex;\n}\n\n.title-wrapper {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.image-title {\n  font-size: 12px;\n}"},aEgp:function(e,t,n){"use strict";n.r(t),t.default=".cont {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n}\n\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.wrapper {\n  padding: 20px 100px;\n}\n\n.list-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.list-wrapper .list {\n  list-style: none;\n  padding-left: 0;\n}\n\n.gallery-view-active {\n  display: grid;\n  grid-template-columns: repeat(3, 359px);\n  grid-gap: 32px;\n}\n\n.list-view-li-active {\n  margin-bottom: 32px;\n}\n\n.create {\n  height: 40px;\n}\n\n.create .create-button {\n  border-radius: 5px;\n  line-height: 16px;\n  min-width: 139px;\n  min-height: 40px;\n  padding: 8px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.create .create-button span {\n  display: block;\n  height: 16px;\n  white-space: nowrap;\n}\n\n.eventImage {\n  max-width: 400px;\n  margin: 40px;\n}\n\n.img {\n  max-width: 100px;\n}\n\n.listContainer {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n\n.event-list {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n\n.event-list .mat-card {\n  padding: 0;\n}\n\n.event-list .event-list-item {\n  flex: 0 1 30%;\n  overflow: hidden;\n  margin: 0 0 30px 0;\n  background-color: #f0ebeb;\n}\n\n.image-container {\n  width: 100%;\n  height: 204px;\n  overflow: hidden;\n  position: relative;\n}\n\n.image-container .event-image {\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n\n.image-container .event-stars {\n  width: 88px;\n  height: 40px;\n  background-color: rgba(224, 233, 233, 0.781);\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  border-radius: 5px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 5px;\n}\n\n.image-container .event-stars span {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n}\n\n.image-container .event-stars .fill {\n  background: url('star-filled.2a3b3d3c0b010a415acb.png') no-repeat center;\n}\n\n.image-container .event-stars .empty {\n  background: url('Vector.1d470aae7f6ca782d083.png') no-repeat center;\n}\n\n.image-container .event-flags {\n  width: 40px;\n  height: 40px;\n  background-color: rgba(224, 233, 233, 0.781);\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  border-radius: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.image-container .event-flags span {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n}\n\n.image-container .event-flags .flag {\n  background: url('bookmark-set.aa47ea09c1f7874d271a.png') no-repeat center;\n}\n\n.image-container .event-title {\n  width: 100%;\n  background-color: rgba(26, 27, 27, 0.247);\n  color: beige;\n  text-align: center;\n  position: absolute;\n  bottom: 0;\n}\n\n.main-container {\n  padding: 16px 24px;\n}\n\n.main-container .date-container {\n  display: flex;\n  align-items: center;\n}\n\n.main-container .date-container .main-container .date-container span {\n  display: inline-block;\n  width: 25px;\n  height: 25px;\n}\n\n.main-container .date-container .clock {\n  background: url('clock.56bdf3712f7227dfdb1e.png') no-repeat center;\n}\n\n.main-container .date-container .place {\n  background: url('place.32e28c6b13018b2090d7.png') no-repeat center;\n}\n\n.main-container .event-button {\n  display: block;\n  width: 100%;\n  margin: 10px 0;\n  height: 40px;\n}"},gSny:function(e,t,n){"use strict";n.r(t),t.default='<div class="google-map">\n  <mat-checkbox class="example-margin" [(ngModel)]="mapDeactivate" [labelPosition]="\'before\'" (change)="showCurLocation()"\n    >Show Your curent location</mat-checkbox\n  >\n  <p>Event address: {{ adress }}</p>\n  <agm-map [style.width.%]="100" [style.height.%]="100" [zoom]="12" (mapReady)="onMapReady($event)" (mapClick)="addMarker($event)">\n    <agm-marker\n      *ngIf="eventPlace"\n      [latitude]="eventPlace.location.lat"\n      [longitude]="eventPlace.location.lng"\n      [title]="markerContent"\n      (mouseOver)="markerOver(eventPlace)"\n      (mouseOut)="markerOut(eventPlace)"\n      [animation]="eventPlace.animation"\n    ></agm-marker>\n  </agm-map>\n  <button mat-raised-button color="warn" (click)="deletePlace()">Clear Mark</button>\n</div>\n'},i48p:function(e,t,n){"use strict";n.r(t),t.default=".dateContainer {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.dateEvent {\n  align-items: flex-start;\n  display: flex;\n  margin: 20px 0;\n}\n\n::ng-deep .ql-container {\n  min-height: 200px;\n}\n\n.content {\n  z-index: 2;\n  border: 2px solid #a19c9c;\n}\n\n.content-error {\n  border: 2px solid #f32121;\n}\n\n.event-container {\n  padding: 0 100px;\n}\n\n.event-header {\n  margin: 24px 0;\n}\n\n.main-title {\n  display: flex;\n  align-items: center;\n}\n\n.title-wrapper {\n  display: flex;\n  justify-content: space-between;\n}\n\n.event-main {\n  display: flex;\n}\n\n.event-main-block {\n  background: #f8f7f7;\n}\n\n.mat-form-field {\n  font-size: 12px;\n  padding-left: 0;\n}\n\n.event-input {\n  width: 484px;\n}\n\n.date-item {\n  width: 96px;\n}\n\n.duration-choice {\n  margin: 0 0 0 20px;\n}\n\n.left {\n  max-width: 652px;\n}\n\n.date-event-block {\n  margin: 0 0 0 20px;\n}\n\n.date-day {\n  background-color: #d8d5d5;\n  width: 64px;\n  height: 32px;\n  padding: 5px 0;\n  text-align: center;\n  margin-top: 10px;\n}\n\n.checkbox {\n  width: 150px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.right {\n  padding: 24px;\n  margin-left: 32px;\n}\n\n.buttons-container {\n  margin-bottom: 30px;\n}\n\n.label {\n  margin-bottom: 40px;\n}\n\n.ul-eco-buttons {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  overflow: auto;\n  white-space: nowrap;\n  min-height: 42px;\n}\n\n.ul-eco-buttons li {\n  display: inline-block;\n}\n\n.flex-container {\n  display: flex;\n  justify-content: flex-start;\n}\n\n.submit-container {\n  padding: 40px 0 60px;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.submit-container button {\n  margin-left: 30px;\n}"},phI3:function(e,t,n){"use strict";n.r(t),n.d(t,"EventsModule",(function(){return V})),n.d(t,"createTranslateLoader",(function(){return Z}));var a=n("mrSG"),i=n("fXoL"),s=n("ofXK"),o=n("sYmb"),l=n("mqiu"),r=n("iadO"),c=n("kmnG"),d=n("qFsG"),p=n("d3UM"),m=n("bTqV"),h=n("pxUr"),g=n("Qaz/"),u=n("3Pt+"),v=n("5tIC"),f=n("PCNd"),b=n("dlKe"),x=n("CzEO"),y=n("oOf3"),k=n("tyNb");const w={"emoji-shortname":!0,"emoji-textarea":!1,"emoji-toolbar":!0,toolbar:{container:[["bold","italic","underline","strike"],[{font:[]}],[{color:[]},{background:[]}],[{align:[]}],[{size:["small",!1,"large","huge"]}]]},imageResize:!0};var O=n("tk/3"),C=n("jtHE"),j=n("AytR");let D=class{constructor(e){this.http=e,this.backEnd=j.a.backendLink,this.accessToken=localStorage.getItem("accessToken"),this.destroyed$=new C.a(1),this.httpOptions={headers:new O.d({Authorization:"my-auth-token"})}}createEvent(e){return this.http.post(this.backEnd+"events/create",e)}getEvents(e,t){return this.http.get(`${this.backEnd}events?page=${e}&size=${t}`)}ngOnDestroy(){this.destroyed$.next(!0),this.destroyed$.complete()}};D.ctorParameters=()=>[{type:O.b}],D=Object(a.__decorate)([Object(i.Injectable)({providedIn:"root"})],D);var A=n("kzlf"),E=n.n(A),I=(n("ah1v"),n("8xju")),_=n.n(I),F=n("JIr8"),L=n("BhRD"),P=n("z6cu");let S=class{constructor(e,t,n){this.eventService=e,this.router=t,this.injector=n,this.title="",this.dates=[],this.imgArray=[],this.quillModules={},this.editorHTML="",this.isOpen=!0,this.places=[],this.isPosting=!1,this.checkAfterSend=!0,this.pipe=new s.e("en-US"),this.dateArrCount=["1 day","2 days","3 days","4 days","5 days","6 days","7 days"],this.filters=[{name:"Environmental",isActive:!1},{name:"Social",isActive:!0},{name:"Economic",isActive:!0}],this.quillModules=w,E.a.register("modules/imageResize",_.a),this.snackBar=n.get(L.a)}ngOnInit(){this.titleForm=new u.f("",[u.v.required,u.v.minLength(1),u.v.maxLength(70)])}checkTab(e){e.isActive=!e.isActive}checkForm(e,t){this.dates[t].date=e.date,this.dates[t].startDate=e.startTime,this.dates[t].finishDate=e.endTime,this.dates[t].onlineLink=e.onlineLink}checkStatus(e,t){this.dates[t].valid=e}escapeFromCreateEvent(){this.router.navigate(["/events"])}changeToOpen(){this.isOpen=!0}changeToClose(){this.isOpen=!1}setDateCount(e){this.dates.length=+e.value.split(" ")[0];for(let t=0;t<this.dates.length;t++)this.dates[t]={date:null,startDate:"",finishDate:"",coordinatesDto:{latitude:null,longitude:null},onlineLink:"",valid:!1,check:!1}}getImageTosend(e){this.imgArray=[...e]}changedEditor(e){"selection-change"!==e.event&&(this.editorHTML=e.html,this.contentValid=!(e.text.length<20||e.text.length>63206))}setCoordsOnlOff(e,t){this.dates[t].coordinatesDto.latitude=e.latitude,this.dates[t].coordinatesDto.longitude=e.longitude}checkDates(){this.dates.forEach(e=>{e.check=!e.valid}),this.checkdates=!this.dates.find(e=>!e.valid)}getFormattedDate(e,t,n){const a=new Date(e);return a.setHours(t,n),a.toString()}createDates(){return this.dates.reduce((e,t)=>{t.startDate||(t.startDate="00 : 00"),t.finishDate||(t.finishDate="23 : 59");const n=this.getFormattedDate(t.date,+t.startDate.split(":")[0],+t.startDate.split(":")[1]),a=this.getFormattedDate(t.date,+t.finishDate.split(":")[0],+t.finishDate.split(":")[1]),i={startDate:this.pipe.transform(n,"yyyy-MM-ddTHH:mm:ssZZZZZ"),finishDate:this.pipe.transform(a,"yyyy-MM-ddTHH:mm:ssZZZZZ"),coordinates:{latitude:t.coordinatesDto.latitude,longitude:t.coordinatesDto.longitude},onlineLink:t.onlineLink};return e.push(i),e},[])}onSubmit(){let e;this.checkDates(),this.checkdates&&(e=this.createDates());const t=this.filters.filter(e=>e.isActive).reduce((e,t)=>[...e,t.name],[]),n={title:this.titleForm.value,description:this.editorHTML,open:this.isOpen,datesLocations:e,tags:t};if(this.checkdates&&this.titleForm.valid&&this.contentValid){this.checkAfterSend=!0;const e=new FormData,t=JSON.stringify(n);e.append("addEventDtoRequest",t),this.imgArray.forEach(t=>{e.append("images",t)}),this.isPosting=!0,this.eventService.createEvent(e).pipe(Object(F.a)(e=>(this.snackBar.openSnackBar("Oops, something went wrong. Please reload page or try again later."),this.router.navigate(["/events"]),Object(P.a)(e)))).subscribe(()=>{this.isPosting=!1,this.router.navigate(["/events"])})}else this.titleForm.markAsTouched(),this.checkAfterSend=!1}};S.ctorParameters=()=>[{type:D},{type:k.g},{type:i.Injector}],S=Object(a.__decorate)([Object(i.Component)({selector:"app-create-edit-events",template:Object(a.__importDefault)(n("tg6x")).default,styles:[Object(a.__importDefault)(n("i48p")).default]})],S);var T=n("9ED3");let M=class{constructor(e,t){this.eventService=e,this.userOwnAuthService=t,this.eventsList=[],this.destroyed$=new C.a(1),this.total=0,this.page=0}ngOnInit(){this.checkUserSingIn(),this.userOwnAuthService.getDataFromLocalStorage(),this.eventService.getEvents(this.page,9).subscribe(e=>{this.eventsList=[...e.page],this.total=e.totalElements})}checkUserSingIn(){this.userOwnAuthService.credentialDataSubject.subscribe(e=>this.isLoggedIn=e&&e.userId)}setPage(e){this.page=e,this.eventService.getEvents(e-1,9).subscribe(e=>{this.eventsList=[...e.page]})}ngOnDestroy(){this.destroyed$.next(!0),this.destroyed$.complete()}};M.ctorParameters=()=>[{type:D},{type:T.a}],M=Object(a.__decorate)([Object(i.Component)({selector:"app-events-list",template:Object(a.__importDefault)(n("BRC3")).default,styles:[Object(a.__importDefault)(n("aEgp")).default]})],M);var $=n("82Ky");let R=class{constructor(e,t){this.translate=e,this.localStorageService=t}ngOnInit(){this.bindLang(this.localStorageService.getCurrentLanguage())}bindLang(e){this.translate.setDefaultLang(e)}};R.ctorParameters=()=>[{type:o.c},{type:$.a}],R=Object(a.__decorate)([Object(i.Component)({selector:"app-events",template:Object(a.__importDefault)(n("HlEG")).default,styles:[Object(a.__importDefault)(n("4y86")).default]})],R);const q=[{path:"",component:R,children:[{path:"",component:M},{path:"create-event",component:S}]}];let z=class{};z=Object(a.__decorate)([Object(i.NgModule)({imports:[k.i.forChild(q)],exports:[k.i]})],z);var G=n("FKr1");let N=class{constructor(e){this.mapsAPILoader=e,this.minDate=new Date,this.timeArrStart=[],this.timeArrEnd=[],this.timeArr=[],this.coordinates={latitude:null,longitude:null},this.regionOptions={types:["(regions)"],componentRestrictions:{country:"UA"}},this.status=new i.EventEmitter,this.datesForm=new i.EventEmitter,this.coordOffline=new i.EventEmitter}ngOnInit(){const e=(new Date).getDate();this.minDate.setDate(e+1),this.fillTimeArray(),this.dateForm=new u.h({date:new u.f("",[u.v.required]),startTime:new u.f("",[u.v.required]),endTime:new u.f("",[u.v.required])}),this.dateForm.valueChanges.subscribe(e=>{this.checkStartTime(e.startTime),this.checkEndTime(e.endTime),this.coordOffline.emit(this.coordinates),this.status.emit(this.dateForm.valid),this.datesForm.emit(e)})}checkIfAllDay(e){e.checked?(this.dateForm.get("startTime").disable(),this.dateForm.get("endTime").disable()):(this.dateForm.get("startTime").enable(),this.dateForm.get("endTime").enable())}ngOnChanges(){this.check&&this.dateForm.markAllAsTouched()}checkIfOnline(e){e.checked?this.dateForm.addControl("onlineLink",new u.f("",[u.v.required,u.v.pattern(/^$|^https?:\/\//)])):this.dateForm.removeControl("onlineLink")}checkIfOffline(e){e.checked?(this.isOfline=!0,this.dateForm.addControl("place",new u.f("",[u.v.required])),setTimeout(()=>this.setPlaceAutocomplete(),0)):(this.isOfline=!1,this.coordinates.latitude=null,this.coordinates.longitude=null,this.coordOffline.emit(this.coordinates),this.autocomplete.unbindAll(),this.dateForm.removeControl("place"))}setPlaceAutocomplete(){this.mapsAPILoader.load().then(()=>{this.autocomplete=new google.maps.places.Autocomplete(this.placesRef.nativeElement,this.regionOptions),this.autocomplete.addListener("place_changed",()=>{const e=this.autocomplete.getPlace();this.coordinates.latitude=e.geometry.location.lat(),this.coordinates.longitude=e.geometry.location.lng(),this.coordOffline.emit(this.coordinates),this.dateForm.patchValue({place:e.formatted_address})})})}fillTimeArray(){for(let e=0;e<24;e++)this.timeArr.push(e+" : 00"),this.timeArrStart.push(e+" : 00"),this.timeArrEnd.push(e+" : 00")}checkEndTime(e){if(e){const t=e.split(":");this.timeArrStart=[...this.timeArr.slice(0,+t[0])]}}checkStartTime(e){if(e){const t=e.split(":");this.timeArrEnd=23==+t[0]?["23 : 59"]:[...this.timeArr.slice(+t[0]+1)]}}};N.ctorParameters=()=>[{type:h.c}],Object(a.__decorate)([Object(i.Input)()],N.prototype,"check",void 0),Object(a.__decorate)([Object(i.Output)()],N.prototype,"status",void 0),Object(a.__decorate)([Object(i.Output)()],N.prototype,"datesForm",void 0),Object(a.__decorate)([Object(i.Output)()],N.prototype,"coordOffline",void 0),Object(a.__decorate)([Object(i.ViewChild)("placesRef")],N.prototype,"placesRef",void 0),N=Object(a.__decorate)([Object(i.Component)({selector:"app-event-date-time-picker",template:Object(a.__importDefault)(n("B6en")).default,styles:[Object(a.__importDefault)(n("7Y0F")).default]})],N);let H=class{constructor(e){this.mapsAPILoader=e,this.location=new i.EventEmitter,this.regionOptions={types:["(regions)"],componentRestrictions:{country:"UA"}}}ngOnInit(){this.isPlaceChoosed=!1,this.mapDeactivate=!1,this.mapsAPILoader.load().then(()=>{this.geoCoder=new google.maps.Geocoder})}onMapReady(e){this.map=e,this.setUserLocation()}showCurLocation(){this.setUserLocation()}setUserLocation(){navigator.geolocation.getCurrentPosition(e=>{this.mapDeactivate?this.map.setCenter({lat:e.coords.latitude,lng:e.coords.longitude}):this.map.setCenter({lat:49.84579567734425,lng:24.025124653312258})})}addMarker(e){if(!this.isPlaceChoosed){this.location.emit(e);const t={location:{lat:e.coords.lat,lng:e.coords.lng},animation:"DROP"};this.getAddress(e.coords.lat,e.coords.lng),this.eventPlace=t,this.isPlaceChoosed=!0}}markerOver(e){this.markerContent=this.adress,e.animation="BOUNCE"}markerOut(e){this.markerContent="",e.animation=""}deletePlace(){this.eventPlace=null,this.isPlaceChoosed=!1,this.adress=""}getAddress(e,t){this.geoCoder.geocode({location:{lat:e,lng:t}},(e,t)=>{"OK"===t?e[0]?this.adress=e[0].formatted_address:window.alert("No results found"):window.alert("Geocoder failed due to: "+t)})}};H.ctorParameters=()=>[{type:h.c}],Object(a.__decorate)([Object(i.Output)()],H.prototype,"location",void 0),H=Object(a.__decorate)([Object(i.Component)({selector:"app-map-event",template:Object(a.__importDefault)(n("gSny")).default,styles:[Object(a.__importDefault)(n("98Gv")).default]})],H);let U=class{constructor(){this.isImageTypeError=!1,this.dragAndDropLabel="+",this.imgArray=[],this.imagesCount=5,this.images=[],this.imageCount=0,this.imgArrayOutput=new i.EventEmitter}ngOnInit(){this.initImages()}initImages(){for(let e=0;e<this.imagesCount;e++)this.images.push({src:null,label:this.dragAndDropLabel,isLabel:!1});this.images[0].isLabel=!0}filesDropped(e){const t=e[0].file;this.transferFile(t)}transferFile(e){if(!this.isImageTypeError){const t=new FileReader;this.imgArray.push(e),this.imgArrayOutput.emit(this.imgArray),t.readAsDataURL(e),t.onload=()=>{this.assignImage(t.result)}}}assignImage(e){for(let t=0;t<this.images.length;t++)if(!this.images[t].src){this.images[t].src=e,this.images[t+1]&&(this.images[t+1].isLabel=!0),this.images[t].isLabel=!1,this.imageCount++;break}}deleteImage(e){this.images.splice(e,1),this.imgArray.splice(e,1),this.imgArrayOutput.emit(this.imgArray),this.images.push({src:null,label:this.dragAndDropLabel,isLabel:!1}),this.imageCount--}loadFile(e){const t=e.target.files[0];this.InputVar.nativeElement.value="",this.transferFile(t)}};Object(a.__decorate)([Object(i.ViewChild)("takeInput")],U.prototype,"InputVar",void 0),Object(a.__decorate)([Object(i.Output)()],U.prototype,"imgArrayOutput",void 0),U=Object(a.__decorate)([Object(i.Component)({selector:"app-images-container",template:Object(a.__importDefault)(n("7+5l")).default,styles:[Object(a.__importDefault)(n("QDJE")).default]})],U);var B=n("7itd");let V=class{};function Z(e){return new l.a(e,"./assets/i18n/",".json")}V=Object(a.__decorate)([Object(i.NgModule)({declarations:[R,M,S,N,H,U],imports:[u.t,B.GooglePlaceModule,s.c,z,r.a,d.c,m.b,y.a,h.a,h.a.forRoot({apiKey:g.a.apiMapKey,libraries:["places"]}),c.e,G.l,p.b,v.a,f.a,b.a,o.b.forChild({loader:{provide:o.a,useFactory:Z,deps:[O.b]},isolate:!0}),x.a.forRoot()],exports:[o.b]})],V)},tg6x:function(e,t,n){"use strict";n.r(t),t.default='<app-spinner *ngIf="isPosting"></app-spinner>\n<div *ngIf="!isPosting" class="event-container">\n  <a [routerLink]="[\'/events\']">\n    <div class="edit-news">back</div>\n  </a>\n  <div class="event-header">\n    <h3>Create Event</h3>\n    <p>\n      Please provide as much details as you can - place and time of event, the goal of gathering etc. You can come back and update event\n      anytime after publishing\n    </p>\n  </div>\n  <div class="event-main">\n    <mat-card class="event-main-block left">\n      <div class="main-title">\n        <div class="title-input">\n          <div class="title-wrapper">\n            <mat-label>Enter name for Event</mat-label>\n            <mat-label>{{ titleForm.value.length }}/70</mat-label>\n          </div>\n          <mat-form-field appearance="outline" class="event-input">\n            <mat-label>Event name up to 70 symbols.</mat-label>\n            <input matInput placeholder="title" [formControl]="titleForm" />\n          </mat-form-field>\n        </div>\n        <div class="duration-choice">\n          <mat-label>Duration</mat-label>\n          <mat-form-field appearance="outline" class="date-item">\n            <mat-select (selectionChange)="setDateCount($event)">\n              <mat-option *ngFor="let date of dateArrCount" [value]="date">\n                {{ date }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n      </div>\n\n      <div class="dateContainer">\n        <div *ngFor="let date of dates; index as i" class="dateEvent">\n          <span class="date-day">{{ i + 1 }} day</span>\n          <div class="date-event-block">\n            <app-event-date-time-picker\n              (datesForm)="checkForm($event, i)"\n              (coordOffline)="setCoordsOnlOff($event, i)"\n              (status)="checkStatus($event, i)"\n              [check]="date.check"\n            ></app-event-date-time-picker>\n          </div>\n        </div>\n      </div>\n\n      <div class="textarea-wrapper">\n        <h3 class="textarea-title">Events Description</h3>\n        <div [ngClass]="contentValid || checkAfterSend ? \'content\' : \'content content-error\'">\n          <quill-editor\n            class="editor"\n            [modules]="quillModules"\n            placeholder="{{ \'create-news.content-placeholder\' | translate }}"\n            (onEditorChanged)="changedEditor($event)"\n          ></quill-editor>\n        </div>\n        <p class="textarea-description">{{ \'create-news.content-tooltip\' | translate }}</p>\n      </div>\n    </mat-card>\n    <mat-card class="event-main-block right">\n      <app-images-container (imgArrayOutput)="getImageTosend($event)"></app-images-container>\n\n      <div class="buttons-container">\n        <mat-label>Initiative type</mat-label>\n        <div>\n          <ul class="ul-eco-buttons" aria-label="filter by items">\n            <li *ngFor="let filter of filters">\n              <a\n                role="button"\n                [attr.aria-pressed]="filter.isActive"\n                class="custom-chip global-tag"\n                [ngClass]="{ \'global-tag-clicked\': filter.isActive }"\n                tabindex="0"\n                (click)="checkTab(filter)"\n              >\n                <span class="text">{{ filter.name | translate }}</span>\n                <div [ngClass]="{ \'global-tag-close-icon\': filter.isActive }"></div>\n              </a>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n      <div class="buttons-container">\n        <mat-label>Event type</mat-label>\n        <div class="flex-container">\n          <a\n            role="button"\n            class="custom-chip global-tag"\n            [ngClass]="{ \'global-tag-clicked\': isOpen }"\n            tabindex="0"\n            (click)="changeToOpen()"\n          >\n            <span class="text">open</span>\n            <div [ngClass]="{ \'global-tag-close-icon\': isOpen }"></div>\n          </a>\n          <a\n            role="button"\n            class="custom-chip global-tag"\n            [ngClass]="{ \'global-tag-clicked\': !isOpen }"\n            tabindex="0"\n            (click)="changeToClose()"\n          >\n            <span class="text">close</span>\n            <div [ngClass]="{ \'global-tag-close-icon\': !isOpen }"></div>\n          </a>\n        </div>\n      </div>\n\n      <mat-form-field appearance="fill">\n        <mat-label>Invite</mat-label>\n        <select matNativeControl required>\n          <option value="All">All</option>\n          <option value="Frends">Frends</option>\n        </select>\n      </mat-form-field>\n    </mat-card>\n  </div>\n\n  <div class="submit-container">\n    <button mat-raised-button class="button" (click)="escapeFromCreateEvent()">Cancel</button>\n    <button mat-raised-button class="secondary-global-button">Preview</button>\n    <button mat-raised-button class="primary-global-button" (click)="onSubmit()">Publish</button>\n  </div>\n</div>\n'}}]);