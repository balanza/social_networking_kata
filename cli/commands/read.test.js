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
                person= 'Alice', 
                input = `${person}`,
                execute = command(input)

            const app = {
                read: jest.fn(()=>Promise.resolve())
            }

            await execute(app)

            expect(app.read).toBeCalledWith(person)

        })


    })


})