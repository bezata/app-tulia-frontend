export interface PoolDetail {
  lender: string;
  loanAmount: bigint;
  creationTime: bigint;
  interestRate: bigint;
  numericValue: bigint;
  repaymentPeriod: bigint;
  loan_state: bigint;
  loanToken: string;
  repaymentToken: string;
  pool: string;
  funded: boolean;
  borrower: string;
  vault: string;
  poolType: number;
}
