# Angular MDC - Get Started with Angular CLI

- [Step 1 - Install Angular CLI](#step1)
- [Step 2 - Install Angular MDC](#step2)
- [Step 3 - Import Angular MDC Sass](#step3)
- [Step 4 - Import Angular MDC](#step4)

## Requirements
Angular MDC requires Angular 5, which itself requires TypeScript 2.4+ and RxJS 5.5.2+.

## <a name="step1"></a> Step 1: Install Angular CLI
```
npm i -g @angular/cli
```

#### If generating a new project, you need to set default CSS preprocessor to `scss`:
```
ng new PROJECT-NAME --style=scss
cd PROJECT-NAME
```

#### On existing projects, you need to set default CSS preprocessor to `scss`:
```
ng set defaults.styleExt scss
```

## <a name="step2"></a> Step 2: Install Angular MDC
```
npm i @angular-mdc/web
```

## <a name="step3"></a> Step 3: Import Angular MDC Sass
In `src/styles.sass` add the following:
```sass
$mdc-theme-primary: #1565c0; // change primary color example
$mdc-theme-secondary: #388e3c; // change secondary color example

@import "~@angular-mdc/theme/material";
```

## <a name="step4"></a> Step 4: Import Components
Now just import the NgModule for each component you want to use.
```ts
import {
  MdcButtonModule,
  MdcFabModule,
} from '@angular-mdc/web';

@NgModule({
  ...
  imports: [
   MdcButtonModule,
   MdcFabModule,
   ...
],
  ...
})
export class ExampleModule { }
```

Open `app.component.html` and add the following markup:
```html
<button mdc-button [primary]="true" [raised]="true">My Button</button>

<button mdc-fab>
  <mdc-icon>edit</mdc-icon>
</button>
```

Run `ng serve` to run your application in develop mode, and navigate to `http://localhost:4200`

### All set!
