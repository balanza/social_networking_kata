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


    })


})