const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;

const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});

redisClient.set('visits', 0);

app.get('/', (req, res) => {

    redisClient.get('visits', function (err, value) {
        res.send(`Total Visits: ${value} `);

        const visits = parseInt(value) + 1;
        redisClient.set('visits', visits);
    });

});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
