const createMockRepo = (data = []) => ({
    add: jest.fn(async (e) => data.push(e)),
    getByAuthor: jest.fn(async (a) => data.filter(e => e.author == a)),
    getFollowed: jest.fn(async (a) => data.filter(e => e.following == a).map(e=>e.followed))
})

const deps = (statusRepo = createMockRepo(), relationshipRepo = createMockRepo()) => ({ statusRepo, relationshipRepo })

const status = (author, message, time) => ({ author, message, time })

describe.skip('App', () => {
    
    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('.');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })

        test('should throw if not valid dependencies are provided', () => {

            const factory = require('.')

            const cases = [undefined, { not: 'valid' }, createMockRepo()]
            const ok = (i, j) => i == 2 && j == 2

            for (let i = 0; i < cases.length; i++)
                for (let j = 0; j < cases.length; j++)
                    if (!ok(i, j)) expect(() => factory({
                        statusRepo: cases[i],
                        relationshipRepo: cases[j]
                    })).toThrow()

        })

    })

    describe('post()', () => {


        test('exposes post() method', () => {
            const dependencies = deps(),
                app = require('.')(dependencies)

            expect(app.post).toEqual(expect.any(Function));
        })

        test('call repo.add ', async () => {
            const dependencies = deps(),
                app = require('.')(dependencies),
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
                app = require('.')(dependencies)

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
                app = require('.')(dependencies),
                author = 'Bob'

            const result = await app.read(author)

            byBob.forEach(e => expect(result).toContain(e))
            byAlice.forEach(e => expect(result).not.toContain(e))

        })

    })



    describe('follow()', () => {


        test('exposes read() method', () => {
            const dependencies = deps(),
                app = require('.')(dependencies)

            expect(app.follow).toEqual(expect.any(Function));
        })

        test('call repo.follow ', async () => {
            const dependencies = deps(),
                app = require('.')(dependencies),
                following = 'Alice',
                followed = 'Bob'

            await app.follow(following, followed)

            expect(dependencies.relationshipRepo.add).toBeCalledWith({
                following,
                followed
            })

        })

    })

    describe('wall()', () => {

        test('exposes wall() method', () => {
            const dependencies = deps(),
                app = require('.')(dependencies)

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
                app = require('.')(dependencies)

            await app.follow('Charlie', 'Alice')
            const result = await app.wall('Charlie')

            byBob.forEach(e => expect(result).not.toContain(e))
            byAlice.forEach(e => expect(result).toContain(e))
            byCharlie.forEach(e => expect(result).toContain(e))

        })

    })


})

