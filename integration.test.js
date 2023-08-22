const { fetchData } = require('../../src/fetch-data');
const request = require('supertest');
const { app, server, fetchDataAndUpdate } = require('../../src/server');

jest.mock('../../src/fetch-data');

describe('/metrics endpoint', () => {
    let dataFetchInterval;
    let fetchInterval = 1000;
    beforeAll(() => {
        dataFetchInterval = setInterval(fetchDataAndUpdate, fetchInterval);
    });

    afterAll((done) => {
        clearInterval(dataFetchInterval);
        server.close(done);
    });

    it('should return fetched data', async () => {
        const mockFetchedData = 'Sample mock data';
        fetchData.mockResolvedValue(mockFetchedData);
        await fetchDataAndUpdate();

        const response = await request(app).get('/metrics');

        expect(response.status).toBe(200);
        expect(response.text).toEqual(mockFetchedData);
    });
});
