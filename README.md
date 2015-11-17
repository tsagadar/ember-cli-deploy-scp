# Ember-cli-deploy-scp

> An ember-cli-deploy-plugin to copy your built assets to a remote host

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

This plugin uses the scp command (through /sbin/sh) to copy app assets onto a remote server.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][2].

## Quick Start
To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build][3] is installed and configured.

- Install this plugin

```bash
$ ember install ember-cli-deploy-scp
```

- Place the following configuration into `config/deploy.js`

```javascript
ENV.scp {
  destDir: '/home/myuser/public/',
  host: 'example.com',
  user: 'myuser'
}
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-scp
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `upload`
- `didDeploy`

## Configuration Options

### destDir

The root directory to which the contents of the [distDir](#distdir) will be copied to.

*Required*

### distDir

The root directory that will be used as source directory for cpr. By default, this option will use the `distDir` property of the deployment context.

*Default:* `context.distDir`

### didDeployMessage

A message that will be displayed after the distDir has been copied to destDir.

*Default:*

```javascript
if (context.revisionData.revisionKey) {
  return "Copied revision " + context.revisionData.revisionKey + ".";
}
```

### host

The target host to copy the files to.

*Required:*

### user

The user to log in to the target host.

*Required:*


## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`                     (provided by [ember-cli-deploy-build][2])
- `revisionData.revisionKey`    (provided by [ember-cli-deploy-revision-data][3])

## Running Tests

- `npm test`


[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[2]: https://github.com/zapnito/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/zapnito/ember-cli-deploy-revision-data "ember-cli-deploy-revision-data"
