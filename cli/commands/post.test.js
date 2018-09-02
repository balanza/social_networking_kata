const createMockApp = () => ({})

describe('Commands.Post', () => {

    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('./post');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })


    })

    describe('parsing', () => {

        test('should return undefined on invalid input', () => {

            const command = require('./post')

            expect(command(undefined)).not.toBeDefined()
            expect(command('unknown')).not.toBeDefined()

        })

        test('should return a function on valid input', () => {

            const command = require('./post'),
                input = 'Alice -> I love the weather today'

            const action = command(input)

            expect(action).toEqual(expect.any(Function));

        })

        test('should return an action with correct parameters', async () => {

            const command = require('./post'),
                person = 'Alice',
                message = 'I love the weather today',
                input = `${person} -> ${message}`,
                execute = command(input)

            const app = {
                post: jest.fn(() => Promise.resolve())
            }

            await execute(app)

            expect(app.post).toBeCalledWith(person, message)

        })

        test('should correctly format output', async () => {

            const command = require('./post'),
                person = 'Alice',
                message = 'I love the weather today',
                input = `${person} -> ${message}`,
                execute = command(input)

            const app = {
                post: jest.fn(() => Promise.resolve())
            }

            const output = await execute(app)

            expect(output).not.toBeDefined()

        })


    })


})