import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs: any[] = [
    { id: 'status', badge: 0, icon: 'disc' },
    { id: 'calls', badge: 0, icon: 'call' },
    { id: 'camera', badge: 0, icon: 'camera', button: true },
    { id: 'chats', badge: 0, icon: 'chatbubbles' },
    { id: 'settings', badge: 0, icon: 'cog' },
  ];

  constructor() {}

}
