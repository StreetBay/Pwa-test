import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title = 'pwa-testers';
  private intervalId: any;
  private counter: number = 0;

  constructor() {
   
  }

  ngOnDestroy() {
    this.clearNotificationInterval();
  }

  private startNotificationInterval() {
    this.intervalId = setInterval(() => {
      this.showNotification();
    }, 10000);
  }

  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.startNotificationInterval();
        }
      });
    } else {
      console.log('Notifications not supported');
    }
  }
  clearNotificationInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // Reset the interval ID
      console.log('Notification interval cleared.');
      this.counter=0;
    }
  }
  subscribeToNotifications() {
    if(this.counter==0){
      this.requestNotificationPermission();
    } 
    
  }
  private showNotification() {
    this.counter++;
    const notifTitle = 'PWA Notification';
    const notifBody = `This is notification #${this.counter}`;
    const options = {
      body: notifBody,
      icon: '/assets/icons/icon-72x72.png',
      badge: '/assets/icons/icon-72x72.png'
    };

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notifTitle, options);
    }
  }
}