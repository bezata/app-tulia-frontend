import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AlertProps {
  actionButton: React.ReactNode | string;
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  actionFunction: () => void;
  disabled?: boolean;
  actionButtonStyle?: string;
}

function Alert({
  actionButton,
  title,
  description,
  cancelText,
  actionText,
  actionFunction,
  disabled = false,
  actionButtonStyle = '',
}: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={disabled}>
        {actionButton}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={actionFunction}
            className={`tulia_main_button ${actionButtonStyle}`}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;