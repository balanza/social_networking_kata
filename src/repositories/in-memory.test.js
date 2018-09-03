const i = (id, name) => ({
    id,
    name
})

describe('Repositories.InMemory', () => {

    describe('creation', () => {
        test('should create without errors', () => {

            const requireModule = () => require('./in-memory');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })
    })

    describe('getAll()', () => {

        test('should expose getAll() method', () => {

            const repo = require('./in-memory')()

            expect(repo.getAll).toEqual(expect.any(Function))

        })

        test('should retrieve all stored items', async () => {

            const seed = [i(1), i(2), i(3)]
            repo = require('./in-memory')(seed)

            const result = await repo.getAll()

            expect(result).toEqual([
                i(1), i(2), i(3)
            ])

        })

        test('should retrieve queried items', async () => {

            const seed = [i(1), i(2), i(3)]
            repo = require('./in-memory')(seed)

            const result = await repo.getAll({
                id: 2
            })

            expect(result).toEqual([
                i(2)
            ])

        })

        describe('add()', () => {

            test('should expose add() method', () => {

                const repo = require('./in-memory')()

                expect(repo.add).toEqual(expect.any(Function))

            })

            test('should add the item', async () => {

                const seed = [i(1), i(2), i(3)]
                repo = require('./in-memory')(seed)

                await repo.add(i(4))
                const actualContent = await repo.getAll()

                expect(actualContent).toEqual([
                    i(1), i(2), i(3), i(4)
                ])

            })


        })



    })
})