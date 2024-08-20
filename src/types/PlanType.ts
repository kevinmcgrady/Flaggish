export enum PlanType {
  FREE = 'free',
  PAID = 'paid',
}

export type Plan = {
  title: string;
  price: string;
  features: string[];
  type: PlanType;
};
