const createMockApp = () => ({
    post: jest.fn(() => Promise.resolve()),
    read: jest.fn(() => Promise.resolve()),
    follow: jest.fn(() => Promise.resolve()),
    wall: jest.fn(() => Promise.resolve())
})

describe('App', () => {

    describe('creation', () => {

        test('should create without errors', () => {

            const requireModule = () => require('./index');

            expect(requireModule).not.toThrow();
            expect(requireModule()).toEqual(expect.any(Function));

        })

        test('should throw if not valid dependencies are provided', () => {

            const factory = require('./index')

            const invalid_cases = [
                undefined,
                {},
                {
                    app: 'not valid app'
                }
            ]

            invalid_cases.forEach(deps => {
                expect(() => factory(deps)).toThrow()
            })

            const valid_cases = [{
                app: createMockApp()
            }]

            valid_cases.forEach(deps => {
                expect(() => factory(deps)).not.toThrow()
            })

        })

    })

    describe('execute()', () => {

        test('exposes execute() method', () => {

            const factory = require('./index'),
                app = createMockApp(),
                cli = factory({
                    app
                })

            expect(cli.execute).toEqual(expect.any(Function))

        })

        test('throw if no command is passed', () => {

            const factory = require('./index'),
                app = {},
                cli = factory({
                    app
                }),
                command = undefined

            expect(() => cli.execute(command)).toThrow()

        })

        test('throw if unknown command is passed', () => {

            const factory = require('./index'),
                app = {},
                cli = factory({
                    app
                }),
                command = 'unknown command'

            expect(() => cli.execute(command)).toThrow()

        })

    })

    describe('execute() :posting', () => {

        test('Should implement posting', () => {

            const factory = require('./index'),
                app = createMockApp(),
                cli = factory({
                    app
                }),
                command = 'Alice -> I love the weather today'

            expect(() => cli.execute(command)).not.toThrow()


        })

    })

    describe('execute() :reading', () => {

        test('Should implement reading', () => {

            const factory = require('./index'),
                app = createMockApp(),
                cli = factory({
                    app
                }),
                command = 'Alice'

            expect(() => cli.execute(command)).not.toThrow()


        })

    })

    describe('execute() :following', () => {

        test('Should implement following', () => {

            const factory = require('./index'),
                app = createMockApp(),
                cli = factory({
                    app
                }),
                command = 'Charlie follows Alice'

            expect(() => cli.execute(command)).not.toThrow()


        })

    })

    describe('execute() :wall', () => {

        test('Should implement wall', () => {

            const factory = require('./index'),
                app = createMockApp(),
                cli = factory({
                    app
                }),
                command = 'Alice wall'

            expect(() => cli.execute(command)).not.toThrow()


        })

    })


})