///<reference path="../custom-types/ng2.custom.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {routerDirectives, routerInjectables, RouteConfig, Router} from 'angular2/router';
import {StatusBoard} from './status-board/status-board';
import {StatusBoardFloating} from './status-board/status-board-floating';
import {TwitterLink} from './twitter/twitter';

@Component({
	selector:'contact-manager'
})
@View({
	templateUrl:'app/contact-manager.html',
	directives:[routerDirectives, TwitterLink]
})
@RouteConfig([
	{path: '/status-board', as:'status-board',	component:StatusBoard},
	{path: '/status-board-floating', as:'status-board-floating',	component:StatusBoardFloating}
])
class ContactManager{
	title: string;
	
	constructor(private router:Router){
		this.title = "Angular2 Databinding Examples";
	}
}

bootstrap(
	ContactManager,
	[
		routerInjectables
	]
);