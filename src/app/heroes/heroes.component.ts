import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';
import { HeroesStore } from '../store.heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroesStore],
})
export class HeroesComponent implements OnInit {
  // heroes: Hero[] = [];
  heroes$ = this.heroesStore.heroes$;
  status$ = this.heroesStore.status$;

  constructor(
    private readonly heroesStore: HeroesStore,
    private messageService: MessagesService
  ) {}

  getHeroes(): void {
    this.heroesStore.loadHeroes();
    // this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroesStore.addHero(name);
  }

  delete(hero: Hero): void {
    this.heroesStore.deleteHero(hero.id);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
