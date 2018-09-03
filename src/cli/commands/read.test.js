describe('Commands.Read', () => {

    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('./read');

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

            const now = new Date(),
                minutesAgo = (m)=> new Date(now.getTime()-m*60*1000),
                secondsAgo = (m)=> new Date(now.getTime()-m*1000)

            const command = require('./read'),
                person = 'Bob',
                input = `${person}`,
                execute = command(input),
                status1 = {
                    author: person,
                    message: 'Good game though.',
                    time: minutesAgo(2)
                },
                status2 = {
                    author: person,
                    message: 'Damn! We lost!',
                    time: minutesAgo(3)
                }

            const app = {
                read: jest.fn(() => Promise.resolve([
                    status1, status2
                ]))
            }

            const output = await execute(app)

            expect(output).toEqual([
                'Good game though. (2 minutes ago)',
                'Damn! We lost! (3 minutes ago)'
            ])

        })


    })


})