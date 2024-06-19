import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { ILendingViewModalProps } from './ILendingViewModal';
import { LoaderIcon, LucideBanknote, Percent, UserCheck } from 'lucide-react';
import Alert from '../Alert/Alert';
import TransactionProcessModal from '../TransactionProcessModal/TransactionProcessModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LendingViewModal = ({ row }: ILendingViewModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openTransactionModal, setOpenTransactionModal] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (openTransactionModal) {
      setTimeout(() => {
        toast.success('Transaction successful. Redirecting to My Pools.');
        setOpenTransactionModal(false);
        // Redirect to my pools
        router.push('/mypools');
      }, 5000);
    }
  }, [openTransactionModal, router]);
  return (
    <>
      <Dialog open={openTransactionModal} setOpen={setOpenTransactionModal}>
        <TransactionProcessModal setOpen={setOpenTransactionModal} />
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <Button className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30">
            Request Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Lend</DialogTitle>
            <DialogDescription>
              View the details of the lend position.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 border-gray-500 pb-2 border-b-[0.5px]">
              <span className="font-bold">
                <UserCheck size={20} className="inline-block mr-2" />
                Lender&apos;s Information
              </span>
            </div>
            <div className="col-span-6 flex flex-col">
              <span className="text-sm font-semibold">Wallet Address</span>
              <span className="text-sm text-gray-400">
                {row.original.wallet_address}
              </span>
            </div>
            <div className="col-span-6 flex flex-col">
              <span className="text-sm font-semibold">Loan Amount</span>
              <span className="text-sm text-gray-400">
                {row.original.amount} {row.original.coin}
              </span>
            </div>
            <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
              {/* Interest Details */}
              <span className="font-bold">
                <Percent size={20} className="inline-block mr-2" />
                Interest Details
              </span>
            </div>
            <div className="col-span-4 flex flex-col">
              <span className="text-sm font-semibold">Interest Rate</span>
              <span className="text-sm text-gray-400">5%</span>
            </div>
            <div className="col-span-4 flex flex-col">
              <span className="text-sm font-semibold">Interest Modal</span>
              <span className="text-sm text-gray-400">Simple</span>
            </div>
            <div className="col-span-4 flex flex-col">
              <span className="text-sm font-semibold text-primary">
                Interest Discount
              </span>
              <span className="text-sm text-green-500">+0.5% </span>
            </div>
            {/* Loan Details */}
            <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
              <span className="font-bold">
                <LucideBanknote size={20} className="inline-block mr-2" />
                Payment Details
              </span>
            </div>
            <div className="col-span-6 flex flex-col">
              <span className="text-sm font-semibold">Collateral Amount</span>
              <span className="text-sm text-gray-400">1.05 ETH</span>
            </div>
            <div className="col-span-6 flex flex-col">
              <span className="text-sm font-semibold">Debt Payment Period</span>
              <span className="text-sm text-gray-400">2024-12-12</span>
            </div>
            <div className="col-span-12 flex flex-col">
              <Alert
                actionButton={
                  loading ? (
                    <Button className="capitalize tulia_main_button w-full">
                      <LoaderIcon size={16} className="animate-spin mr-2" />
                    </Button>
                  ) : (
                    <Button className="capitalize tulia_main_button w-full">
                      Accept Lend Request
                    </Button>
                  )
                }
                title="Accept Lend Request"
                disabled={loading}
                description="Are you sure you want to accept this lend request?"
                cancelText="Cancel"
                actionText="Accept"
                actionFunction={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setOpenTransactionModal(true);
                  }, 2000);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LendingViewModal;
