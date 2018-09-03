const statusModel = require('../models/status')
const relationshipModel = require('../models/relationship')

module.exports = ({
    statusRepo,
    relationshipRepo
}) => {

    required('statusRepo', statusRepo)
    isRepo('statusRepo', statusRepo)
    required('relationshipRepo', relationshipRepo)
    isRepo('relationshipRepo', relationshipRepo)


    async function post(author, message) {
        const status = statusModel.create(author, message)
        //  console.log('status', status)
        return statusRepo.add(status)
    }

    async function read(author) {
        const result = await statusRepo.getAll({
            author
        })
        //  console.log('read', result)
        return result
    }

    async function follow(following, followed) {
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
        ]).then(flatten)
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