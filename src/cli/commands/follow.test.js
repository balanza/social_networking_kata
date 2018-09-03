describe('Commands.Follow', () => {

    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('./follow');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })


    })

    describe('parsing', () => {

        test('should return undefined on invalid input', () => {
            
            const command = require('./follow')

            expect(command(undefined)).not.toBeDefined()
            expect(command('not valid with spaces')).not.toBeDefined()

        })

        test('should return a function on valid input', () => {

            const command = require('./follow'),
                input = 'Charlie follows Alice'

            const action = command(input)

            expect(action).toEqual(expect.any(Function));

        })

        test('should return an action with correct parameters', async () => {

            const command = require('./follow'),
                following= 'Charlie', 
                followed= 'Alice', 
                input = `${following} follows ${followed}`,
                execute = command(input)

            const app = {
                follow: jest.fn(()=>Promise.resolve())
            }

            await execute(app)

            expect(app.follow).toBeCalledWith(following, followed)

        })


    })


})