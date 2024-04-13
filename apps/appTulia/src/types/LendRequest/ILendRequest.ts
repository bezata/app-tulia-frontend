import React from "react";

export enum InterestModal {
    Compound = 'Compound',
    Simple = 'Simple',
    MarketBased = 'MarketBased',
}

declare namespace ILendRequest {
    interface ILendRequestInputs {
        lendCoin: CryptoCurrency;
        barrowCoin: CryptoCurrency;
        loanAmount: number;
        interestModal: InterestModal;
        publishDate: Date;
        endDate: Date;
    }

    type CryptoCurrency = {
        label: string;
        symbol: React.ReactNode;
        value: string;
    };

};

export default ILendRequest;