import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class AppComponent {
  title = 'pwa-testers';
  private intervalId: any;
  private counter : any = 0;
  constructor() {
    this.requestNotificationPermission();
  }

  requestNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log("permission granted for notification");
      } else {
        console.log("permission denied for notification");
      }
    });
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
    this.intervalId = setInterval(() => {
      this.showNotification();
    }, 10000);
  }
  showNotification() {
    this.counter++;
    const notifTitle = 'Hello!';
    const notifBody = 'This is a simulated notification : '+this.counter + ' .';
    const options = {
      body: notifBody,
      icon: 'assets/icon.png',
    };
    new Notification(notifTitle, options);
  }
}
