module.exports = ({ statusRepo, relationshipRepo }) => {

    required('statusRepo', statusRepo)
    isRepo('statusRepo', statusRepo)
    required('relationshipRepo', relationshipRepo)
    isRepo('relationshipRepo', relationshipRepo)


    async function post(author, message) {
        const status = { author, message, time: new Date() }
        return statusRepo.add(status)
    }

    async function read(author) {
        return statusRepo.getByAuthor(author)
    }

    async function follow(following, followed) {
        const relationship = { following, followed }
        return relationshipRepo.add(relationship)
    }

    async function wall(person) {
        const followed = await relationshipRepo.getFollowed(person)
        return await Promise.all([
            statusRepo.getByAuthor(person),
            ...followed.map(a => statusRepo.getByAuthor(a))
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