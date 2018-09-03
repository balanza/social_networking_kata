describe('Commands.Read', () => {

    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('./post');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })


    })

    describe('parsing', () => {

        test('should return undefined on invalid input', () => {

            const command = require('./read')

            expect(command(undefined)).not.toBeDefined()
            expect(command('not valid with spaces')).not.toBeDefined()

        })

        test('should return a function on valid input', () => {

            const command = require('./read'),
                input = 'Alice'

            const action = command(input)

            expect(action).toEqual(expect.any(Function));

        })

        test('should return an action with correct parameters', async () => {

            const command = require('./read'),
                person = 'Alice',
                input = `${person}`,
                execute = command(input)

            const app = {
                read: jest.fn(() => Promise.resolve())
            }

            await execute(app)

            expect(app.read).toBeCalledWith(person)

        })

        test('should correctly format output (empty)', async () => {

            const command = require('./read'),
                person = 'Alice'
            input = `${person}`,
                execute = command(input)

            const app = {
                read: jest.fn(() => Promise.resolve())
            }

            const output = await execute(app)

            expect(output).toEqual([])

        })


        test('should correctly format output (not empty)', async () => {

            const command = require('./read'),
                person = 'Bob',
                input = `${person}`,
                execute = command(input),
                status1 = {
                    author: person,
                    message: 'Good game though.',
                    time: new Date(1535902978192)
                },
                status2 = {
                    author: person,
                    message: 'Damn! We lost!',
                    time: new Date(1535902987426)
                }

            const app = {
                read: jest.fn(() => Promise.resolve([
                    status1, status2
                ]))
            }

            const output = await execute(app)

            expect(output).toEqual([
                'Good game though. (1535902978192)',
                'Damn! We lost! (1535902987426)'
            ])

        })


    })


})