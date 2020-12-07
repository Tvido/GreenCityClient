import { UserSharedModule } from './components/shared/user-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgmCoreModule } from '@agm/core';
import { MatSliderModule } from '@angular/material/slider';
import {
  ButtonComponent,
  HabitTrackersComponent,
  HabitTrackerComponent,
  AdviceComponent,
  HabitChartComponent,
  HabitEstimationComponent,
  DayEstimationComponent,
  HabitItemComponent,
  HabitItemListComponent,
  HabitFactComponent,
  HabitTitleComponent,
  HabitTrackerDateComponent,
  UserHabitPageComponent,
  UserLogComponent,
  ProfileComponent,
  CalendarComponent,
  EcoPlacesComponent,
  ProfileCardsComponent,
  ProfileDashboardComponent,
  OneHabitComponent,
  ProfileWidgetComponent,
  ProfileHeaderComponent,
  ProfileProgressComponent,
  ShoppingListComponent,
  AchievementItemComponent,
  AchievementListComponent,
  UserAchievementsComponent,
  NewAchievementModalComponent,
  UserSidebarComponent,
  UserSettingComponent,
  AddGoalComponent,
  AddGoalListComponent,
  AddCustomGoalComponent,
  AddGoalItemComponent,
  UpdateGoalStatusListComponent,
  UpdateGoalItemComponent,
  AddGoalButtonComponent,
  GoalContainerComponent,
  GoalItemComponent,
  GoalListComponent,
  EditProfileComponent,
  PersonalPhotoComponent,
  SocialNetworksComponent,
} from './components';
import { CustomLastPipe } from '../../pipe/custom-last-pipe/custom-first.pipe';
import { ShowFirstNLettersPipe } from '../../pipe/show-first-n-letters/show-first-n-letters.pipe';
import { ShowFirstNPipe } from '../../pipe/show-first-n-pipe/show-first-n.pipe';
import { UncheckedFirstPipe } from '../../pipe/unchecked-first-pipe/unchecked-first.pipe';
import { AlphabeticalPipePipe } from '../../pipe/alphabetical-pipe/alphabetical-pipe.pipe';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CalendarWeekComponent } from './components/profile/calendar/calendar-week/calendar-week.component';
import { AllHabitsComponent } from './components/habit/all-habits/all-habits.component';
import { HabitsListViewComponent } from './components/habit/all-habits/components/habits-list-view/habits-list-view.component';
import { EditProfileFormBuilder } from '@global-user/components/profile/edit-profile/edit-profile-form-builder';
import { UsersFriendsComponent } from './components/profile/users-friends/users-friends.component';
import { UsersAchievementsComponent } from './components/profile/users-achievements/users-achievements.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AddFriendComponent } from './components/profile/users-friends/add-friend/add-friend.component';
import { AddFriendsListComponent } from './components/profile/users-friends/add-friends-list/add-friends-list.component';
import { HabitProgressComponent } from './components/habit/add-new-habit/habit-progress/habit-progress.component';
import { HabitInviteFriendsComponent } from './components/habit/add-new-habit/habit-invite-friends/habit-invite-friends.component';
import { HabitDurationComponent } from './components/habit/add-new-habit/habit-duration/habit-duration.component';
import {
  HabitEditShoppingListComponent
 } from './components/habit/add-new-habit/habit-edit-shopping-list/habit-edit-shopping-list.component';
import { HabitCalendarComponent } from './components/habit/add-new-habit/habit-calendar/habit-calendar.component';
import { AddNewHabitComponent } from './components/habit/add-new-habit/add-new-habit.component';
import { GradientDirective } from './components/habit/add-new-habit/habit-duration/gradient.directive';

@NgModule({
  declarations: [
    UserComponent,
    ProfileCardsComponent,
    ProfileDashboardComponent,
    OneHabitComponent,
    AchievementItemComponent,
    AchievementListComponent,
    UserAchievementsComponent,
    NewAchievementModalComponent,
    AddGoalComponent,
    AddGoalListComponent,
    AddCustomGoalComponent,
    AddGoalItemComponent,
    UpdateGoalStatusListComponent,
    UpdateGoalItemComponent,
    AddGoalButtonComponent,
    GoalContainerComponent,
    GoalItemComponent,
    GoalListComponent,
    UserSettingComponent,
    UserSidebarComponent,
    UserHabitPageComponent,
    ButtonComponent,
    UserLogComponent,
    HabitTrackersComponent,
    AdviceComponent,
    HabitChartComponent,
    HabitEstimationComponent,
    DayEstimationComponent,
    HabitItemComponent,
    HabitItemListComponent,
    HabitFactComponent,
    HabitTitleComponent,
    HabitTrackerDateComponent,
    HabitTrackerComponent,
    CustomLastPipe,
    ShowFirstNLettersPipe,
    ShowFirstNPipe,
    UncheckedFirstPipe,
    AlphabeticalPipePipe,
    ProfileWidgetComponent,
    ProfileHeaderComponent,
    ProfileProgressComponent,
    ProfileComponent,
    EcoPlacesComponent,
    ShoppingListComponent,
    CalendarComponent,
    EditProfileComponent,
    PersonalPhotoComponent,
    SocialNetworksComponent,
    AllHabitsComponent,
    HabitsListViewComponent,
    CalendarWeekComponent,
    UsersFriendsComponent,
    UsersAchievementsComponent,
    AddFriendComponent,
    AddFriendsListComponent,
    AddNewHabitComponent,
    HabitProgressComponent,
    HabitInviteFriendsComponent,
    HabitDurationComponent,
    HabitEditShoppingListComponent,
    HabitCalendarComponent,
    GradientDirective
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    MatSliderModule,
    DragDropModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3xs7Kczo46LFcQRFKPMdrE0lU4qsR_S4',
      libraries: ['places']
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    InfiniteScrollModule,
    UserSharedModule
  ],
  providers: [
    EditProfileFormBuilder
  ]
})
export class UserModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
