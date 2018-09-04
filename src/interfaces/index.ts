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

export interface Repository<Model> {
    getAll(query: any): Promise<Array<Model>>
    add(e: Model): Promise<void>
}

export interface DataSource {

    getConnection(): Promise<any>

}

export interface App {

    post(author: string, message:string): Promise<void>

    read(author:string): Promise<Array<Status>>

    follow(following:string, followed:string):Promise<void> 

    wall(person:string): Promise<Array<Status>> 

}