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

const arr = [1, 2, 3];
const n = arr.reduce((agg, v) => agg + v, 0);
//  const m = arr.reduce((agg, v) => [...agg, v], [] as number[]);

// 1
// 3
// 6

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

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService
  ) {}

  getHeroes(): void {
    // this.heroes$ = merge(this.heroService.getHeroes(), this.newHeros$);

    //mergemap
    const fromServerStream$ = this.heroService.getHeroes();
    const addedHero$ = this.addHero$.pipe(
      map((name) => name.trim()),
      filter((name) => Boolean(name)),
      concatMap((name) => this.heroService.addHero(name))
    );

    this.heroes$ = fromServerStream$.pipe(
      mergeMap((a) =>
        addedHero$.pipe(
          scan((agg, v) => [...agg, v], a),
          startWith(a)
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
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes();
    // this.newHero$.subscribe((x) => console.log(x));
  }
}
