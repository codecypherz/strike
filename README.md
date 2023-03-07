Repo is at https://github.com/codecypherz/strike

Setting up for the first time:
1. Clone repo
2. Run `sudo apt-get install npm` to install npm
3. Run `npm --version` to verify version
4. Run `sudo npm install -g n` to install node
5. Run `sudo n stable` to update node
6. Run `node -v` to verify version
    * If running into trouble, run `nvm install 18` and `nvm use 18`
7. Run `sudo npm install -g @angular/cli` to install angular command line
8. Run `ng version` to verify version
9. Run `npm install strike` to set up the project
10. Verify the log did not have warnings. It should have cleanly installed.
11. Run `ng build` and verify it builds successfully.
12. Profit


Run Angular locally (main development flow):
1. `ng serve`
2. Visit `localhost:4200`

Run tests:
1. `ng test` which will open a browser with the results.
2. `ng test --code-coverage` to generate the code coverage report.
3. Open `coverage/strike/index.html` to see the code coverage report.

Run App Engine locally (test the deployment):
1. `ng build`
2. From strike directory, run `dev_appserver.py .`
3. Visit `localhost:8080`


Deploy to App Engine (publish):
1. Go to strike directory.
2. Run `gcloud app deploy`


Other cheat sheet commands:
*   Create an angular component named `foo`
    *   `ng generate component foo`
