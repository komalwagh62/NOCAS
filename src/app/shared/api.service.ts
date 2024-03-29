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
    return this.http.post<any>("https://3gmjmdqupl.execute-api.us-east-2.amazonaws.com", data);
  }
}
