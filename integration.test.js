const { fetchData } = require('../../src/fetch-data');
const request = require('supertest');
const { app, server, fetchDataAndUpdate, intervalId } = require('../../src/server');

jest.mock('../../src/fetch-data');

describe('/metrics endpoint', () => {
    afterAll((done) => {
        clearInterval(intervalId);
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
