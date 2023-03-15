import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DashboardListItem } from './dashboard-list-item.model';
import { Dashboard } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private apiGetMeasurementUrl = `${environment.apiBaseUrl}/Radi/GetMeasurements`;
  private apiGenerateUrl = `${environment.apiBaseUrl}/Radi/Generate`;
  private apiPayUrl = `${environment.apiBaseUrl}/Radi/Pay`;

  dashboardResponse: Dashboard | undefined;

  displayedColumns: string[] = ["id", "name", "payedAt", "row-actions"];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.refreshDashboard();
  }

  refreshDashboard() : void {
    this.httpClient.get<Dashboard>(this.apiGetMeasurementUrl)
      .subscribe((response: Dashboard) => {
        this.dashboardResponse = response;
      });
  }

  generateNew() : void {
    this.httpClient.post(this.apiGenerateUrl, {})
      .subscribe((_) => {
        this.refreshDashboard();
      });
  }

  pay(item: DashboardListItem) : void {
    this.httpClient.post(this.apiPayUrl, {
      id: item.id
    })
      .subscribe((_) => {
        this.refreshDashboard();
      });
  }

}
