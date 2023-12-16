interface Player {
    name: string
    image: string
    status: "ALIVE" | "DEAD"
    id: string
    targetPairing: Pairing?;
    targetId: string
}

interface Kill {
    id: string

    User: User
    userId: string

    targetId: string

    time: Date
}

interface User {
    id: string
    name?: string
    email: string
    password: string
    image?: string

    role: "ADMIN" | "PLAYER"
    status: "ALIVE" | "DEAD"

    targetID: string

    accounts: Account[]
    sessions: Session[]

    kills: Kill[]

}

interface Pairing {
    id: string;
    userId: string;
    targetId: string | null;
    targetListId: string;
    complete: boolean
}