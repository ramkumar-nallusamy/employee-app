import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  constructor(private router:ActivatedRoute, private http:DataService) { }

  empDetails:any;
  ngOnInit(): void {
    let empId=this.router.snapshot.paramMap.get("id");
    this.http.getEmpDetails(empId).get().subscribe(function(doc) {
      if (doc.exists) {
          this.empDetails = doc.data();
          this.empDetails.latitude = parseFloat(this.empDetails.latitude);
          this.empDetails.longitude = parseFloat(this.empDetails.longitude);
          console.log(this.empDetails)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })
    this.http.getItem().subscribe( (data) => {
      console.log(data)
      this.empDetails = data;
    })
  }
  onChoseLocation(data) {

  }
}
