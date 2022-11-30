import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { concatMap, filter, map, merge, Observable, Subject, tap } from 'rxjs';

function makeHero(id: number, name: string): Hero {
  return { id, name };
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero$?: Observable<Hero>;
  updateHero$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const updatedHeroResult$ = this.updateHero$.pipe(
      map((name) => name.trim()),
      filter((name) => Boolean(name)),
      map((name) => makeHero(id, name)),
      concatMap((hero) =>
        this.heroService.updateHero(hero).pipe(map(() => hero))
      ),
      tap((x) => {
        console.log('after updating', x);
        this.location.back();
      })
    );

    this.hero$ = merge(this.heroService.getHero(id), updatedHeroResult$);
  }

  save(name: string) {
    this.updateHero$.next(name);
  }

  goBack() {
    this.location.back();
  }
}
