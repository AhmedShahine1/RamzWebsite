import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { registerLicense } from '@syncfusion/ej2-base';

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhAYVppR2NbfE5xflZDal1WVBYiSV9jS31Tf0VhWHxddXVSTmdbWQ==');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
