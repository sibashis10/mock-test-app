import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private http: HttpClient) {}

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.appRoot));
  };

  public create = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, environment.appRoot),
      body,
      this.generateHeaders()
    );
  };

  public update = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route, environment.appRoot),
      body,
      this.generateHeaders()
    );
  };

  public delete = (route: string) => {
    return this.http.delete(
      this.createCompleteRoute(route, environment.appRoot)
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.appRoot,
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      }),
    };
  };
}
