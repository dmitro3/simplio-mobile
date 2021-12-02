import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AGREEMENTS_URL, USERS_URLS } from '../../providers/routes/swap.routes';
import { HttpService } from '../http.service';

export interface UserDataItem {
  ETag: string;
  Name: string;
  PartitionKey: string;
  RowKey: string;
  Timestamp: string;
  Type: string;
  UpdatedAt: string;
  UserId: string;
  Value: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  get(property: string): Promise<any> {
    const url = USERS_URLS.data.href;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<UserDataItem[]>(url, { headers })
      .toPromise()
      .then(res => res.find(a => a.Name === property)?.Value);
  }

  create(name: string, type: string, value: any): Promise<any> {
    const url = USERS_URLS.data.href;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      name,
      type,
      value,
    };

    return this.http.post<any>(url, body, { headers }).toPromise();
  }

  update(name: string, type: string, value: string): Promise<any> {
    const url = USERS_URLS.data.href;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      name,
      type,
      value,
    };

    return this.http.put<any>(url, body, { headers }).toPromise();
  }

  remove(name: string): Promise<any> {
    const url = `${USERS_URLS.data.href}/${name}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete<any>(url, { headers }).toPromise();
  }

  initializeAdvertising(advertising: boolean): Promise<any> {
    const url = AGREEMENTS_URL.agreements.href;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, { advertising }, { headers }).toPromise();
  }

  updateAdvertising(advertising: boolean): Promise<any> {
    const url = AGREEMENTS_URL.agreements.href;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(url, { advertising }, { headers }).toPromise();
  }

  getAdvertising(): Promise<boolean> {
    const url = AGREEMENTS_URL.agreements.href;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<any>(url, { headers })
      .toPromise()
      .then(res => res.Advertising);
  }
}
