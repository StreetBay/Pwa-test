import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
    providers: [
        provideServiceWorker('ngsw-worker.js', { enabled: true }),
    ],
}).catch(err => console.error(err));