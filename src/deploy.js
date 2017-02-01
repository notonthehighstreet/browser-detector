const s3 = require('s3');
const fs = require('fs-extra');

const client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.DETECTOR_AWS_ACCESS_KEY,
        secretAccessKey: process.env.DETECTOR_AWS_SECRET_KEY
    }
});

const targetDir = './dist/' + process.env.npm_package_version;

fs.ensureDir(targetDir, function (err) {});

try {
    fs.copySync('./dist/detector.min.js', targetDir+'/detector.min.js');
} catch (err) {}

const params = {
    localDir: './dist',
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
    console.log('removing temp files...');
    fs.removeSync(targetDir, function (err) {
        if (err) return console.error(err)
    });
    console.log('done uploading'); // eslint-disable-line no-console
});