// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```

// *src/app/app.ts*

// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from './home/home';

// Import NgFor directive
import {NgFor} from 'angular2/common';

// Import of Todo component
import {Todo} from './components/todo/todo.component';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [  ],
  directives: [ Todo,
                NgFor],
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require("!style!css!sass!../sass/main.scss")],
  template: `
    <header>
      <nav>
        <h1>Hello {{ name }}</h1>
        <ul>
          <li router-active>
            <a [routerLink]=" ['Index'] ">Index</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['Home'] ">Home</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['Todo'] ">Todo</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['About'] ">About</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      Angular 2 MEAN Webpack Starter by <a [href]="url">@datatype_void</a>
      <div>
        <img [src]="angularLogo" width="10%">
      </div>
    </footer>
  `
})
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/todo', component: Todo, name: 'Todo' },
  // Async load a component using Webpack's require with
  // es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about/about')('About') },
])
export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Angular 2 MEAN Webpack Starter';
  url = 'https://twitter.com/datatype_void';

  constructor() {

  }
}

/*
 * Please review the https://github.com/datatype_void/angular2-examples/ repo as it is updated for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at https://VulgarDisplayOfPower.com/slack-join
 * or via chat on Gitter at https://gitter.im/datatype_void/angular2-webpack-starter
 */
