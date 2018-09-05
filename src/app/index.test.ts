import { Status, Repository, Relationship } from "../interfaces";
import appFactory from './index'


const query = (f) => (e) => Object.keys(f).every(k => e[k] == f[k])

const createMockRepo = <T>(data: Array<T> = []): Repository<T> => ({
    add: jest.fn(async (e) => data.push(e)),
    getAll: jest.fn(async (f) => data.filter(query(f))),
})


const deps = (
    statusRepo = createMockRepo<Status>(),
    relationshipRepo = createMockRepo<Relationship>()
) => ({ statusRepo, relationshipRepo })


const status = (author, message, time = new Date()) => ({ author, message, time })

describe('App', () => {

    describe('creation', () => {

        test('should throw if not valid dependencies are provided', () => {

            const appFactory = require('./index')

            const cases = [undefined, { not: 'valid' }, createMockRepo()]
            const ok = (i, j) => i == 2 && j == 2

            for (let i = 0; i < cases.length; i++)
                for (let j = 0; j < cases.length; j++)
                    if (!ok(i, j)) expect(() => appFactory({
                        statusRepo: cases[i],
                        relationshipRepo: cases[j]
                    })).toThrow()

        })

    })

    describe('post()', () => {


        test('exposes post() method', () => {
            const dependencies = deps(),
                app = appFactory(dependencies)

            expect(app.post).toEqual(expect.any(Function));
        })

        test('call repo.add ', async () => {
            const dependencies = deps(),
                app = appFactory(dependencies),
                author = 'Alice',
                message = 'I love the weather today'

            await app.post(author, message)

            expect(dependencies.statusRepo.add).toBeCalledWith({
                author,
                message,
                time: expect.any(Date)
            })
        })

    })

    describe('read()', () => {


        test('exposes read() method', () => {
            const dependencies = deps(),
                app = appFactory(dependencies)

            expect(app.read).toEqual(expect.any(Function));
        })

        test('call repo.getByAuthor ', async () => {
            const byAlice = [
                status('Alice', 'I love the weather today', new Date())
            ], byBob = [
                status('Bob', 'Damn! We lost!', new Date()),
                status('Bob', 'Good game though.', new Date())
            ]

            const dependencies = deps(createMockRepo([...byAlice, ...byBob])),
                app = appFactory(dependencies),
                author = 'Bob'

            const result = await app.read(author)

            byBob.forEach(e => expect(result).toContain(e))
            byAlice.forEach(e => expect(result).not.toContain(e))

        })

    })



    describe('follow()', () => {


        test('exposes read() method', () => {
            const dependencies = deps(),
                app = appFactory(dependencies)

            expect(app.follow).toEqual(expect.any(Function));
        })

        test('call repo.follow ', async () => {
            const dependencies = deps(),
                app = appFactory(dependencies),
                following = 'Alice',
                followed = 'Bob'

            await app.follow(following, followed)

            expect(dependencies.relationshipRepo.add).toBeCalledWith({
                following,
                followed,
                time: expect.any(Date)
            })

        })

    })

    describe('wall()', () => {

        test('exposes wall() method', () => {
            const dependencies = deps(),
                app = appFactory(dependencies)

            expect(app.wall).toEqual(expect.any(Function));
        })

        test('call repo.follow ', async () => {

            const byAlice = [
                status('Alice', 'I love the weather today', new Date())
            ], byBob = [
                status('Bob', 'Damn! We lost!', new Date()),
                status('Bob', 'Good game though.', new Date())
            ], byCharlie = [
                status('Charlie', 'I\'m in New York today! Anyone wants to have a coffee?')
            ]


            const dependencies = deps(
                createMockRepo([...byAlice, ...byBob, ...byCharlie])
            ),
                app = appFactory(dependencies)

            await app.follow('Charlie', 'Alice')
            const result = await app.wall('Charlie')

            byBob.forEach(e => expect(result).not.toContain(e))
            byAlice.forEach(e => expect(result).toContain(e))
            byCharlie.forEach(e => expect(result).toContain(e))

        })

    })


})

