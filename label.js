const githubLabelSync = require('github-label-sync');

githubLabelSync({
  accessToken: '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',
  repo: 'Jiyul-Kim/fullstack-community-board',
  labels: [],
  dryRun: true,
}).then(diff => {
  console.log(diff);
});