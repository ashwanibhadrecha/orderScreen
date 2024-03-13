import { Component, HostListener } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../_model/common.model';
@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css'],
})
export class OdersComponent {
  orderSubList!: Subscription;
  isTwoColumns: boolean = false;
  isLandscape!: boolean;
  orderList!: Order[];
  css_setting: any;
  columnsCount: any = 2
  channels: any = [];
  columns: any = 2
  constructor(
    private orderService: OrderService,
    private toast: ToastrService
  ) { }
  ngOnInit() {
    let restaurentDetail = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    this.channels = JSON.parse(
      localStorage.getItem('channel_id') || '[]'
    )
    this.columns = (localStorage.getItem('columns')) ? localStorage.getItem('columns') : 2
    this.columns = 100 / this.columns + "%"
    this.css_setting = restaurentDetail?.data.css_settings;
    let data = {
      restaurant_id: restaurentDetail?.data?.restaurant_id,
      branch_id: restaurentDetail?.data?.branch_id,
      source: 'osd',
      version: '0.0.1',
      session_id: 'vr52i04io',
      lang: 'es',
    };

    if (localStorage.getItem('columns')) {
      this.columnsCount = localStorage.getItem('columns')
    }

    this.orderSubList = this.orderService.getOrder(data).subscribe(
      (res) => {
        if (res.status_code == 200) {
          this.orderList = res?.data;
          localStorage.setItem('osdorders', res.data);
        } else {
          this.toast.error(res.message, 'Error!');
        }
      },
      (error) => {
        this.toast.error(error.message, 'Error!');
      }
    );

    this.getdeviceView();
  }
  ngAfterViewInit() {
    //  this.onWindowScroll();
    this.getdeviceView();
  }
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   // Check if vertical scroll has occurred
  //   this.isTwoColumns = window.scrollY > 0; // You can adjust this threshold as needed
  // }
  isScrolledToBottom(): boolean {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const scrollPosition =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return windowHeight + scrollPosition >= documentHeight;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }

  filterOrderByChannel(channelId: any) {
    console.log("channelId", channelId, "this.channels", this.channels)
    if (this.channels.includes(parseInt(channelId))) {
      return true
    }
    else {
      return false
    }
  }

  ngOnDestroy(): void {
    if (this.orderSubList) {
      this.orderSubList.unsubscribe();
    }
  }
  getdeviceView() {
    if (this.isLandscape) {
      if (this.isLandscape && this.isScrolledToBottom()) {
        return 'two-columns landscape';
      } else {
        return 'landscape';
      }
    } else {
      if (!this.isLandscape && this.isScrolledToBottom()) {
        return 'two-columns potrait';
      } else {
        return 'potrait';
      }
    }
  }
}
