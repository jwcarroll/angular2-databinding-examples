///<reference path="../typings/es6-promise/es6-promise.d.ts" />

declare module "angular2/router" {
  class Instruction {}
  class Router {
    navigate(url: string): Promise<any>;
    config(config: any): Promise<any>;
    deactivate(): Promise<any>;
    activate(instruction: Instruction): Promise<any>;
    recognize(url: string): Instruction;
    recognize(url: string): Instruction;
    renavigate(): Promise<any>;
    generate(name:string, params:any): string;
    subscribe(onNext: Function): void;
    parent:Router;
  }
  class RouteParams {
        params: StringMap<string, string>;
        constructor(params: StringMap<string, string>);
        get(param: string): string;
  }
  class BrowserLocation {
    path():string;
  }
  
  var RouterOutlet: any;
  var RouterLink: any;
  var routerInjectables: any;
  var routerDirectives: any;
  var RouteConfigAnnotation: any;
  var RouteConfig: any;
}