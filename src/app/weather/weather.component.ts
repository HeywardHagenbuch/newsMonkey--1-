import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApixuService } from "../apixu.service";


@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css", '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  ipAddress: String = '';
  city: String = '';



  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService,
    private ip: ApixuService
  ) { }

  ngOnInit() {

    this.apixuService.getIPAddress().subscribe(res => {
      this.ipAddress = res['ip']
      this.apixuService.getGEOLocation(this.ipAddress).subscribe(res => {
        this.city = res['city']
        this.searchWeather(this.city);
      })
    })
  }

  sendToAPIXU(formValues) {
    this.apixuService.getWeather(formValues.location).subscribe(data => {
      // this.weatherData = data;
      // console.log(this.weatherData);

    });
  }


  searchWeather(cityName) {
    this.apixuService.getWeather(cityName).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);

    });
  }

  getIp() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }




}