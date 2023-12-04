interface Player {
    name: string
    image: string
    status: "ALIVE" | "DEAD"
    targetID: string | null
    id: string
}

interface Kill {
    id: string

    User: User
    userId: string

    killerID: string
    killedID: string

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
    killerID: string;
    killedID: string | null;
    targetListId: string | null;
}