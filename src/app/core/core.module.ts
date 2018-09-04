import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {NotFoundPageComponent} from './containers/not-found-page/not-found-page.component';

const providers = [];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NavigationBarComponent, NotFoundPageComponent],
  declarations: [NavigationBarComponent, NotFoundPageComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: providers
    };
  }
}
