import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroListComponent} from "./hero-list/hero-list.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {HeroResolverService} from "./hero-resolver.service";

const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'detail/:id', component: HeroDetailComponent, resolve: { hero: HeroResolverService }}
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
