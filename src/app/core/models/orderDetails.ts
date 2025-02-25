export interface OrderDetail {
  financingBankName: string;
  downPaymentAmount: number;
  lastPaymentAmount: number;
  monthlyInstalmentAmount: number;
  InstallmentMonths: number;
  maxDownPaymentAmount: number;
  maxLastPaymentRatioAmount: number;
  minDownPaymentAmount: number;
  minLastPaymentAmount: number;
  totalAmount: number;
}
