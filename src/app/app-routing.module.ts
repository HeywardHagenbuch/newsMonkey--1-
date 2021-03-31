import { SportsComponent } from './sports/sports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewsComponent } from './addnews/addnews.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewslistComponent } from './newslist/newslist.component';
import { RegisterComponent } from './register/register.component';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'weather', component: WeatherComponent},
  { path: 'addnews', component: AddnewsComponent},
  { path: 'newslist', component: NewslistComponent},
  { path: 'home', component: HomeComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'chat-inbox', component:ChatInboxComponent},
  { path: 'sports', component:SportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
