import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useCreateTuliaPool } from '@/lens/lens';
import { ComboBoxResponsive } from '../Combobox/Combobox';
import { useForm } from 'react-hook-form';
import ILendRequest, { InterestModal } from '@/types/LendRequest/ILendRequest';
import EthIcon from '../../../public/EthIcon';
import BtcIcon from '../../../public/BtcIcon';

const LendingReqModal = () => {
  const createTuliaPool = useCreateTuliaPool();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ILendRequest.ILendRequestInputs>({
    defaultValues: {
      lendCoin: { label: 'ETH', value: 'ETH', symbol: <EthIcon /> },
      barrowCoin: { label: 'BTC', value: 'BTC', symbol: <BtcIcon /> },
      loanAmount: 0,
      interestModal: InterestModal.Compound,
      publishDate: new Date(),
      endDate: new Date(),
    },
  });

  const lendCoin = watch('lendCoin');
  const barrowCoin = watch('barrowCoin');

  const onSubmit = (data: ILendRequest.ILendRequestInputs) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30">
          Lending Request <PlusCircle className="w-4 h-4 inline-block ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Lend Request</DialogTitle>
          <DialogDescription>
            Here you can add a new lending request.
          </DialogDescription>
        </DialogHeader>
        {/* //form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="lendCoin" className="text-sm">
                Lend Coin
              </label>
              <ComboBoxResponsive
                setValue={setValue}
                mode="lend"
                selectedItem={lendCoin}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lendCoin" className="text-sm">
                Barrow Coin
              </label>
              <ComboBoxResponsive
                setValue={setValue}
                mode="barrow"
                selectedItem={barrowCoin}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              className="border-tulia_primary"
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-tulia_primary/50">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LendingReqModal;
