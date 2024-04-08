import React from 'react'
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

const LendingReqModal = () => {
  const createTuliaPool = useCreateTuliaPool();
  return (
    <Dialog>
        <DialogTrigger>
          <Button
            className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
          >
            Lending Request <PlusCircle className="w-4 h-4 inline-block ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add Lend Request
            </DialogTitle>

            <DialogDescription>
              Here you can add a new lending request.
            </DialogDescription>
          </DialogHeader>
          <ComboBoxResponsive />
            {/* //form */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="coin" className="text-sm text-gray-500">
                  Coin
                </label>
                <select
                  name="coin"
                  id="coin"
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="amount" className="text-sm text-gray-500">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" className="border-tulia_primary">
                Cancel
              </Button>
              <Button
                className="bg-tulia_primary/50"
                onClick={() => createTuliaPool(0)}
              >
                Submit
              </Button>
            </div>
        </DialogContent>
      </Dialog>
  )
}

export default LendingReqModal