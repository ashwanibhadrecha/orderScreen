import { Component } from '@angular/core';
import { AuthService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { Channel } from '../_model/common.model';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent {
  channelList!: Channel[];
  showColumn: any = 2
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.showColumn = (localStorage.getItem('columns')) ? localStorage.getItem('columns') : 2
    if (localStorage.getItem('allchannels') !== null) {
      this.channelList = JSON.parse(
        localStorage.getItem('allchannels') || '{}'
      );
    } else {
      this.channelList = [
        {
          channelName: 'Rappi',
          channel: 2,
          status: true,
          imgName: 'Rappi.png',
        },
        {
          channelName: 'UberEats',
          channel: 4,
          status: true,
          imgName: 'Ubers1.png',
        },
        {
          channelName: 'kiosk',
          channel: 6,
          status: false,
          imgName: 'Kiosk.png',
        },
        { channelName: 'POS', channel: 5, status: true, imgName: 'POS.png' },
        { channelName: 'Web', channel: 1, status: false, imgName: 'Web.png' },
        { channelName: 'Didi', channel: 3, status: true, imgName: 'Didi.png' },
      ];
    }
  }

  saveSetting(channelList: Channel[]) {
    localStorage.setItem('allchannels', JSON.stringify(this.channelList));
    let channel_id = channelList
      .filter((channel) => channel.status)
      .map((channel) => channel.channel);
    localStorage.setItem('channel_id', JSON.stringify(channel_id));
    localStorage.setItem('columns', this.showColumn);
    this.router.navigate(['/order']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
