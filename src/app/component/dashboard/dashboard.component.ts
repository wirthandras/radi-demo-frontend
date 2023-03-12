import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardListItem } from './dashboard-list-item.model';
import { Dashboard } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardResponse: Dashboard | undefined;

  displayedColumns: string[] = ["id", "name", "payedAt", "row-actions"];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.refreshDashboard();
  }

  refreshDashboard() : void {
    this.httpClient.get<Dashboard>("https://localhost:44352/Radi/GetMeasurements")
      .subscribe((response: Dashboard) => {
        this.dashboardResponse = response;
      });
  }

  generateNew() : void {
    this.httpClient.post("https://localhost:44352/Radi/Generate", {})
      .subscribe((_) => {
        this.refreshDashboard();
      });
  }

  pay(item: DashboardListItem) : void {
    this.httpClient.post("https://localhost:44352/Radi/Pay", {
      id: item.id
    })
      .subscribe((_) => {
        this.refreshDashboard();
      });
  }

}
