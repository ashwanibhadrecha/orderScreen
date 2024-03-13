export interface Order{
    channel:string,
    order_id:string,
    order_id_display:string,
    order_status_display:string,
    order_status:number,
    trx_id:string
  }

 export interface Channel{
    channelName:string;
    status:boolean;
    imgName:string;
    channel:number
  }