import {Observable} from 'rxjs';
import {div, label, input, hr, h1, makeDOMDriver} from '@cycle/dom';
import {run} from '@cycle/rxjs-run';
import {DOMSource} from '@cycle/dom/rxjs-typings';

type Sources = {
    DOM: DOMSource;
}

function main(sources: Sources) {
    const input$ = sources.DOM.select('.field').events('input');
    const name$ = Observable.from(input$)
        .map((ev: Event) => (ev.target as HTMLInputElement).value)
        .startWith('');

    const vdom$ = name$.map(name => {
        return div('.well', [
            div('.form-group', [
                label('Name: '),
                input('.field.form-control', {attrs: {type: 'text'}}),
            ]),
            hr(),
            h1(`Hello ${name}`)
        ])
    });

    return {
        DOM: vdom$
    };
}

const drivers = {
    DOM: makeDOMDriver('#app-container')
};

run(main, drivers);
