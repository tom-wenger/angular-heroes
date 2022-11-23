import { Component, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  concatMap,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  of,
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

const arr = [1, 2, 3];
const n = arr.reduce((agg, v) => agg + v, 0);
//  const m = arr.reduce((agg, v) => [...agg, v], [] as number[]);

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-rx.component.html',
  styleUrls: ['./heroes-rx.component.scss'],
})
export class HeroesRxComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  public addHero$ = new Subject<Hero>();
  public deleteHero$ = new Subject<Hero>();

  refreshButtonClicked$ = new EventEmitter();

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService,
    private http: HttpClient
  ) {
    const startupRequestStream$ = of('api/heroes');

    const requestOnRefreshStream$ = this.refreshButtonClicked$.pipe(
      map(() => {
        return 'api/heroes';
      })
    );

    const requestStream$ = merge(
      startupRequestStream$,
      requestOnRefreshStream$
    );

    const responseStream$ = requestStream$.pipe(
      mergeMap((requestUrl) => {
        console.log('network request');
        return this.http.get<any[]>(requestUrl);
      })
      // shareReplay(1)
    );

    this.heroes$ = responseStream$.pipe(
      mergeMap((heroes) =>
        this.addHero$.pipe(
          scan((agg, v) => [...agg, v], heroes),
          startWith(heroes)
        )
      ),
      mergeMap((heroes) =>
        this.deleteHero$.pipe(
          map((delHero) => heroes.filter((hero) => hero.id != delHero.id)),
          // scan((agg, v) => {
          //   if(v.id != )
          //   return [...agg, v];
          // }, []),
          startWith(heroes)
        )
      )
    );
  }

  add(name: string): void {
    this.heroService
      .addHero(name)
      .subscribe((hero) => this.addHero$.next(hero));
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
    this.deleteHero$.next(hero);
  }

  ngOnInit(): void {}
}
