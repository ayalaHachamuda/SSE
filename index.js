const express = require('express');
const app = express();

app.get('/time',(req,res)=>{
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const theTimeNow = setInterval(()=>{
        const now = new Date();
        res.write(`data: ${now.toLocaleTimeString()}\n\n`);
    },1000)

    req.on('close',()=>{
        clearInterval(theTimeNow);
        res.end();

    });
});

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});