const s3 = require('s3');
const client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.DETECTOR_AWS_ACCESS_KEY,
        secretAccessKey: process.env.DETECTOR_AWS_SECRET_KEY
    }
});

const params = {
    localDir: './dist/',
    s3Params: {
        ACL:'public-read',
        Bucket: process.env.DETECTOR_AWS_BUCKET,
        CacheControl: 'max-age=31536000'
    }
};

const uploader = client.uploadDir(params);
uploader.on('error', function(err) {
    console.error('unable to upload:', err.stack); // eslint-disable-line no-console
});
uploader.on('progress', function() {
    console.log('progress');
});
uploader.on('end', function() {
    console.log('done uploading'); // eslint-disable-line no-console
});