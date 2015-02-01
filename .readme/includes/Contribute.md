
### Testing

The purpose of the project is to provide a library that can be used across every platform that uses javascript. The tests are done using jasmine and using the browser to debug. Every file save on the "src" folder will recompile
the browserify bundle.

``` bash


grunt dev


```

### Build

The build process will run a set of tasks including linting and testing. To contribute please add
tests to the fix/feature you've worked.

Also, when building the documention is compiled into the README.md. Each module iniside the "src" directory
should contain a ".md" file to document it's behaviour.

The following command will run the build.

``` bash


grunt


```

### Release

``` bash

# change the package.json, bower.json pre-release version (v1.0.0-1)
grunt pre-release

# change the package.json, bower.json minor version (v1.0.1)
grunt patch

# Publish current version to npm and bower
grunt deploy

```

