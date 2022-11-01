import { Octokit } from '@octokit/core'
import fs from 'fs'
import request from 'request'
import admZip from 'adm-zip'
;(async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const owner = 'eBusEmmos'
  const repo = 'lusini'

  const res = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/artifacts',
    {
      owner: owner,
      repo: repo,
      type: 'private',
    }
  )
  let url = ''
  let artifactId = ''

  for (const i in res.data.artifacts)
    if (res.data.artifacts[i].name === process.env['INCOMING_HOOK_BODY']) {
      url = res.data.artifacts[i].archive_download_url
      artifactId = res.data.artifacts[i].id
    }

  var options = {
    method: 'GET',
    url: url,
    headers: {
      Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
      'user-agent': 'node.js',
    },
  }

  request(options)
    .pipe(fs.createWriteStream('public.zip'))
    .on('close', () => {
      var zip = new admZip('public.zip')
      zip.extractAllTo('./public')
      octokit.request(
        'DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}',
        {
          owner: owner,
          repo: repo,
          artifact_id: artifactId,
        }
      )
    })
})()
