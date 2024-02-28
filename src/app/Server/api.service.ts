import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Injecting HttpClient in the constructor
  constructor(private http: HttpClient) { }

  
  // Method to post data to the AWS API Gateway endpoint
  postDataToAWS(data: any) {
    return this.http.post<any>("https://registrationform-9411f-default-rtdb.firebaseio.com//registrationForm.json/", data);
  }
}
