import { Button } from "@heroui/button";
import { Modal, ModalContent } from "@heroui/react";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (key: string) => void;
  itemKey: string;
}

const KelolaModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  itemKey,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <div className="flex flex-row justify-center space-x-3">
          <Button type="button" onPress={() => onDelete(itemKey)}>
            Hapus
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default KelolaModal;
