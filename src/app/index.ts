import StatusModel from '../models/status'
import RelationshipModel from '../models/relationship'
import { App, Status, Relationship, Repository } from '../interfaces'
import { EventEmitter } from 'events';


type appDependencies = {
    statusRepo: Repository<Status>,
    relationshipRepo: Repository<Relationship>
}

const appFactory = (
    { statusRepo, relationshipRepo }: appDependencies
): App => {

    const events: EventEmitter = new EventEmitter()

    required('statusRepo', statusRepo)
    isRepo('statusRepo', statusRepo)
    required('relationshipRepo', relationshipRepo)
    isRepo('relationshipRepo', relationshipRepo)


    async function post(author: string, message: string) {
        const status = StatusModel.create({ author, message })
        await statusRepo.add(status)
        events.emit('status:posted', status)
    }

    async function read(author: string) {
        const result = await statusRepo.getAll({
            author
        })
        return result.sort(sortTimeDescending)
    }

    async function follow(following: string, followed: string) {
        const relationship = RelationshipModel.create({ following, followed })
        await relationshipRepo.add(relationship)
        events.emit('person:followed', relationship)   
    }

    async function wall(person) {
        const followed =
            await relationshipRepo
                .getAll({ following: person })
                .then(e => e.map(x => x.followed))

        const byPerson = statusRepo.getAll({ author: person })
        const byFollowedPersons = followed.map(author => statusRepo.getAll({ author }))

        return await Promise.all([
            byPerson,
            ...byFollowedPersons
        ]).then(flatten).then(e => e.sort(sortTimeDescending))
    }

    function sortTimeDescending(a: Status, b: Status): number {
        return b.time.getTime() - a.time.getTime()
    }

    return {
        events,
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