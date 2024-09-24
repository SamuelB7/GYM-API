import { Environment } from 'vitest/environments'

export default <Environment><unknown>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        console.log('Setting up Prisma environment')

        return {
            teardown() {
                console.log('Tearing down Prisma environment')
            },
        }
    },
}