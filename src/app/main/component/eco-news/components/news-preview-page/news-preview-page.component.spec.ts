import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CreateEcoNewsService } from '@eco-news-service/create-eco-news.service';
import { NewsResponseDTO } from '@eco-news-models/create-news-interface';
import { EcoNewsModel } from '@eco-news-models/eco-news-model';
import { ACTION_CONFIG, ACTION_TOKEN } from '../create-edit-news/action.constants';
import { NewsPreviewPageComponent } from './news-preview-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EcoNewsComponent } from '../../eco-news.component';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';

describe('NewsPreviewPageComponent', () => {
  let component: NewsPreviewPageComponent;
  let fixture: ComponentFixture<NewsPreviewPageComponent>;

  let currentFormWithImageMock: FormGroup;
  let currentFormWithoutImageMock: FormGroup;
  let newsResponseMock: NewsResponseDTO;
  let itemMock: EcoNewsModel;
  let router: Router;

  const storeMock = jasmine.createSpyObj('store', ['select', 'dispatch']);

  const actionSub: ActionsSubject = new ActionsSubject();

  const createEcoNewsServiceMock = jasmine.createSpyObj('CreateEcoNewsService', [
    'getFormData',
    'getNewsId',
    'isBackToEditing',
    'sendFormData',
    'editNews'
  ]);
  createEcoNewsServiceMock.getFormData = () => currentFormWithImageMock;
  createEcoNewsServiceMock.isBackToEditing = true;
  createEcoNewsServiceMock.sendFormData = (previewItem) => of(newsResponseMock);
  createEcoNewsServiceMock.editNews = (form) => of(newsResponseMock);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsPreviewPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'news', component: EcoNewsComponent }]),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: CreateEcoNewsService, useValue: createEcoNewsServiceMock },
        { provide: ACTION_TOKEN, useValue: ACTION_CONFIG },
        { provide: Store, useValue: storeMock },
        { provide: ActionsSubject, useValue: actionSub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPreviewPageComponent);
    component = fixture.componentInstance;
    component.attributes = {
      btnCaption: 'send',
      title: 'title test'
    };
    component.images.largeImage = 'assets/img/icon/econews/news-default-large.png';
    component.isPosting = false;

    currentFormWithImageMock = new FormGroup({
      content: new FormControl('content for current form with image'),
      image: new FormControl('assets/img/icon/econews/news-default-large.png'),
      source: new FormControl('source for current form with image'),
      tags: new FormControl(['news, ads']),
      title: new FormControl('title for current form with image')
    });

    currentFormWithoutImageMock = new FormGroup({
      content: new FormControl('content for current form without image'),
      image: new FormControl(''),
      source: new FormControl('source for current form without image'),
      tags: new FormControl(['news, ads']),
      title: new FormControl('title for current form without image')
    });

    newsResponseMock = {
      id: 8888,
      text: 'test of text',
      title: 'test of title',
      ecoNewsAuthorDto: { id: 1617, firstName: 'Anton', lastName: 'Hryshko' },
      creationDate: '2020-10-26T16:43:29.336931Z',
      imagePath: 'assets/img/icon/econews/news-default-large.png',
      tags: ['Events', 'Education']
    };

    itemMock = {
      author: { id: 1616, name: 'Hryshko' },
      creationDate: '2020-10-26T16:43:29.336931Z',
      id: 7777,
      imagePath: 'assets/img/icon/econews/news-default-large.png',
      tagsEn: ['Events', 'Education'],
      tagsUa: ['Події', 'Освіта'],
      tags: ['Events', 'Education'],
      content: 'text for itemMock',
      title: 'title for itemMock',
      likes: 0,
      countComments: 2,
      shortInfo: 'info',
      source: null
    };

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create component', () => {
    createEcoNewsServiceMock.getNewsId.and.returnValue('15');
    expect(component).toBeTruthy();
  });

  it('method isBackToEdit should change isBackToEditing to true', () => {
    jasmine.clock().install();
    component.isBackToEdit();
    expect(createEcoNewsServiceMock.isBackToEditing).toBe(true);
    jasmine.clock().tick(1001);
    expect(createEcoNewsServiceMock.isBackToEditing).toBe(false);
    jasmine.clock().uninstall();
  });

  it('testing of method postNewItem', () => {
    component.isPosting = false;
    component.postNewsItem();
    expect(component.isPosting).toBe(true);
  });

  it('testing of method editNews', () => {
    component.isPosting = false;
    const dataToEdit = {
      ...component.previewItem.value,
      id: component.newsId
    };

    component.editNews();

    expect(dataToEdit).toBeTruthy();

    createEcoNewsServiceMock.editNews(dataToEdit).subscribe(() => {
      expect(component.isPosting).toBe(true);
    });
  });

  it('if we do not have image in our form method getItemPath should return largeImage', () => {
    component.previewItem = currentFormWithoutImageMock;
    const result = component.getImagePath();
    expect(result).toEqual(component.images.largeImage);
  });

  it('if method of service getNewsId does not return id', () => {
    createEcoNewsServiceMock.getNewsId.and.returnValue('');
    expect(component.attributes).toBeDefined();
    expect(component.onSubmit).toBeDefined();
  });
});
