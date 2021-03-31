import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { WeatherComponent } from './weather/weather.component';
import { ApixuService } from './apixu.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddnewsComponent } from './addnews/addnews.component';
import { NewslistComponent } from './newslist/newslist.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdministrateService } from './administrate.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SportsComponent } from './sports/sports.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    WeatherComponent,
    AddnewsComponent,
    NewslistComponent,
    AdminheaderComponent,
    HeaderComponent,
    HomeComponent,
    ChatInboxComponent,
    NewsComponent,
    FooterComponent,
    SportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [CookieService, ApixuService, AdministrateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
