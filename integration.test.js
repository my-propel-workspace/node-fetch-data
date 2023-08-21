const request = require('supertest');
const dataManager = require('./data-manager');
const { app, server } = require('./index');

describe('/metrics endpoint', () => {
  let fetchDataAndUpdateMock;

  beforeAll(() => {
    jest.useRealTimers(); // Use real timers for this test suite
    fetchDataAndUpdateMock = jest.spyOn(dataManager, 'fetchDataAndUpdate').mockResolvedValue();
  });

  afterAll((done) => {
    jest.useFakeTimers(); // Restore default behavior after the test suite
    fetchDataAndUpdateMock.mockRestore();
    server.close(done); // Close the server after all tests are done
  });

  it('should return fetched data', async () => {
    const testData = { metric: 'value' };
    jest.spyOn(dataManager, 'getData').mockReturnValue(testData);

    const response = await request(app).get('/metrics');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testData);
    expect(dataManager.getData).toHaveBeenCalledTimes(1);
  });
});
