import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertService } from 'ngx-alerts';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CalendarService } from 'src/app/shared/services/calendar.service';

@Component({
  selector: 'app-user-edit-preferences',
  templateUrl: './user-edit-preferences.component.html',
  styleUrls: ['./user-edit-preferences.component.sass'],
})
export class UserEditPreferencesComponent implements OnInit {
  form!: FormGroup;
  love!: boolean;
  sport!: boolean;
  culture!: boolean;
  areaList: boolean[] = []; // list of selected areas of life used for display
  selectedItems: number[] = []; // list of selected areas of life
  option1 = 1; // id love
  option2 = 3; // id sport
  option3 = 2; // id culture
  choose!: boolean;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    public userService: UserService,
    public Preferences: PreferencesService,
    public fb: FormBuilder,
    public calendarService: CalendarService
  ) {}

  buttonAddClicked!: boolean;
  buttonDeleteClicked!: boolean;

  ngOnInit(): void {
    this.selectedItems = new Array<number>();
    this.userService.preferences();
    this.buttonAddClicked = false;
    this.love = false;
    this.culture = false;
    this.sport = false;
    this.areaList = new Array<boolean>();
    this.buttonDeleteClicked = false;
    this.choose = false;

    this.form = this.fb.group({
      categories: [''],
    });
  }

  async chooseCalendar() {
    this.calendarService.pickCalendarFlag = false;
    this.calendarService.eventArray.length = 0;
    await this.calendarService
      .sendCalendarId(' ')
      .toPromise()
      .then(() => {
        this.calendarService.pickCalendarFlag = this.calendarService.setFlag();
        this.authService.changePage('main');
      });
  }

  clickButtonAdd() {
    if (this.buttonAddClicked == false) {
      this.buttonAddClicked = true;
    } else {
      this.buttonAddClicked = false;
    }

    this.buttonDeleteClicked = false;
    this.areaList = [];
  }

  clickButtonDelete() {
    if (this.buttonDeleteClicked == false) {
      this.buttonDeleteClicked = true;
    } else {
      this.buttonDeleteClicked = false;
    }
    this.buttonAddClicked = false;
    this.areaList = [];
  }

  changeOptionLove() {
    if (this.love == true) {
      this.love = false;
    } else {
      this.love = true;
    }

    return this.love;
  }

  changeOptionSport() {
    if (this.sport == true) {
      this.sport = false;
    } else {
      this.sport = true;
    }

    return this.sport;
  }

  changeOptionCulture() {
    if (this.culture == true) {
      this.culture = false;
    } else {
      this.culture = true;
    }
    return this.culture;
  }

  onSubmit() {
    const preferencesObserver = {
      next: (x) => {
        console.log('Edit Preferences OK');
        this.alertService.success('Sent correctly ');
        // this.authService.changePage('/my-profile')
      },
      error: (err) => {
        console.log(err);
        this.alertService.danger(err.error.message);
      },
    };

    this.areaList.push(this.love);
    this.areaList.push(this.sport);
    this.areaList.push(this.culture);
    console.log('areaList', this.areaList);
    this.choose = true;
    this.form.patchValue({ categories: this.selectedItems });
    this.Preferences.preferences(this.form.value).subscribe(
      preferencesObserver
    );
  }

  onDelete() {
    const preferencesDeleteObserver = {
      next: (x) => {
        this.alertService.success('Area deleted');
        this.authService.changePage('/my-profile');
      },
      error: (err) => {
        this.alertService.danger(err.error.message);
      },
    };
    console.log(this.selectedItems);
    if (this.selectedItems.indexOf(3) != -1) {
      this.Preferences.deletePreferences(3).subscribe(
        preferencesDeleteObserver
      );
    }
    if (this.selectedItems.indexOf(2) != -1) {
      this.Preferences.deletePreferences(2).subscribe(
        preferencesDeleteObserver
      );
    }
    if (this.selectedItems.indexOf(1) != -1) {
      this.Preferences.deletePreferences(1).subscribe(
        preferencesDeleteObserver
      );
    }
  }

  getAreaId(e: any, categories: number) {
    if (e.target.checked) {
      this.selectedItems.push(categories);
    } else {
      this.selectedItems = this.selectedItems.filter((m) => m != categories);
    }
    return this.selectedItems;
  }
}
