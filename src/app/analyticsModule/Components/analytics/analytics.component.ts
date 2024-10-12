import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CalendarModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  currentDate?: Date;

  ngOnInit(): void {

    this.currentDate = new Date();
    console.log('Data atual:', this.currentDate);
  }
}
