Repo is at https://github.com/codecypherz/strike

Setting up for the first time:
1. Clone repo
2. Run `sudo apt-get install npm` to install npm
3. Run `npm --version` to verify version
4. Run `sudo npm install -g n` to install node
5. Run `sudo n stable` to update node
6. Run `node -v` to verify version
7. Run `sudo npm install -g @angular/cli` to install angular command line
8. Run `ng version` to verify version
9. Run `npm install strike` to set up the project
10. Verify the log did not have warnings. It should have cleanly installed.
11. Run `ng build` and verify it builds successfully.
12. Profit


Run Angular locally (main development flow):
1. `ng serve`
2. Visit `localhost:4200`


Run App Engine locally (test deployment):
1. `ng build`
2. From strike directory, run `dev_appserver.py .`
3. Visit `localhost:8080`


Deploy to App Engine (publish):
1. Go to strike directory.
2. Run `gcloud app deploy`


Other cheat sheet commands:
*   Create an angular component named `foo`
    *   `ng generate component foo`
