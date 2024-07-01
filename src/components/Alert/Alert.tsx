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
  cancelFunction?: () => void;
  disabled?: boolean;
  actionButtonStyle?: string;
  triggerClassName?: string;
}

function Alert({
  actionButton,
  title,
  description,
  cancelText,
  actionText,
  actionFunction,
  disabled = false,
  cancelFunction,
  actionButtonStyle = '',
  triggerClassName = '',
}: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={disabled} className={triggerClassName}>
        {actionButton}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              cancelFunction && cancelFunction();
            }}
          >
            {cancelText}
          </AlertDialogCancel>
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
