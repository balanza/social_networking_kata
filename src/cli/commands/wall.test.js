describe('Commands.Wall', () => {

    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('./wall');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })

    })

    describe('parsing', () => {

        test('should return undefined on invalid input', () => {
            
            const command = require('./wall')

            expect(command(undefined)).not.toBeDefined()
            expect(command('not valid with spaces')).not.toBeDefined()

        })

        test('should return a function on valid input', () => {

            const command = require('./wall'),
                input = 'Alice wall'

            const action = command(input)

            expect(action).toEqual(expect.any(Function));

        })

        test('should return an action with correct parameters', async () => {

            const command = require('./wall'),
                person= 'Alice', 
                input = `${person} wall`,
                execute = command(input)

            const app = {
                wall: jest.fn(()=>Promise.resolve())
            }

            await execute(app)

            expect(app.wall).toBeCalledWith(person)

        })

        test('should correctly format output (not empty)', async () => {

            const command = require('./wall'),
                person = 'Charlie',
                followedPerson = 'Alice'
                input = `${person} wall`,
                execute = command(input),
                status1 = {
                    author: person,
                    message: 'I\'m in New York today! Anyone wants to have a coffee?',
                    time: new Date(1535902978192)
                },
                status2 = {
                    author: followedPerson,
                    message: 'I love the weather today',
                    time: new Date(1535902987426)
                }

            const app = {
                wall: jest.fn(() => Promise.resolve([
                    status2, status1
                ]))
            }

            const output = await execute(app)

            expect(output).toEqual([
                'Alice - I love the weather today (1535902987426)',
                'Charlie - I\'m in New York today! Anyone wants to have a coffee? (1535902978192)'
            ])

        })


    })


})