import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.scss']
})
export class AllListComponent implements OnInit {

  constructor(private http:DataService, private router:Router) { }

  allUsers:any = new Array();

  ngOnInit(): void {
    this.http.getAllEmployees().subscribe( data => {
      this.allUsers = data;
      console.log(data)
    }) 
  }
  goto(user) {
    this.http.sendItem(user);
  }

}
