import { EventEmitter } from "events";

export interface Relationship {
    following: string
    followed: string
    time: Date
}

export interface Status {
    author: string
    message: string
    time: Date
}

export interface Repository<T> {
    getAll(query: any): Promise<Array<T>>
    add(e: T): Promise<void>
}

export interface DataSource {

    getConnection(): Promise<any>

}

type Key = object
type NoKey = undefined

export interface Model<T> {
    create(raw: object): T
    key(item: T): Key | NoKey
}
export interface App {

    post(author: string, message: string): Promise<void>

    read(author: string): Promise<Array<Status>>

    follow(following: string, followed: string): Promise<void>

    wall(person: string): Promise<Array<Status>>

    events: EventEmitter
}