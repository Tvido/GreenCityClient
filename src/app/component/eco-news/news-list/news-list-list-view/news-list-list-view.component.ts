import { Component, OnInit, Input } from '@angular/core';
import { EcoNewsModel } from 'src/app/model/eco-news/eco-news-model';
import { ecoNewsIcons } from 'src/assets/img/icon/econews/profile-icons';

@Component({
  selector: 'app-news-list-list-view',
  templateUrl: './news-list-list-view.component.html',
  styleUrls: ['./news-list-list-view.component.css']
})
export class NewsListListViewComponent implements OnInit {
  @Input() ecoNewsModel: EcoNewsModel;
  profileIcons = ecoNewsIcons;
  private newsText: string;
  private newsImage: string;

  constructor() { }

  ngOnInit() {
    this.textValidationOfMinCharacters();
  }

  private textValidationOfMinCharacters(): string {
    return this.newsText = (this.ecoNewsModel.text.length >= 198) ?
      ((this.ecoNewsModel.text).slice(0, 197) + '...') : (this.ecoNewsModel.text);
  }

  private checkNewsImage(): string {
    return this.newsImage = this.ecoNewsModel.imagePath ?
      this.ecoNewsModel.imagePath : this.profileIcons.newsDefaultPictureList;
  }
}
