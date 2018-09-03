import cliFactory from './index'
import { App } from '../interfaces/index';

declare function require(name: string)

const createMockApp = (): App => ({
    post: jest.fn(() => Promise.resolve()),
    read: jest.fn(() => Promise.resolve([])),
    follow: jest.fn(() => Promise.resolve()),
    wall: jest.fn(() => Promise.resolve([]))
})

describe('App', () => {

    describe('execute()', () => {

        test('exposes execute() method', () => {

            const app = createMockApp(),
                cli = cliFactory(app)

            expect(cli.execute).toEqual(expect.any(Function))

        })

        test('throw if no input is passed', () => {

            const app = createMockApp(),
                cli = cliFactory(app),
                input = ''

            expect(cli.execute(input)).rejects.toBeDefined()

        })

        test('throw if unknown command is passed', () => {

            const app = createMockApp(),
                cli = cliFactory(app),
                input = 'unknown command'

            expect(cli.execute(input)).rejects.toBeDefined()

        })

    })

    describe('execute() :posting', () => {

        test('Should implement posting', () => {

            const app = createMockApp(),
                cli = cliFactory(app),
                input = 'Alice -> I love the weather today'

            expect(cli.execute(input)).resolves.not.toBeDefined()


        })

    })

    describe('execute() :reading', () => {

        test('Should implement reading', () => {

            const app = createMockApp(),
                cli = cliFactory(app),
                input = 'Alice'

            expect(cli.execute(input)).resolves.toEqual([])

        })

    })

    describe('execute() :following', () => {

        test('Should implement following', async () => {

            const app = createMockApp(),
                cli = cliFactory(app),
                input = 'Charlie follows Alice'

            expect(cli.execute(input)).resolves.not.toBeDefined()

        })

    })

    describe('execute() :wall', () => {

        test('Should implement wall', () => {

            const app = createMockApp(),
                cli = cliFactory(app),
                input = 'Alice wall'

            expect(cli.execute(input)).resolves.toEqual([])

        })

    })


})