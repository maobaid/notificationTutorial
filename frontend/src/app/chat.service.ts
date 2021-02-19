import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { map } from "rxjs/operators"; 


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebSocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(
        map((response: any): any => {
          return response;
        })
      )
      
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }
}
