import React from "react";

export enum InterestModal {
    Compound = 'Compound',
    Simple = 'Simple',
    MarketBased = 'MarketBased',
    FlashLoan = 'FlashLoan',
}

declare namespace ILendRequest {
    interface ILendRequestInputs {
      lendCoin: CryptoCurrency;
      borrowCoin: CryptoCurrency;
      loanAmount: number;
      interestModal: InterestModal;
      endDate: string;
      interestRate: number;
      InterestAddress: string;
      funded: boolean;
      collateral: number;
    }

    type CryptoCurrency = {
        label: string;
        symbol: React.ReactNode;
        value: string;
    };

};

export default ILendRequest;