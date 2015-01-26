var nconf = require('nconf');

nconf.argv().env().file('/etc/taskproxy.json');

nconf.defaults({
    // authentication
    // type must be one of the methods defined on http-auth. the options to be passed to the function should be defined
    // as keys under auth, for example:
    // 'auth:type': 'basic', 'auth:realm': 'auth realm', 'auth:file': '/etc/taskproxy/htpasswd'
    'auth:type': 'none',

    'aha:path': '/usr/local/bin/aha',

    'task:path': '/usr/local/bin/task',      // task binary
    'task:rc': '~/.taskrc',                  // taskrc
    'task:forcecolor': 'on',                 // you shouldn't have to touch this

    // views
    // first define the space-separated list of URLs we'll serve
    'task:urls': '/ /burndown /colors /completed /completed/yesterday',
    // then for each url the space-separated list of arguments to be passed to `task`
    'task:view:/': '',
    'task:view:/burndown': 'burndown.daily',
    'task:view:/colors': 'colors',
    'task:view:/completed': 'completed',
    'task:view:/completed/yesterday': 'completed end:yesterday',
    'task:view:/completed/today': 'completed end:today',

    // filters for (almost) all views
    'task:alwaysfilters:list': '',           // space-separated list of filters to apply to each view. for example: 'tag:work tag:share'
    'task:alwaysfilters:ignore': '/colors',  // space-separated list of urls to which alwaysfilters:list doesn't apply

    // ENV variables for running `task`
    'task:env:TERM': 'xterm-color'
});

module.exports = nconf;
