import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { filterHero } from '../functions';

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
    this.hero$ = this.heroService.getHero(id);

    const updatedHeroResult$ = this.updateHero$.pipe(
      filterHero,
      switchMap((name) => this.heroService.updateHero({ id, name }))
    );

    updatedHeroResult$.subscribe(() => this.goBack());
  }

  save(name: string) {
    this.updateHero$.next(name);
  }

  goBack() {
    this.location.back();
  }
}
