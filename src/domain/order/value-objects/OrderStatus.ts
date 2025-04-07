export enum OrderStatus {
  CREATED = "created",
  CANCELLED = "cancelled",
}

export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return Object.values(OrderStatus).includes(status as OrderStatus);
};
