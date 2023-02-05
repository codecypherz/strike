Repo is at https://github.com/codecypherz/strike

First time setup stuff:
1. Clone repo.
2. Run "npm install strike"


Daily setup stuff (assuming VS Code):
1. Go to Terminal > Run Task... and select "tsc: watch"
(This will have typescript recompile as you change source)
2. Run the local server by moving to the strike directory
and running "dev_appserver.py ."
3. Visit localhost:8080.


Deployment stuff:
1. Go to strike directory.
2. Run "gcloud app deploy"