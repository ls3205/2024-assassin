import Image, { StaticImageData } from "next/image";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/Dialog";

interface PopoutImageProps {
    image: StaticImageData;
}

const PopoutImage: React.FC<PopoutImageProps> = ({ image }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Image
                    src={image}
                    alt="Safezone"
                    placeholder="blur"
                    quality={100}
                    className="rounded-lg"
                    height={320}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Safezone</DialogTitle>
                </DialogHeader>
                <Image src={image} alt="Safezone" quality={100} height={800} className="rounded-lg" />
            </DialogContent>
        </Dialog>
    );
};

export default PopoutImage;
