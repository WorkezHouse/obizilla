import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule here

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CalendarModule, FormsModule, HttpClientModule, CommonModule], // Add CommonModule to imports
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  currentDate?: Date;
  userID = '599d63fc-11fb-474e-863b-3235f51e1dbd';
  affiliateData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.fetchAffiliateDetails();
  }

  fetchAffiliateDetails(): void {
    const url = `https://webhook.workez.online/webhook/4ba7842e-4fcd-49ac-8c05-d6856a1e08fa/getAffiliateDetails/${this.userID}`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.affiliateData = data;
        console.log(this.affiliateData.data);
      },
      error: (error) => {
        console.error('Error fetching affiliate details:', error);
      }
    });
  }
}
