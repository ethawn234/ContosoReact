#!/usr/bin/env node

/**
 * Script to create a Jira ticket from the latest GitHub issue
 * 
 * Required environment variables:
 * - GITHUB_TOKEN: GitHub personal access token
 * - JIRA_HOST: Jira instance URL (e.g., https://your-domain.atlassian.net)
 * - JIRA_EMAIL: Jira user email
 * - JIRA_API_TOKEN: Jira API token
 * - JIRA_PROJECT_KEY: Jira project key (e.g., PROJ)
 */

import https from 'https';
import http from 'http';

// Configuration from environment variables
const config = {
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: 'ethawn234',
    repo: 'ContosoReact'
  },
  jira: {
    host: process.env.JIRA_HOST,
    email: process.env.JIRA_EMAIL,
    apiToken: process.env.JIRA_API_TOKEN,
    projectKey: process.env.JIRA_PROJECT_KEY
  }
};

// Validate required environment variables
function validateConfig() {
  const missing = [];
  
  if (!config.jira.host) missing.push('JIRA_HOST');
  if (!config.jira.email) missing.push('JIRA_EMAIL');
  if (!config.jira.apiToken) missing.push('JIRA_API_TOKEN');
  if (!config.jira.projectKey) missing.push('JIRA_PROJECT_KEY');
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\nPlease set these environment variables and try again.');
    process.exit(1);
  }
}

// Make HTTPS request helper
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const protocol = options.protocol === 'http:' ? http : https;
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

// Fetch latest GitHub issue
async function getLatestGithubIssue() {
  console.log('📥 Fetching latest GitHub issue...');
  
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${config.github.owner}/${config.github.repo}/issues?state=open&sort=created&direction=desc&per_page=1`,
    method: 'GET',
    headers: {
      'User-Agent': 'Node.js Script',
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  
  if (config.github.token) {
    options.headers['Authorization'] = `Bearer ${config.github.token}`;
  }
  
  try {
    const issues = await makeRequest(options);
    
    if (!issues || issues.length === 0) {
      console.log('⚠️  No open issues found in the repository.');
      return null;
    }
    
    const issue = issues[0];
    console.log(`✅ Found issue #${issue.number}: ${issue.title}`);
    return issue;
  } catch (error) {
    console.error('❌ Error fetching GitHub issue:', error.message);
    throw error;
  }
}

// Create Jira ticket
async function createJiraTicket(githubIssue) {
  console.log('\n📤 Creating Jira ticket...');
  
  // Parse Jira host URL
  const jiraUrl = new URL(config.jira.host);
  
  // Prepare Jira ticket data
  const jiraTicket = {
    fields: {
      project: {
        key: config.jira.projectKey
      },
      summary: githubIssue.title,
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: githubIssue.body || 'No description provided.'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '\n\n---\n'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'GitHub Issue: ',
                marks: [{ type: 'strong' }]
              },
              {
                type: 'text',
                text: `#${githubIssue.number}`,
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: githubIssue.html_url
                    }
                  }
                ]
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Created by: ',
                marks: [{ type: 'strong' }]
              },
              {
                type: 'text',
                text: githubIssue.user.login
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Labels: ',
                marks: [{ type: 'strong' }]
              },
              {
                type: 'text',
                text: githubIssue.labels.map(l => l.name).join(', ') || 'None'
              }
            ]
          }
        ]
      },
      issuetype: {
        name: 'Task'
      }
    }
  };
  
  // Create Jira API credentials
  const auth = Buffer.from(`${config.jira.email}:${config.jira.apiToken}`).toString('base64');
  
  const options = {
    hostname: jiraUrl.hostname,
    path: '/rest/api/3/issue',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options, JSON.stringify(jiraTicket));
    console.log(`✅ Jira ticket created successfully!`);
    console.log(`   Key: ${response.key}`);
    console.log(`   URL: ${config.jira.host}/browse/${response.key}`);
    return response;
  } catch (error) {
    console.error('❌ Error creating Jira ticket:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 GitHub to Jira Integration\n');
  
  validateConfig();
  
  try {
    const githubIssue = await getLatestGithubIssue();
    
    if (!githubIssue) {
      console.log('No issues to sync.');
      process.exit(0);
    }
    
    await createJiraTicket(githubIssue);
    
    console.log('\n✨ Done!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    process.exit(1);
  }
}

main();
