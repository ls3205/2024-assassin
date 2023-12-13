"use client";

import { useRouter } from "next/router";
import React from "react";
import { Dialog, DialogContent } from "./ui/Dialog";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const router = useRouter();

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            router.back();
        }
    };

    return (
        <Dialog open onOpenChange={handleOnOpenChange}>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Modal;
