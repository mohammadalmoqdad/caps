const caps = require('../CAPS/serverHub');

jest.spyOn(global.console, 'log');


describe("test The model for the events", () => {

    beforeAll(done => {
        caps.listen(3000, () => done());
    })

    afterAll(done => {
        caps.listening ? server.close(() => done()) : done();
    })

    it('test pickup event', async () => {
        await caps.emit("pickup", { event: "fake payload" });
        expect(console.log).toHaveBeenCalled();
    })



    it('test in-trasnit event', async () => {
        await caps.emit("in-trasnit", { event: "fake payload" });
        expect(console.log).toHaveBeenCalled();
    })



    it('test delivered event', async () => {
        await caps.emit("delivered", { event: "fake payload" });
        expect(console.log).toHaveBeenCalled();
    })
})

