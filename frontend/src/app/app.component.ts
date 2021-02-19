import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private chat: ChatService){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      Toast.fire({
        title: msg.text
      })
    })
  }

  sendMessage() {
    this.chat.sendMsg("Test Message");
  }
}
