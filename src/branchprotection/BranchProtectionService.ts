import * as core from '@actions/core';
import * as github from '@actions/github';
export class BranchProtectionService {
  public static async getStateOfBranchProtection(): Promise<void> {
    console.log('Custom task is working!');
    const token = core.getInput('subscriptionId');
    console.log('Got the token');

    const octokit = github.getOctokit(token);
    console.log('octoKit authenticated');

    const { owner, repo } = github.context.repo;
    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);

    console.log('Going to get branch protection');
    await octokit.rest.repos
      .getBranchProtection({
        owner: owner,
        repo: repo,
        branch: 'main',
      })
      .then((response) => {
        console.log('Got the branch protection');
        console.log(response.data);
      })
      .catch((error) => {
        core.warning('Error getting branch protection!');
        console.log('Error: ', error.message);
      });
  }
}
