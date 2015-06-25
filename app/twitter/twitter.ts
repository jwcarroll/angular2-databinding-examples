import {Component, View} from 'angular2/angular2';

@Component({
	selector:'twitter-link',
	properties:["name"]
})
@View({
	template:'<a [href]="url">{{name}}</a>'
})
export class TwitterLink{
	name: string;
	
	get url(){
		return `https://twitter.com/${this.name}`;
	}
}