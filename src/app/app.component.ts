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
    
  }

  requestNotificationPermission() {
    if(Notification){
    Notification?.requestPermission()?.then((permission) => {
      window.alert("has Notification API in browser and permission is "+permission);
      if (permission === 'granted') {
        console.log("permission granted for notification");
        this.intervalId = setInterval(() => {
          if(this.counter===0){window.alert("permission granted for notification");}
          this.showNotification();
        }, 10000);
      } else {
        console.log("permission denied for notification");
      }
    });
  }else{
    window.alert("No Notification allowed here or Javascript disabled");
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
  showNotification() {
    this.counter++;
    const notifTitle = 'Hello!';
    const notifBody = 'This is a simulated notification : '+this.counter + ' .';
    const options = {
      body: notifBody,
    };
    if (Notification) {
      if(this.counter==1){window.alert("before first notification called");}
      const notification = new Notification(notifTitle, options);
      notification.onerror=(e)=>{
        window.alert("some error in notification : "+JSON.stringify(e))
      }
    }
  }
}
