import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

// Deklarace rozhraní pro typovou kontrolu dat z API
interface WeatherData {
  main: {
    temp: number;
    // Další vlastnosti podle struktury odpovědi
  };
  // Další vlastnosti odpovědi
}

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp: any;
  todayDate = new Date()
  cityName :any;
  weatherIcon:any;
  weatherDetails:any;
  pressure:any;

  name=""
  loading= true
  constructor(public httpClient: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe(
      (results: any) => {
        console.log(results);
        if ('main' in results) {
          this.weatherTemp = results.main;
          this.name = results['name']
          this.weatherDetails = results['weather'][0]
          console.log(this.weatherDetails);
          this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
          console.log(this.weatherTemp);
          console.log(this.pressure);

          this.loading = false
        }
      },
      (error) => {
        console.error('Chyba při volání API:', error);
      }
    );
  }
}
