import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedImage: any;
  data:any;
  imgSrc:any; 
  onUpload:boolean = false; // to show the user of image is uploading.


  constructor(private formBuilder:FormBuilder, private http:DataService, private storage:AngularFireStorage) { }

  ngOnInit(): void {
  }
  
  getLocation() {
    this.http.getAddress().then( (data:any) => {
      console.log(data)
      this.registerationForm.patchValue({
        'latitude': data.latitude,
        'longitude': data.longitude
      })
    })
  }
  registerationForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    phoneNumber: ['',[Validators.required,Validators.maxLength(10), Validators.minLength(10)]],
    email: ['',Validators.required],
    address: ['',Validators.required],
    designation: ['',Validators.required],
    salary : ['',Validators.required],
    profileUrl:[''],
    latitude:[''],
    longitude:['']
  });

  callSubmit() {
    if (!this.registerationForm.invalid) {
      this.onUpload = true;
      console.log(this.registerationForm.value)
      var filePath = `${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath)
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( (url) => {
            console.log(url)
            this.registerationForm.patchValue({
              'profileUrl': url
            })
            if(url.length) {
              console.log("form submitted")
              this.onUpload = false;
              this.selectedImage = null;
              this.http.addEmployee(this.registerationForm.value)
              this.registerationForm.reset(this.registerationForm.value);
            }
          })
        })
      ).subscribe();
    }
  }
  fileDropped(event){
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.value;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0]
    }
    else {
      console.log('some error occured')
    }
  }
}
