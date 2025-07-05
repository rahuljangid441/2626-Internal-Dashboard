import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/download' , async(req , res)=>{
    const {url} = req.query;
    if(!url){
        return res.status(400).json({message : 'URL is required'});
    }

    try{
        const response = await fetch(url);
        if(!response.ok){
            return res.status(500).json({message : 'Failed to fetch image'});
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            // Not an image, probably an error page
            const text = await response.text();
            return res.status(500).send('Failed to fetch image. Response was:\n' + text);
        }

        res.setHeader('Content-Type' , contentType);
        res.setHeader('Content-Disposition' , 'attachment; filename=ai-image.png');

        response.body.pipe(res);
    }catch(error){
        res.status(500).json({message : 'Proxy error: ' + error.message});
    }
});

export default router;