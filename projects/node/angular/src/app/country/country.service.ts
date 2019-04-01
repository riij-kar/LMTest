import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private country_main_url = "https://restcountries.eu/rest/v2/";
  private country_all_url = this.country_main_url + "all";

  constructor(private _http: HttpClient) { }

  getAllCountry(): Observable<Country>{
    return this._http.get(this.country_all_url);
  }
}
