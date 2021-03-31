import { Component, OnInit } from '@angular/core';
import {io, Socket} from 'socket.io-client'

const SOCKET_ENDPOINT = 'localhost:3300'
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket!: Socket;
message: string | undefined;
io: any;
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast',(data: string) => {
      if(data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px'
        document.getElementById('message-list')?.appendChild(element);
      }
    })
  }

  sendMessage() {
    this.socket.emit('message', this.message);
    this.message='';
    const element = document.createElement('li');
        element.innerHTML = this.message;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px'
        document.getElementById('message-list')?.appendChild(element);
  }

}