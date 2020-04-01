const generateUserId = require('../../src/utils/generateUserId')

describe('Generate Unique Id', () => {
    it('Should generate an unique ID', () => {
        const id = generateUserId()



        expect(id).toHaveLength(8)
    })
})