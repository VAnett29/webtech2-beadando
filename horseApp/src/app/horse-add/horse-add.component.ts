import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { Horse } from 'src/models/horse.model';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-horse-add',
  templateUrl: './horse-add.component.html',
  styleUrls: ['./horse-add.component.scss']
})
export class HorseAddComponent implements OnInit {

  id: any;
  nameControl = new FormControl('', [Validators.required]);
  sexControl = new FormControl('', [Validators.required]);
  bornControl = new FormControl('', [Validators.required]);
  colorControl = new FormControl(null, Validators.required);
  heightControl = new FormControl('', [Validators.required, Validators.max(220), Validators.min(140)]);

  colors: String[] = ['Black', 'White', 'Cream', 'Silver', 'Chestnut'];
  sexs: String[] = ['Male', 'Female'];

  constructor(private horseService: HorseService, private router: Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get("id") ?? '0';
    if(this.id !== '0')
    {
      this.horseService.get(this.id).subscribe(h =>
        {
            this.nameControl.setValue(h.name);
            this.sexControl.setValue(h.sex);
            this.bornControl.setValue(formatDate(h.born as Date,'yyyy-MM-dd',"en-US"));
            this.colorControl.setValue(h.color);
            this.heightControl.setValue(h.height);
        });
    }
  }

  public async submit()
  {
    if(await this.horseService.addHorse(
      this.id,
      this.nameControl.value, 
      this.sexControl.value,
      this.bornControl.value,
      this.colorControl.value,
      this.heightControl.value)) {
        this.router.navigate(['/list']);
      }
  }

}
