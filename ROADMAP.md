## Core FeatureSet

The Twitter CFP Bot has a core FeatureSet that includes:
- Following / listening to official Conference Twitter Accounts
- Recognizing when those accounts are making announcements related to a Call-for-Presenters (CFP)
- Notifying the bot's followers of those announcements by retweeting the discovered CFP announcement, allowing the followers to get a push-notification sent to their device

## Roadmap

To those ends, this is the (proposed) project roadmap for achieving those goals.

|Capability	| MVP |	MVP+	| 1.0	| 2.0 |
|---|---|---|---|---|
Version Goal: |	Proof-of-concept	| Support for hashtags, allowing for conferences to "ping" the bot for a retweet |	Support multiple-running copies of the bot	| Better accuracy on notifications, and better support for conferences, add a persistence layer
Bot Twitter Account	| Manually created / hard-coded		| | Dynamically specified via secrets or config	
Source Conference Accounts |	Manually follow accounts 	| Follow hashtags	| Get account list from a file or external source (bot automatically checks and follows/unfollows at start-up)	| Accounts stored in a persistent, modifiable external place (database, modifiable file)
Find CFP Announcements	| Hard-coded filter words | Instantly repond to a given hashtag	| Filter words/patterns, stored in an external location	| Words / Patterns are conference account specific
Notify users	| Followers manually turn on push notifications	 | |	Users can opt-in to other notification means (DMs?)	|
Conference Interaction |	DMs to bot account managed by humans	| |	DMs to bot account e-mail maintainers as specified in an external source (config file) |	Bot supports some basic automated interactions via DM to allow conferences to self-register
Deployment Tools	| Local	| | Heroku |	CircleCI + Heroku
CI/CD	| None	| |	Deploys master automatically	| CircleCI:  Runs tests (blocking), reports metrics to GitHub/Slack
