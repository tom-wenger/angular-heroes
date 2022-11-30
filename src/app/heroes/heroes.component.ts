import { Component, OnInit } from '@angular/core';
import {
  concatMap,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';
import { Store } from '@ngrx/store';
import { addHero, deleteHero } from '../state/heroes.actions';

const arr = [1, 2, 3];
const n = arr.reduce((agg, v) => agg + v, 0);
const m = arr.reduce((agg, v) => [...agg, v], [] as number[]);

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroes$!: Observable<Hero[]>;

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService,
    private store: Store<{ heroes: Hero[] }>
  ) {}

  getHeroes(): void {
    // this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    this.heroes$ = this.store.select('heroes'); //.pipe(map((state) => state.names));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(
      addHero({
        name: name,
      })
    );
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({ id: hero.id }));
  }

  ngOnInit(): void {
    this.getHeroes();
    // this.newHero$.subscribe((x) => console.log(x));
  }
}
