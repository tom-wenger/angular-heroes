import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store } from '@ngrx/store';
import {
  emptySelectedHero,
  loadSingleHero,
  updateHero,
} from '../state/heroes/heroes.actions';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { selectSingleHero } from '../state/heroes/heroes.selector';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  id!: number;
  hero$: Observable<Hero | null> = this.store.select(selectSingleHero);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState> // private heroService: HeroService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(updateHero({ id: 0, name: '' }));
    this.store.dispatch(emptySelectedHero());
    this.getHero();
  }

  getHero() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(loadSingleHero({ id: this.id }));
  }

  save(name: string) {
    // this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    this.store.dispatch(updateHero({ id: this.id, name: name }));
    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}
