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
        barrowCoin: CryptoCurrency;
        loanAmount: number;
        interestModal: InterestModal;
        endDate: Date;
        interestRate: number;
    }

    type CryptoCurrency = {
        label: string;
        symbol: React.ReactNode;
        value: string;
    };

};

export default ILendRequest;