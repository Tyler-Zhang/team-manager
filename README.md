![](https://i.imgur.com/yyTAVaQ.png)

Easy to use fullstack application for sharing resources with team members in your organization.

## Integrations

Integrations can be set up under the **Organization** tab.

![](https://i.imgur.com/IhHlzKs.png)

### Google Drive

The project currently only integrates with Google Drive. Google drive files
are synced to the organization as resources and can be distributed to teams.
The server also automatically registers for Google Drive webhooks so that
organization resources are kept up to date.

### Slack

Coming soon!

## Deployment

### Running in Production

Running in production is extremely easy since both the client and the server are dockerized. You must have docker installed and the docker
service running.

```bash
# Clone the repository
git clone git@github.com:Tyler-Zhang/team-manager.git

cd team-manager

# Copy the environment file
cp .env.example .env
```

At this point you will have to fill in the .env file with the correct
values. You will also need to register as aou Google Developer so you can
get the necessary keys to enable all of the functionality. Your host will
also need to be verified if you want Google Drive Webhooks to be enabled.

```bash
# start the application
sudo docker-compose up -d
```

### Debugging in production

There are two helpful commands that are defined in the Makefile in this
project:

```bash
# Connect to the postgres comtainer using PSQL
# (Given that you did not change the DB config in the .env file)
make psql


# Connect to the node.js console
make console
```

Check out [this file](https://github.com/Tyler-Zhang/team-manager/blob/master/server/src/console.ts) to see what is exposed to the context of the console
