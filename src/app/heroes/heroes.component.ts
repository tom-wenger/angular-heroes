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
import * as storeActions from '../state/heroes/heroes.actions';
import { selectAllHeroes } from '../state/heroes/heroes.selector';
import { AppState } from '../state/app.state';

// const arr = [1, 2, 3];
// const n = arr.reduce((agg, v) => agg + v, 0);
// const m = arr.reduce((agg, v) => [...agg, v], [] as number[]);

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  // heroes: Hero[] = [];
  heroes$: Observable<Hero[]> = this.store.select(selectAllHeroes);

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService,
    private store: Store<AppState>
  ) {}

  getHeroes(): void {
    // this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    // this.heroes$ = this.store.select(selectAllHeroes); //.pipe(map((state) => state.names));
    this.heroes$.pipe(filter((heroes) => heroes.length === 0)).subscribe(() => {
      this.store.dispatch(storeActions.loadHeroes());
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(
      storeActions.addHero({
        name: name,
      })
    );
  }

  delete(hero: Hero): void {
    this.store.dispatch(storeActions.deleteHero({ id: hero.id }));
  }

  ngOnInit(): void {
    this.getHeroes();
    // this.newHero$.subscribe((x) => console.log(x));
  }
}
