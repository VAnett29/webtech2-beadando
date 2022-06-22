import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Horse } from 'src/models/horse.model';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements AfterViewInit {

  constructor(private horseService: HorseService, private router: Router) { }
  displayedColumns: string[] = ['name', 'sex', 'born', 'color', 'height', 'actions'];
  public dataSource = new MatTableDataSource<IHorse>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    
    this.horseService.getAll().subscribe(horses => {
      this.dataSource = new MatTableDataSource<IHorse>(this.convertHorseModel(horses))
      this.dataSource.paginator = this.paginator;
    });
    
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  async deleteHorse(horse: IHorse)
  {
    this.horseService.delete(horse.id).subscribe(h => this.reloadCurrentRoute());
  }

  async editHorse(horse: IHorse)
  {
    this.router.navigate(['add/', horse.id]);
  }

  convertHorseModel(horses: Horse[]) : IHorse[]
  {
    let newHorses: IHorse[] = [];
    horses.forEach(h => newHorses.push(
      {
        id: h.id ?? '',
        name: h.name ?? '',
        sex: h.sex ?? '',
        born: h.born ?? new Date(),
        color: h.color ?? '',
        height: h.height ?? 0,
        actions: ['edit', 'delete']
      }));
      console.log(newHorses);
    return newHorses;
  }
}

export interface IHorse
{
  id: any;
  name: string;
  sex: string;
  born: Date;
  color: string;
  height: Number;
  actions: string[];
}
