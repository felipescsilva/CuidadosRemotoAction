import { Component, OnInit } from '@angular/core';

interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-register',
  templateUrl: './schedule-register.component.html',
  styleUrls: ['./schedule-register.component.scss']
})
export class ScheduleRegisterComponent implements OnInit {

  DaysOfWeek: DaysOfWeek[] = [{value: '0', viewValue: 'Domingo'},{value: '1', viewValue: 'Segunda'},{value: '2', viewValue: 'Terça'},{value: '3', viewValue: 'Quarta'},{value: '4', viewValue: 'Quinta'},{value: '5', viewValue: 'Sexta'},{value: '6', viewValue: 'Sábado'}];

  constructor() { }

  ngOnInit(): void {
  }

}
