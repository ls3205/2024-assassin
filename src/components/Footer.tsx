import Link from "next/link";
import React from "react";
import { Button } from "./ui/Button";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <div className="relative mt-12 flex h-48 w-full flex-row items-center bg-secondary p-6">
            <div className="ml-48">
                <h1 className="text-4xl font-bold">Trevor</h1>
                <h1 className="text-4xl font-bold">Senior</h1>
                <h1 className="text-4xl font-bold">Assassin</h1>
            </div>
            <div className="mr-48 flex w-full flex-row justify-center">
                <Button variant={"link"}>
                    <Link href={"https://www.instagram.com/trevorassasin24/"}>
                        2024 Assassin Instagram
                    </Link>
                </Button>
                <Button variant={"link"}>
                    <Link
                        href={
                            "https://docs.google.com/document/d/1PqD2Cj6xaiEBZGB0aMaNlYZdOv09gud3v2K3Puy1l9o/edit?usp=sharing"
                        }
                    >
                        2024 Assassin Rules Google Doc
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Footer;