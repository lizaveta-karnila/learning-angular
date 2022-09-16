import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {concatMap, map, mergeMap, switchMap} from "rxjs/operators";
import {catchError, EMPTY, Observable} from 'rxjs'
import {
  AddHero, AddHeroSuccess, DeleteHero, DeleteHeroSuccess,
  EHeroAction,
  GetCurrentHero,
  GetCurrentHeroSuccess,
  GetHeroes,
  GetHeroesSuccess, HeroActions,
  UpdateHero, UpdateHeroSuccess
} from "../actions/hero.action";
import {HeroService} from "../../heroes/hero.service";
import {IHero} from "../../heroes/IHero";

@Injectable()
export class HeroEffects {
  getHeroes$ = createEffect((): Observable<HeroActions> => {
    return this._actions$.pipe(
      ofType<GetHeroes>(EHeroAction.GetHeroes),
      switchMap(() => {
        return this._heroService.getHeroes().pipe(
          map(responseData => new GetHeroesSuccess(responseData)),
          catchError(error => EMPTY)
        )
      })
    )
  })

  getHero$ = createEffect((): Observable<HeroActions> => {
    return this._actions$.pipe(
      ofType<GetCurrentHero>(EHeroAction.GetCurrentHero),
      switchMap((actionData: any) => {
        return this._heroService.getHero(actionData.payload).pipe(
          map((response) => new GetCurrentHeroSuccess(response)),
          catchError(error => EMPTY)
        )
      })
    )
  })

  updateHero$ = createEffect((): Observable<HeroActions> => {
    return this._actions$.pipe(
      ofType<UpdateHero>(EHeroAction.UpdateHero),
      concatMap((actionData: { payload: IHero }) => {
        return this._heroService.updateHero(actionData.payload).pipe(
          map(() => new UpdateHeroSuccess(actionData.payload)),
          catchError(error => EMPTY)
        )
      })
    )
  })

  addHero$ = createEffect((): Observable<HeroActions> => {
    return this._actions$.pipe(
      ofType<AddHero>(EHeroAction.AddHero),
      concatMap((actionData: { payload: IHero }) => {
        return this._heroService.addHero(actionData.payload).pipe(
          map(() => new AddHeroSuccess(actionData.payload)),
          catchError(error => EMPTY)
        )
      })
    )
  })

  deleteHero$ = createEffect((): Observable<HeroActions> => {
    return this._actions$.pipe(
      ofType<DeleteHero>(EHeroAction.DeleteHero),
      mergeMap((actionData: { payload: number }) => {
        return this._heroService.deleteHero(actionData.payload).pipe(
          map(() => new DeleteHeroSuccess(actionData.payload)),
          catchError(error => EMPTY)
        )
      })
    )
  })

  constructor(
    private _heroService: HeroService,
    private _actions$: Actions,
  ) {}
}
