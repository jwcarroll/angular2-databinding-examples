///<reference path="../custom-types/ng2.custom.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {routerDirectives, routerInjectables, RouteConfig, Router, BrowserLocation} from 'angular2/router';
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
	
	constructor(private router:Router, private location:BrowserLocation){
		this.title = "Angular2 Databinding Examples";
		
		var url = location.path();
		
		router.navigate(url);
	}
}

bootstrap(
	ContactManager,
	[
		routerInjectables
	]
);