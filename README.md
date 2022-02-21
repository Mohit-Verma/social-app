# social-media-application

## Prerequisites
- NodeJS v16 LTS or higher
- NPM v8 or higher
- Yarn v1.22.10 or higher, yarn v3 highly recommended

## Getting Started
1) Clone the *social-app* repo.
2) In case of getting long paths error on widonws, please run this command: ```git config --system core.longpaths true```
3) From root folder run ```server:start``` to run the local json-server
4) From root folder run ```application:start``` to run the UI application

## Yarn workspace explained
Yarn workspaces allows to work on multiple JS module simultaneously.
It removes the need of manually using link feature by automatically linking dependencies when modules in the same workspace depend on each other.
