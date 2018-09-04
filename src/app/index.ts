import * as statusModel from '../models/status'
import * as relationshipModel from '../models/relationship'
import { App, Status, Relationship, Repository } from '../interfaces'


type appDependencies = {
    statusRepo: Repository<Status>,
    relationshipRepo: Repository<Relationship>
}

const appFactory = (
    { statusRepo, relationshipRepo }: appDependencies
): App => {

    required('statusRepo', statusRepo)
    isRepo('statusRepo', statusRepo)
    required('relationshipRepo', relationshipRepo)
    isRepo('relationshipRepo', relationshipRepo)


    async function post(author: string, message: string) {
        const status = statusModel.create(author, message)
        return statusRepo.add(status)
    }

    async function read(author: string) {
        const result = await statusRepo.getAll({
            author
        })
        return result.sort(sortTimeDescending)
    }

    async function follow(following: string, followed: string) {
        const relationship = relationshipModel.create(following, followed)
        return relationshipRepo.add(relationship)
    }

    async function wall(person) {
        const followed = await relationshipRepo.getAll({
            following: person
        }).then(e => e.map(x => x.followed))

        return await Promise.all([
            statusRepo.getAll({
                author: person
            }),
            ...followed.map(a => statusRepo.getAll({
                author: a
            }))
        ]).then(flatten).then(e => e.sort(sortTimeDescending))
    }

    function sortTimeDescending(a: Status, b: Status): number {
        return b.time.getTime() - a.time.getTime()
    }

    return {
        post,
        read,
        follow,
        wall
    }



}

function required(label, target) {
    if (!target) throw `${label} is required;`;
}

function isRepo(label, target) {
    const test = e => e && e.add
    if (!test(target)) throw `${label} is not a valid repository;`;
}

function flatten(arr) {
    return arr.reduce((p, e) => p.concat(e))
}

export default appFactory