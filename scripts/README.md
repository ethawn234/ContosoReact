# Scripts

This directory contains utility scripts for the ContosoReact project.

## create-jira-ticket.js

This script fetches the latest open GitHub issue from the repository and creates a corresponding Jira ticket.

### Prerequisites

Before running this script, you need to set up the following environment variables:

#### Required Environment Variables

- `JIRA_HOST` - Your Jira instance URL (e.g., `https://your-domain.atlassian.net`)
- `JIRA_EMAIL` - Your Jira account email address
- `JIRA_API_TOKEN` - Your Jira API token ([Generate here](https://id.atlassian.com/manage-profile/security/api-tokens))
- `JIRA_PROJECT_KEY` - The key of your Jira project (e.g., `PROJ`, `DEV`, etc.)

#### Optional Environment Variables

- `GITHUB_TOKEN` - GitHub personal access token (optional but recommended for higher rate limits)

### How to Get Jira API Token

1. Log in to your Atlassian account
2. Go to https://id.atlassian.com/manage-profile/security/api-tokens
3. Click "Create API token"
4. Give it a name (e.g., "ContosoReact Integration")
5. Copy the generated token

### Usage

#### Method 1: Export environment variables (Linux/Mac)

```bash
export JIRA_HOST="https://your-domain.atlassian.net"
export JIRA_EMAIL="your-email@example.com"
export JIRA_API_TOKEN="your-api-token"
export JIRA_PROJECT_KEY="PROJ"
export GITHUB_TOKEN="your-github-token"  # optional

npm run jira:create-ticket
```

#### Method 2: Inline environment variables

```bash
JIRA_HOST="https://your-domain.atlassian.net" \
JIRA_EMAIL="your-email@example.com" \
JIRA_API_TOKEN="your-api-token" \
JIRA_PROJECT_KEY="PROJ" \
npm run jira:create-ticket
```

#### Method 3: Using a .env file (with a tool like `dotenv`)

Create a `.env` file in the root directory (don't commit this file!):

```
JIRA_HOST=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token
JIRA_PROJECT_KEY=PROJ
GITHUB_TOKEN=your-github-token
```

Then run with:
```bash
# Install dotenv-cli if not already installed
npm install -g dotenv-cli

# Run the script
dotenv npm run jira:create-ticket
```

### What the Script Does

1. Fetches the latest open GitHub issue from the `ethawn234/ContosoReact` repository
2. Creates a new Jira ticket in your specified project with:
   - **Summary**: The GitHub issue title
   - **Description**: The GitHub issue body, along with:
     - Link to the GitHub issue
     - GitHub issue creator
     - Labels from the GitHub issue
   - **Issue Type**: Task

### Output

The script will output:
- ✅ Success message with the created Jira ticket key and URL
- ❌ Error messages if something goes wrong

### Example Output

```
🚀 GitHub to Jira Integration

📥 Fetching latest GitHub issue...
✅ Found issue #19: CVE-2025-58751

📤 Creating Jira ticket...
✅ Jira ticket created successfully!
   Key: PROJ-123
   URL: https://your-domain.atlassian.net/browse/PROJ-123

✨ Done!
```

### Troubleshooting

**Error: Missing required environment variables**
- Make sure all required environment variables are set

**Error: HTTP 401 (Unauthorized)**
- Check your Jira email and API token are correct
- Verify your API token hasn't expired

**Error: HTTP 404**
- Verify your JIRA_HOST is correct (should include `https://`)
- Check that the JIRA_PROJECT_KEY exists in your Jira instance

**Error: HTTP 400 (Bad Request)**
- The project key might not exist
- The issue type "Task" might not be available in your project
- Check your Jira project settings

**Rate Limit Errors from GitHub**
- Set the `GITHUB_TOKEN` environment variable with a personal access token
