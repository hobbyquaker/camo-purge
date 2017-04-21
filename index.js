#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const request = require('request');
const async = require('async');

const config = require('yargs')
    .usage('Usage: $0 [options]')
    .describe('repository', 'url to the projects github repository')
    .alias('r', 'repository')
    .help()
    .version()
    .argv;

let url;

if (config.repository) {
    url = config.repository;
} else {
    const pkgPath = path.resolve(path.join(__dirname, '..', '..', 'package.json'));
    if (fs.existsSync(pkgPath)) {
        const pkg = require(pkgPath);
        if (typeof pkg.repository === 'string') {
            url = pkg.repository.replace(/^git\+/, '').replace(/\.git$/, '');
        } else if (typeof pkg.repository === 'object' && pkg.repository.url) {
            url = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '');
        } else {
            console.err('Error: No repository information found in', pkgPath);
            process.exit(1);
        }
        console.log('Found repository', url);
    } else {
        console.error('Error:', pkgPath, 'not found.');
        process.exit(1);
    }
}

request(url, (err, res, body) => {
    if (err) {
        console.error('GET', url, err);
        process.exit(1);
    } else {
        const queue = [];
        const lines = body.split('\n');
        lines.forEach(line => {
            const match = line.match(/<img src="(https:\/\/camo\.githubusercontent\.com\/[a-f0-9]+\/[a-f0-9]+)" alt="([^"]+)"/);
            if (match) {
                console.log('Found image', match[2]);
                queue.push({url: match[1], alt: match[2]});
            }
        });
        if (queue.length === 0) {
            console.error('Error: No images found.');
            process.exit(1);
        } else {
            async.mapSeries(queue, (obj, cb) => {
                request({
                    method: 'PURGE',
                    url: obj.url,
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        console.error('Error: PURGE', obj.alt, err);
                    } else {
                        console.log('PURGE', obj.alt, body.status);
                    }
                    cb();
                });
            });
        }
    }
});
