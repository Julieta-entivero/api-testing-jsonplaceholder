module.exports = {
    baseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: parseInt(process.env.TEST_TIMEOUT) || 10000,
};
