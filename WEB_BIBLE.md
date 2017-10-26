Idea behind this doc is to store all usefull knowledge I gain in Web Dev field in a consize matter in one place.
Basically idea is to categorize and write-down each article link with one sentence describing it's essence.

# Testing
http://stateofjs.com/2016/testing/
- (From PayPal dev) Write tests. Not too many. Mostly integration. Unless you develop small lib, don't try to reach 100% test coverage, avoid testing impl details because it doesn’t give you 
very much confidence that your app is working and it slows you down when refactoring, see details 
[here](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c)
- (From PayPal dev) Use [data-attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) to make relationship 
between source and testing code more explicit to not break tests when markup changes, see details 
[here](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269)
- Cucumber/Gherkin is [my choice](https://github.com/device-hackers/browser-ui-state/tree/master/features) for at least 
system tests (aka end-to-end), see details: [1](https://www.sitepoint.com/bdd-javascript-cucumber-gherkin/),
[2](https://cucumber.io/blog/2016/07/20/where_should_you_use_bdd), 
[3](https://watirmelon.blog/2011/07/04/use-cucumber-feature-folders-for-functional-organization-tags-for-non-functional-classification/),
[4](https://github.com/damianszczepanik/cucumber-reporting), [5](https://github.com/jenkinsci/cucumber-reports-plugin)
- Gherkin feature files should be written by QA (not BA/PO or Devs), see details [here](https://habrahabr.ru/post/275013/) (RU)

# Conventions
- Don't use semicolons and double quotes in JS to facilitate better readability, e.g. 
[Riot](http://riotjs.com/faq/#why-are-there-no-semicolons-in-the-source-code), 
[2](https://github.com/kentcdodds/testing-workshop/blob/1938d6fc2048e55362679905f700f938a3b497c4/cypress/e2e/post_spec.js)
