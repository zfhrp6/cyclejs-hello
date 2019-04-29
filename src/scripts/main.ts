import { CycleDOMEvent, div, h1, hr, input, label, p, VNode } from '@cycle/dom';
import { DOMSource, makeDOMDriver } from '@cycle/dom/lib/cjs/rxjs';
import { run } from '@cycle/rxjs-run';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

type Sources = {
  DOM: DOMSource;
};

type Sinks = {
  DOM: Observable<VNode>;
};

/**
 * アプリケーション
 * @param sources
 * @returns {{DOM: Observable<VNode>}}
 */
function main(sources: Sources): Sinks {
  // キー入力イベントを取得 ( Intent )
  const input$: Observable<Event> = sources.DOM.select('.field').events('input');

  // 入力イベントから現在の状態ないし値を取得 ( Model )
  const name$: Observable<string> = input$.pipe(
    map((ev: CycleDOMEvent) => (ev.target as HTMLInputElement).value),
    startWith(''),
  );

  // 現在の状態を画面に描画 ( View )
  const vdom$: Observable<VNode> = name$.pipe(
    map((name: string) => {
      return div('.container', [
        div('.form-group', [label('Name: '), input('.field.form-control', { attrs: { type: 'text' } })]),
        hr(),
        h1([`Hello ${name}`]),
        p([name.padStart(20, 'x')]),
      ]);
    }),
  );

  // 結果をドライバに出力する ( Sinks )
  return {
    DOM: vdom$,
  };
}

// アプリケーションからの戻り値を受け取るドライバ群を定義
const drivers = {
  DOM: makeDOMDriver('#app-container'), // DOM をレンダリングするドライバ
};

// アプリケーションとドライバを結びつける
run(main, drivers);
