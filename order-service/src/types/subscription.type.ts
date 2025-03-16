export enum OrderEvent {
  CREATE_ORDER = "create_order",
  CANCEL_ORDER = "cancel_order",
}

export type TOPIC_TYPE = "OrderEvents" | "Catalogevents";

export interface MessageType {
  headers?: Record<string, any>;
  events: OrderEvent;
  data: Record<string, any>;
}
