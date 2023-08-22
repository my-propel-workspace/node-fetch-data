const fetchData = require('./fetch-data'); // Assuming you have a fetch-data.js module
const request = require('supertest');
const { app, server, fetchDataAndUpdate } = require('./index-one');

jest.mock('./fetch-data');

describe('/metrics endpoint', () => {

    let dataFetchInterval;

    beforeAll(() => {
        dataFetchInterval = setInterval(fetchDataAndUpdate, fetchInterval);
    });

    afterAll((done) => {
        clearInterval(dataFetchInterval);
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
