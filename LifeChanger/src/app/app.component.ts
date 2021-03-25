import { Component } from '@angular/core';
import { MenuClickService } from './services/menu-click.service';
import { UserDataService } from './services/user-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [MenuClickService, UserDataService],
})
export class AppComponent {
  title = 'LifeChanger';

}
