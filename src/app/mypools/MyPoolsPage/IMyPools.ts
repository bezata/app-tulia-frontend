export interface PoolDetail {
  lender: string;
  loanAmount: bigint;
  creationTime: bigint;
  interestRate: bigint;
  loanToken: string;
  repaymentToken: string;
  numericValue: bigint;
  repaymentPeriod: bigint;
  loan_state: bigint;
}
