import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  EmployeeCollection: AngularFirestoreCollection<Employee>
  items: Observable<EmpId[]>;
  itemDoc: AngularFirestoreDocument<Employee>;

  private getParticularUser = new BehaviorSubject(0);;

  constructor(private http:HttpClient, private fireStore:AngularFirestore) { 
    this.EmployeeCollection = fireStore.collection<Employee>('employees');
    this.items = this.EmployeeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getAllEmployees() {
    return this.items;
  }
  getEmpDetails(id){
     return this.fireStore.doc(`/employees/${id}`)
  }
  addEmployee(data:Employee) {
    this.EmployeeCollection.add(data);
  }
  getAddress() {
    return this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${environment.apikey}`).toPromise();
  }
  getItem(): Observable<any> {
    return this.getParticularUser.asObservable();
  }
  sendItem(item) {
    this.getParticularUser.next(item)
  }
}
interface EmpId extends Employee { id: string; }
interface Employee {
  id:string;
  first_name:string;
  last_name:string;
  address:string;
  email:string;
  phone_number:number;
  profileUrl:string
  designation:string;
  salary:number;
  location?:[];
}