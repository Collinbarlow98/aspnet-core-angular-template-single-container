import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  
  constructor(
    // Here the constructor is injecting the HeroService class as a variable
    private heroService: HeroService
  ) { }
  
  // calls the getHeroes method that is in this component.
  ngOnInit() {
    this.getHeroes();
  }

  // calls the getHeroes method from the heroService class 
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  // calls on the addHero method in the heroService class, passing the name as a parameter, and the id being automatically generated, by the mock server.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // calls on the heroes property and filters out values that are not equal to the parameter that was set. Then deleteHero from the heroService class is called, deleting the hero from the array.
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}