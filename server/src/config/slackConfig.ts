export const slackConfig = {
  appId: process.env.SLACK_APP_ID,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  singingSecret: process.env.SLACK_SIGNING_SECRET,
  redirectUri: `${process.env.HOST}/api/slack_oauth/callback`,
}

/**
 * Throw an error if any of the fields in slack
 * config is null
 */
for(const key in slackConfig) {
  if (!slackConfig[key]) {
    throw new Error(`${key} is not defined in slackConfig`);
  }
}
