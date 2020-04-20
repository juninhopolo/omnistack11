const generateUniqueId = require('../../src/Utils/generateUniqueId');

describe('Generate Unique Id.', () => {
    it('should generate an unique id', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});