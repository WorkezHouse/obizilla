import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'] // Note: styleUrl should be style**s**Url
})
export class SettingsComponent implements AfterViewInit {
  sidebarVisible: boolean = false;

  @ViewChild('pwHolder') pwHolder!: ElementRef;
  @ViewChild('resetPw') resetPw!: ElementRef;
  @ViewChild('mailHolder') mailHolder!: ElementRef;
  @ViewChild('changeMail') changeMail!: ElementRef;
  @ViewChild('nameHolder') nameHolder!: ElementRef;
  @ViewChild('changeName') changeName!: ElementRef;


  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    // Optional: Verify elements are loaded
    console.log('pwHolder:', this.pwHolder);
    console.log('resetPw:', this.resetPw);
  }

  changeMailActive() {
    if (this.mailHolder && this.changeMail) {
      // Set .pw-holder display to none
      this.mailHolder.nativeElement.style.display = 'none';

      // Set #reset-pw display to flex
      this.changeMail.nativeElement.style.display = 'flex';
    } else {
      console.error('Elements not found');
    }
  }


  changeNameActive() {
    // Ensure the elements are available before accessing
    if (this.nameHolder && this.changeName) {
      // Set .pw-holder display to none
      this.nameHolder.nativeElement.style.display = 'none';

      // Set #reset-pw display to flex
      this.changeName.nativeElement.style.display = 'flex';
    } else {
      console.error('Elements not found');
    }

  }
  changePwActive() {
    // Ensure the elements are available before accessing
    if (this.pwHolder && this.resetPw) {
      // Set .pw-holder display to none
      this.pwHolder.nativeElement.style.display = 'none';

      // Set #reset-pw display to flex
      this.resetPw.nativeElement.style.display = 'flex';
    } else {
      console.error('Elements not found');
    }
  }
}
