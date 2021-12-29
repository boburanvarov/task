import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginValidators } from './login.validators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  aeroflotTarifs = [
    {
      id: 'economy',
      title: "Эконом",
      salary: 0
    },
    {
      id: 'advanced',
      title: "Продвинутый",
      salary: 0
    },
    {
      id: 'lux',
      title: "Люкс",
      salary: 0
    },
  ]


  rjdTarifs = [
    {
      id: 'economy',
      title: "Эконом",
      salary: 0
    },
    {
      id: 'advanced',
      title: "Продвинутый",
      salary: 0
    },
    {
      id: 'lux',
      title: "Люкс",
      salary: 0
    },
  ];

  aeroflot: any = {
    economy: {
      km: 4,
      free_baggage: 5,
      paid_baggage: 4000,
      max_baggage: 20,
      discount_age: 0,
      discount_percent: 0
    },
    advanced: {
      km: 8,
      free_baggage: 20,
      paid_baggage: 5000,
      max_baggage: 50,
      discount_age: 5,
      discount_percent: 30
    },
    lux: {
      km: 15,
      free_baggage: 0,
      paid_baggage: 0,
      max_baggage: 50,
      discount_age: 16,
      discount_percent: 30
    }
  }


  rjd: any = {
    economy: {
      km: 0.5,
      free_baggage: 15,
      paid_baggage: 50,
      max_baggage: 50,
      discount_age: 5,
      discount_percent: 50
    },
    advanced: {
      km: 2,
      free_baggage: 20,
      paid_baggage: 50,
      max_baggage: 60,
      discount_age: 8,
      discount_percent: 30
    },
    lux: {
      km: 4,
      free_baggage: 0,
      paid_baggage: 0,
      max_baggage: 60,
      discount_age: 16,
      discount_percent: 20
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    km: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required)
  })

  get km() {
    return this.form.get('km')
  }

  get age() {
    return this.form.get('age')
  }

  get weght() {
    return this.form.get('weght')
  }

  signIn() {

  }

  calculate() {

    console.log(this.form.value);

    let km = this.form.value.km;
    let age = this.form.value.age;
    let weight = this.form.value.weight;

    for (let data of this.aeroflotTarifs) {

      let key = data.id;

      let sum = this.aeroflot[key].km * km;

      if (weight > this.aeroflot[key].free_baggage && weight < this.aeroflot[key].max_baggage) {
        sum += weight * this.aeroflot[key].paid_baggage;
      }

      if (weight < this.aeroflot[key].max_baggage) {

        //Рассчитываем скидки и вычитаем из рубл // skidkalarni hisoblab sum dan ayiramiz
        if (age < this.aeroflot[key].discount_age) {

          sum -= (sum * this.aeroflot[key].discount_percent / 100);
        }

        // hosil bo'lgan summani yozib qo'yamiz
        this.aeroflotTarifs.filter(val => val.id == key)[0].salary = sum;

      } else {

        // Hisoblamaymiz
        this.aeroflotTarifs.filter(val => val.id == key)[0].salary = 0;
      }
    }

    for (let data of this.rjdTarifs) {

      let key = data.id;

      let sum = this.rjd[key].km * km;

      if (weight > this.rjd[key].free_baggage && weight < this.rjd[key].max_baggage) {
        sum += weight * this.rjd[key].paid_baggage;
      }

      if (weight < this.rjd[key].max_baggage) {

        // skidkalarni hisoblab sum dan ayiramiz
        if (age < this.rjd[key].discount_age) {

          sum -= (sum * this.rjd[key].discount_percent / 100);
        }

        // hosil bo'lgan summani yozib qo'yamiz
        this.rjdTarifs.filter(val => val.id == key)[0].salary = sum;

      } else {

        // Hisoblamaymiz
        this.rjdTarifs.filter(val => val.id == key)[0].salary = 0;
      }

    }

  }
}
