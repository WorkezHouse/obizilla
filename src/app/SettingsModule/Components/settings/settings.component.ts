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

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Optional: Verify elements are loaded
    console.log('pwHolder:', this.pwHolder);
    console.log('resetPw:', this.resetPw);
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
