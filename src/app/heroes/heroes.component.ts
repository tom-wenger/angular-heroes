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
  tap,
  withLatestFrom,
} from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

let obj: { [key: string]: any } = { id: 4 };
obj['foo'] = 'bar';
obj['asdf'] = 23;

let stringOrArray = 'string';
console.log([...stringOrArray].reverse().join(''));

type on = string | number;
let on: on = 345;
on;

type onOff = 'on' | 'off';
let autoComplete: onOff = 'off';
autoComplete = 'on';
autoComplete = 'off';

type foo = number | boolean;
let num: foo;
num = 7;
num;
if (typeof num === 'number') {
  num;
  num = true;
}
num;

declare namespace myLib {
  function makeGreeting(s: string): string;
}

let result = myLib.makeGreeting('sdf');
console.log(result);

// ____________________________________________________

interface AddHero {
  _tag: 'add-hero';
  name: string;
}

interface DeleteHero {
  _tag: 'delete-hero';
  id: number;
}

interface UpdateHero {
  _tag: 'update-hero';
  id: number;
  name: string;
}

type Action = AddHero | DeleteHero | UpdateHero;

let addHero: Action = {
  _tag: 'delete-hero',
  id: 7,
};
addHero;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  public heroes$!: Observable<Hero[]>;
  // public newHero$ = new Subject<Hero>();
  public addHero$ = new Subject<string>();
  public deleteHero$ = new Subject<Hero>();

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService
  ) {
    // this.deleteHero$.subscribe((x) => console.log(x));
  }

  getHeroes(): void {
    // this.heroes$ = merge(this.heroService.getHeroes(), this.newHeros$);

    const fromServerStream$ = this.heroService.getHeroes();
    const addedHero$ = this.addHero$.pipe(
      map((name) => name.trim()),
      filter((name) => Boolean(name)),
      concatMap((name) => this.heroService.addHero(name)),
      tap((x) => console.log('after addhero', x))
    );
    const deletedHero$ = this.deleteHero$.pipe(
      filter((hero) => Boolean(hero)),
      concatMap((hero) =>
        this.heroService.deleteHero(hero.id).pipe(map(() => hero))
      ),
      tap((hero) => console.log('from deleting', hero))
    );

    this.heroes$ = fromServerStream$.pipe(
      mergeMap((heroes) =>
        addedHero$.pipe(
          scan((agg, v) => [...agg, v], heroes),
          startWith(heroes)
        )
      ),
      mergeMap((heroes) =>
        deletedHero$.pipe(
          // map((delHero) => heroes.filter((hero) => hero.id != delHero.id)),
          scan((agg, v) => {
            return agg.filter((hero) => hero.id != v.id);
          }, heroes),
          startWith(heroes)
        )
      )
    );

    // this.heroes$ = fromServerStream$.pipe(
    //   mergeMap((heroes) => this.newHero$.pipe(map((hero) => [...heroes, hero])))
    // );

    //alt
    // this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    this.addHero$.next(name);
    // name = name.trim();
    // if (!name) {
    //   return;
    // }
    // this.heroService.addHero({ name } as Hero).subscribe((hero) => {
    //   // console.log(hero);
    //   // this.heroes.push(hero);
    //   this.newHero$.next(hero);
    //   // this.getHeroes();
    // });
  }

  delete(hero: Hero): void {
    console.log(hero);
    this.deleteHero$.next(hero);
    // this.heroes = this.heroes.filter((h) => h !== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes();
    // this.newHero$.subscribe((x) => console.log(x));
  }
}
