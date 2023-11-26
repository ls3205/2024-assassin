interface Player {
    name: String
    status: "ALIVE" | "DEAD"
}

interface Kill {
    id: String

    User: User
    userId: String

    killerID: String
    killedID: String

    time: Date
}

interface User {
    id: String
    name?: String
    email: String
    password: String
    image?: String

    role: "ADMIN" | "PLAYER"
    status: "ALIVE" | "DEAD"

    targetID: String

    accounts: Account[]
    sessions: Session[]

    kills: Kill[]
}