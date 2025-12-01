"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  // باز کردن مودال با محتوای دلخواه
  const openModal = useCallback((content) => {
    setModal(content);
  }, []);

  // بستن مودال
  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Dialog.Root open={!!modal} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg"
          >
              <Dialog.Title className="sr-only">Modal</Dialog.Title>
            <div className="absolute top-3 left-3">
              <Dialog.Close asChild>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
            {modal}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
