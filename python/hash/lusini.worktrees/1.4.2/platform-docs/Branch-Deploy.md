### flow as diagram

![plot](./branchDeployFlowChart.png)

### setup

#### repo

- Build-script e.g. `/netlify-build.mjs` must be created. This will be run on Netlify, when Build is triggered.
- Add script-cmd in package.json e.g. `netlify-build": "node netlify-build.mjs`
- ` branchDeploy.yml` add to `./github/workflows`
- add `netlify.toml` to root dir

#### netlify

- enable auto builds (otherwise, buildhooks will not work)
- enable build hooks -> copy BUILD_HOOK_ID (everything after first slash, should be number)
- modify build comand in netlify to the one you added to `package.json` before `yarn run netlify-build `
- build-dir: `public`

#### github

- BUILD_HOOK_ID add as Action Secret (Key - Value) in the repo `settings --> secrets --> action secrets `
- The [key_name] is needed to trigger the branch deploy.
- We use for every locale, a specific key, to be able to trigger all different locals with just one workflow file.

#### Example Trigger Deploy

```console
curl \                                                         curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/eBusEmmos/lusini/actions/workflows/branchDeploy.yml/dispatches \
  -d '{ "ref": "main", "inputs": { "branch": "main", "netlifyBuildHookName": "NETLIFY_HOOK_ID_PROD_NL_NL", "locale": "nl-nl"}}'
```

-->

```
bearer token = GitHub token which has access to the repo
body = {
  ref = name of branch
  inputs: {
    branch = name of branch (same as ref)
    netlifyBuildHookName = ID of Build Hook, which was stored as github action secret in step before
}
```
