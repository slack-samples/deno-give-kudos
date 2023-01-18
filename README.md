# Give Kudos Sample App

Share warm kudos and kind words with anyone in your workspace using functions
and a workflow!

**Guide Outline**:

- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Clone the Sample App](#clone-the-sample-app)
- [Create a Link Trigger](#create-a-link-trigger)
- [Running Your Project Locally](#running-your-project-locally)
  - [Updating the GIF Catalog](#updating-the-gif-catalog)
- [Testing](#testing)
- [Deploying Your App](#deploying-your-app)
  - [Viewing Activity Logs](#viewing-activity-logs)
- [Project Structure](#project-structure)
- [Resources](#resources)

---

## Setup

Before getting started, make sure you have a development workspace where you
have permissions to install apps. If you don’t have one set up, go ahead and
[create one](https://slack.com/create). Also, please note that the workspace
requires any of [the Slack paid plans](https://slack.com/pricing).

### Install the Slack CLI

To use this sample, you first need to install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/future/quickstart).

### Clone the Sample App

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack create give-kudos-app -t slack-samples/deno-give-kudos

# Change into this project directory
$ cd give-kudos-app
```

## Create a Link Trigger

[Triggers](https://api.slack.com/future/triggers) are what cause workflows to
run. These triggers can be invoked by a user, or automatically as a response to
an event within Slack.

A [link trigger](https://api.slack.com/future/triggers/link) is a type of
trigger that generates a **Shortcut URL** which, when posted in a channel or
added as a bookmark, becomes a link. When clicked, the link trigger will run the
associated workflow.

Link triggers are _unique to each installed version of your app_. This means
that Shortcut URLs will be different across each workspace, as well as between
[locally run](#running-your-project-locally) and
[deployed apps](#deploying-your-app). When creating a trigger, you must select
the Workspace that you'd like to create the trigger in. Each Workspace has a
development version (denoted by `(dev)`), as well as a deployed version.

To create a link trigger for the "Give Kudos" workflow, run the following
command:

```zsh
$ slack trigger create --trigger-def triggers/give_kudos.ts
```

After selecting a Workspace, the output provided will include the link trigger
Shortcut URL. Copy and paste this URL into a channel as a message, or add it as
a bookmark in a channel of the Workspace you selected.

**Note: this link won't run the workflow until the app is either running locally
or deployed!** Read on to learn how to run your app locally and eventually
deploy it to Slack hosting.

## Running Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. In both the CLI and in Slack, you'll know an app
is the development version if the name has the string `(dev)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

Once running, click the
[previously created Shortcut URL](#create-a-link-trigger) associated with the
`(dev)` version of your app. This should start open a form used to input the
information needed for kudos!

To stop running locally, press `<CTRL> + C` to end the process.

### Updating the GIF Catalog

The GIFs that accompony a kudo are selected randomly after filtering against the
user-input `kudo_vibe` from the `OpenForm` step of the workflow.

This GIF catalog can be found in the `./assets/gifs.json` file and fixed to your
fancies!

```javascript
// ./assets/gifs.json

[{
  "URL": "https://media1.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif",
  "alt_text": "A person wearing a banana hat says thanks a bunch",
  "tags": ["thankful"]
}, {
  "URL": "https://media2.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif",
  "alt_text": "Dwight from The Office says thank you",
  "tags": ["thankful", "appreciation"]
}, {
  ...
}]
```

Each possible GIF is represented by an object with a `URL` of the GIF,
`alt_text` that describes the GIF, and a `tags` array.

Strings in the `tags` array are checked against the `kudo_vibe`, and GIFs that
pass the vibe check are added to the pool of possibily chosen animations.

## Testing

The functionality of a custom function can be tested to ensure the
implementation is correct. Test filenames are suffixed with `_test` and can be
run with `deno test`:

```zsh
$ deno test
```

## Deploying Your App

Once you're done with development, you can deploy the production version of your
app to Slack hosting using `slack deploy`:

```zsh
$ slack deploy
```

After deploying, [create a new link trigger](#create-a-link-trigger) for the
production version of your app (not appended with `(dev)`). Once the trigger is
invoked, the workflow should run just as it did in when developing locally.

### Viewing Activity Logs

Activity logs for the production instance of your application can be viewed with
the `slack activity` command:

```zsh
$ slack activity
```

## Project Structure

### `manifest.ts`

The [app manifest](https://api.slack.com/future/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `/functions`

[Functions](https://api.slack.com/future/functions) are reusable building blocks
of automation that accept inputs, perform calculations, and provide outputs.
Functions can be used independently or as steps in workflows.

### `/workflows`

A [workflow](https://api.slack.com/future/workflows) is a set of steps that are
executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input or they can collect input
by beginning with a [form](https://api.slack.com/future/forms) before continuing
to the next step.

### `/triggers`

[Triggers](https://api.slack.com/future/triggers) determine when workflows are
executed. A trigger file describes a scenario in which a workflow should be run,
such as a user pressing a button or when a specific event occurs.

## Resources

To learn more about developing with the CLI, you can visit the following guides:

- [Creating a new app with the CLI](https://api.slack.com/future/create)
- [Configuring your app](https://api.slack.com/future/manifest)
- [Developing locally](https://api.slack.com/future/run)

To view all documentation and guides available, visit the
[Overview page](https://api.slack.com/future/overview).
