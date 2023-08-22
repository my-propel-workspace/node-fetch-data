const fetchData = require('./fetch-data'); // Assuming you have a fetch-data.js module
const request = require('supertest');
const { app, server, fetchDataAndUpdate } = require('./index-one');

jest.mock('./fetch-data');

describe('/metrics endpoint', () => {

    afterAll((done) => {
        server.close(done);
    });

    it('should return fetched data', async () => {
        const mockFetchedData = { metric: 'value' };
        fetchData.mockResolvedValue(mockFetchedData);
        await fetchDataAndUpdate();

        const response = await request(app).get('/metrics');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFetchedData);
    });
});
