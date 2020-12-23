import { Component, OnInit } from '@angular/core';

type TDate = {
  value: Date;
  viewValue: string;
};

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  dates: TDate[] = [];

  ngOnInit() {
    this.generateNext4Months();
  }

  generateNext4Months() {
    const now = new Date();

    for (let i = 1; i < 5; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      this.dates.push({
        value: date,
        viewValue: `${date.toLocaleString('default', {
          month: 'long'
        })} ${date.getFullYear()}`
      });
    }
  }
}
