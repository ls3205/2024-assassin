import Modal from "@/components/Modal";
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { getAuthSession } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import React from "react";

interface pageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const page: React.FC<pageProps> = ({ params, searchParams }) => {
    const session = getAuthSession();

    const user = searchParams.user;
    const target = searchParams.target;

    return (
        <Modal>
            <DialogHeader>
                <DialogTitle>Confirm Kill</DialogTitle>
            </DialogHeader>
        </Modal>
    );
};

export default page;
