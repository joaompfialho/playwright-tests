# playwright-tests

Best Practices for Your First UI Test

- Use clear locators: Prefer IDs, data-test attributes, or unique text. Avoid overly complex CSS selectors.
- Run headless and headed: Headless for speed, headed to watch the flow.
- Keep test data separate: Store credentials in environment variables or config files, not hardcoded in real projects.
- Use assertions wisely: Always check that the page is in the expected state before ending the test.
- Commit to GitHub: Save your first test as part of your public portfolio.

Common Beginner Mistakes

- Forgetting to wait for the page or element before interacting.
- Using unstable locators that break when UI changes.
- Mixing test data inside your test steps instead of a config file.
- Not cleaning up between test runs (e.g., logging out before rerunning).

Running Tests: Playwright

- npx playwright test
- npx playwright test tests/login.spec.js
- npx playwright test --headed
- npx playwright test --trace on
- npx playwright show-report

Github Workflow

npm ci
npx playwright install --with-deps
npm test
