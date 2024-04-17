"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useDialogs } from "@/hooks/useDialogs";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isOpen, onClose } = useDialogs();

  const closeDialog = () => {
    onClose();
    router.back();
  };

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}
