module.exports = (function () {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var cp = require('child_process');
    var confGetter = require('../conf');

    function nonempty(x) { return x.length > 0; }

    function task(args, req, res) {
        var conf = confGetter.get();
        var finalArgs = [
            'rc:' + conf.task.rc,
            'rc._forcecolor=' + conf.task.forcecolor
        ].concat(args);
        var taskProcess = cp.spawn(conf.task.path, finalArgs, {env: conf.task.env});
        var ahaProcess = cp.spawn(conf.aha.path, ['--title', req.path, '--black']);

        taskProcess.stdout.on('data', function (data) {
            ahaProcess.stdin.write(data);
        });
        taskProcess.stdout.on('error', function (data) {
            res.send(500, data);
        });
        taskProcess.stdout.once('close', function () {
            ahaProcess.stdin.end();
        });

        ahaProcess.stdout.on('data', function (data) {
            res.write(data);
        });
        ahaProcess.stdout.on('error', function (data) {
            res.send(500, data);
        });
        ahaProcess.stdout.once('close', function () {
            res.end();
        });
    }

    function makeView(url, taskArgs) {
        router.get(url, function (req, res) {
            var conf = confGetter.get();
            var finalArgs = taskArgs;
            if (conf.task.alwaysfilters.ignore.split(' ').indexOf(url) === -1) {
                var alwaysfilters = confGetter.get().task.alwaysfilters.list.split(' ').filter(nonempty);
                finalArgs = taskArgs.concat(alwaysfilters);
            }
            task(finalArgs, req, res);
        });
    }

    var conf = confGetter.get();
    var urls = conf.task.urls.split(' ').filter(nonempty);
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var args = conf.task.view[url];
        if (args === undefined) {
            throw url + ' is in config value task:urls but config value task:view:' + url + ' doesn\'t exist.';
        }
        args = args.split(' ').filter(nonempty);
        makeView(url, args);
    }

    return router;
})();

