import express from 'express';
import { authMiddleware } from './middleware';
import { prismaClient } from 'db/client';

const app = express();

app.use(express.json());


app.post('/api/v1/website', authMiddleware , async (req, res) => {
    const userId = req.userId!;
    const {url} = req.body;

    const data = await prismaClient.website.create({
        data: {
            userId,
            url

}
})
    res.json({
        id: data.id
    });

});