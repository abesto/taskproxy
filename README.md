# taskproxy

A fully configurable HTTP frontend for showing views of your [taskwarrior](http://taskwarrior.org/) TODO list.

It calls `task` and passes the output through `aha` to turn the colored ASCII into colored HTML.

## Use-case

I use this to share my tasks not tracked on a Kanban board with my team. My setup is:

 * a cronjob on my dev machine that periodically runs `task sync` which syncs to
 * a `taskserver` I host, from which in turn reads
 * another cronjob (this time on the server), `task sync`-ing to the user which then runs this application

This way I use `task` normally during the day, and it automatically generates an online, accessible version of
the state of my tasks.

## Configuring

Try
```
env task:alwaysfilters:list=tag:work auth:type=basic auth:realm='dragonses' auth:file=htpasswd npm start
```

## Assemblies required

Note the lack of a "Getting started" section. I don't promise it's trivial to set up.

