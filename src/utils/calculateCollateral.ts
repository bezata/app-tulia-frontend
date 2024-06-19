// collateralCalculator.ts
import { parseEther, formatEther } from 'viem';
import { InterestModal } from '@/types/LendRequest/ILendRequest';

export const calculateCollateral = (
  loanAmount: number,
  interestRate: number,
  interestModel: InterestModal,
  interest: number | undefined,
  compoundInterest: number | undefined
): number => {
  const principal = BigInt(parseEther(loanAmount.toString()));
  const rate = BigInt(Math.round(interestRate * 100)); // Convert percentage to basis points

  let calculatedInterest = BigInt(0);

  if (interest !== undefined && compoundInterest !== undefined) {
    calculatedInterest = BigInt(
      parseEther(
        interestModel === InterestModal.Compound
          ? compoundInterest.toString()
          : interest.toString()
      )
    );
  } else {
    switch (interestModel) {
      case InterestModal.Simple:
        calculatedInterest = (principal * rate) / BigInt(10000);
        break;
      case InterestModal.Compound:
        const totalPeriods = 1;
        let compoundedPrincipal = principal;
        for (let i = 0; i < totalPeriods; i++) {
          compoundedPrincipal =
            (compoundedPrincipal * (BigInt(10000) + rate)) / BigInt(10000);
        }
        calculatedInterest = compoundedPrincipal - principal;
        break;

      case InterestModal.FlashLoan:
        calculatedInterest = (principal * rate) / BigInt(10000);
        break;
      case InterestModal.MarketBased:
        calculatedInterest = (principal * rate) / BigInt(10000);
        break;
      default:
        console.error('Unsupported interest model');
        return parseFloat(formatEther(principal));
    }
  }
  const total = principal + calculatedInterest;
  return parseFloat(formatEther(total));
};
