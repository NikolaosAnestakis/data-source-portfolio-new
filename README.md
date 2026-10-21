# Data Source

Data Source is a multi-page web development project originally created from university assignment requirements and subsequently prepared as a portfolio demonstration. It presents a fictional technology company offering data hosting and cloud software services, together with sample job vacancies and an interactive application workflow.

This version extends the Assignment 1 design with the Assignment 2 interaction requirements: JavaScript validation, job-reference transfer, session autofill, and documented enhancements. It also incorporates the HamburgerElegant responsive navigation.

This repository is an educational portfolio/demo project. It is not a real company website, production recruitment system, or commercial client project.

## Live Demo

**Live Demo:** [https://nikolaosanestakis.github.io/data-source-portfolio-new/](https://nikolaosanestakis.github.io/data-source-portfolio-new/)

GitHub Pages hosts the static portfolio demonstration. The HTML, CSS, responsive navigation, JavaScript validation, browser storage, and application interactions can be explored online.

Form submission is simulated in the browser. No application is transmitted to a recruitment server, stored in a server database, or sent by email. Use fictional applicant details when testing.

## Project Preview

![Data Source branding](images/data-source-logo-blue.png)

The portfolio retains Assignment 1's Data Source branding, page banners, vacancy layouts, application cards, developer profile, and shared footer. The About page includes the original developer portrait and sample timetable structure.

## Project Overview

The website demonstrates front-end development across six connected pages:

- a company homepage with service and technology-provider content
- detailed job opportunities with links that select the relevant job reference
- a structured application form with on-page validation and session autofill
- an About page presenting the developer profile, portrait, and sample timetable
- documentation of the original responsive-design enhancement
- an Enhancements2 page documenting the interactive enhancements

Application validation is implemented in `scripts/apply.js`. The completion meter, optional timer, and responsive drawer are implemented in `scripts/enhancements.js`. The application uses plain JavaScript without third-party JavaScript libraries.

## Technology Stack

- HTML5 with semantic page structure and native form constraints
- CSS3 with custom properties, media queries, floats, Flexbox, and Grid
- external shared styling in `styles/style.css`
- responsive drawer styling and animations in `styles/hamburger.css`
- plain JavaScript, DOM events, and the browser Constraint Validation API
- the Web Storage API: `localStorage` and `sessionStorage`
- a native HTML `dialog` for modal navigation
- GitHub Pages for static deployment

This public portfolio contains no PHP form processor and requires no backend or database. The separate academic working repository includes a local POST receiver for checking form-data transfer.

## Website Structure

| Page | Purpose |
| --- | --- |
| `index.html` | Introduces the fictional company, its services, recruitment call to action, and cloud providers. |
| `jobs.html` | Presents sample job descriptions and saves the selected five-character job reference when Apply is clicked. |
| `apply.html` | Provides the application form, browser validation, stored-details autofill, progress meter, optional timer, and simulated submission. |
| `about.html` | Presents the developer profile, portrait, and sample weekly timetable using Assignment 1's layout. |
| `enhancements.html` | Documents the original responsive-design enhancement. |
| `enhancements2.html` | Documents the completion meter, HamburgerElegant navigation, and additional optional timer. |

All six pages share the Data Source visual language, primary navigation, responsive drawer, page assets, and footer styling.

## Jobs and Application Workflow

Start on the [Jobs page](https://nikolaosanestakis.github.io/data-source-portfolio-new/jobs.html) and select Apply for one of the sample vacancies.

1. The link saves the selected job reference, `10000` or `20000`, in `localStorage`.
2. The application page retrieves the reference and displays it in a read-only field.
3. The applicant enters their details; JavaScript checks the form on submission.
4. Invalid input produces an on-page error summary with links to the affected controls.
5. A valid application saves the applicant's details in `sessionStorage` and displays a demo confirmation.
6. Selecting another job in the same tab restores applicant details while retaining the newly selected reference.

Opening Apply without a valid stored job reference prompts the user to choose a position from Jobs. Reset clears saved applicant details while retaining the selected job reference and its read-only state.

### Application Validation

| Check | Implemented behavior |
| --- | --- |
| Job reference | Accepts the supported sample references and displays the selected reference read-only. |
| Required fields and formats | Uses HTML constraints together with JavaScript to check required values and prescribed field formats. |
| Date of birth | Requires a real calendar date in `dd/mm/yyyy` format, including valid month lengths and leap-year handling. |
| Age | Calculates completed age and accepts ages 15 through 80, inclusive. |
| State and postcode | Checks a four-digit postcode against the assignment's state-prefix mapping. |
| Other skills | Requires a nonblank description when Other skills is selected. |
| Feedback | Displays errors on the page, marks affected controls, and provides focusable links to them. |

The postcode rule follows the assignment table: VIC `3/8`, NSW `1/2`, QLD `4/9`, NT `0`, WA `6`, SA `5`, TAS `7`, ACT `0`. It is a prescribed prefix check, not a comprehensive postcode/address verification service.

### Browser Storage

| Storage | Purpose | Key |
| --- | --- | --- |
| `localStorage` | Remembers the selected job reference across page navigation and subsequent visits until replaced or cleared. | `datasource.portfolio.assignment2.job` |
| `sessionStorage` | Restores applicant details for another application in the same tab's browser session. | `datasource.portfolio.assignment2.applicant` |

The application code uses browser storage rather than cookies. Storage access failures produce visible feedback, and invalid submissions do not save applicant details. The job reference is stored separately from applicant information, so autofill does not overwrite a newly selected job.

## Running the Project Locally

### 1. Static HTTP Server

From the local portfolio repository:

```bash
cd /path/to/data-source-assignment2-portfolio
python3 -m http.server 8083 --bind 127.0.0.1
```

Open [http://127.0.0.1:8083/jobs.html](http://127.0.0.1:8083/jobs.html). Stop the server with `Ctrl+C`.

The existing Mac working folder is named `data-source-assignment2-portfolio`; the GitHub repository is named `data-source-portfolio-new`. The local folder name does not determine the published URL.

Use an HTTP server rather than opening HTML directly with `file://`, so the application pages share a consistent origin for browser storage.

### 2. Visual Studio Code Live Server

1. Open the portfolio folder in Visual Studio Code.
2. Open `jobs.html` or `index.html`.
3. Choose **Open with Live Server** or select **Go Live**.
4. Use the generated local address; the port depends on the configuration.

Static hosting is sufficient for this portfolio's simulated submission flow. JavaScript is required for the application interactions; the submit button starts disabled and is enabled when the application script initializes.

## Repository Structure

| Path | Contents |
| --- | --- |
| Repository root | Six HTML pages, `README.md`, and `.gitignore`. |
| `scripts/apply.js` | Validation rules, job-reference transfer, session autofill, reset behavior, and simulated submission. |
| `scripts/enhancements.js` | Live completion meter, optional timer, and HamburgerElegant drawer behavior. |
| `styles/style.css` | Shared page styling and the original responsive layouts. |
| `styles/hamburger.css` | Drawer layout, animated icon, active-link underline, and smooth closing transition. |
| `images/` | Branding, portrait, content, provider, and interface assets. |
| `styles/images/` | Page banners, backgrounds, and CSS-related image assets. |

## Responsive Design

The default desktop layouts retain Assignment 1's mixture of floats, Flexbox, Grid, fluid widths, and constrained containers. The base stylesheet includes adaptations at `900px`, `48rem`, and `600px` for the page layouts, vacancy content, application cards, About sections, and footer.

The navigation has a separate **1200px breakpoint**:

- above `1200px`, the desktop navigation is displayed
- at `1200px` and below, the hamburger replaces the desktop navigation, including the Enhancements2 link
- the Data Source logo/header remains visible when the drawer opens
- the X occupies the same measured position as the hamburger
- a light-grey divider separates the header and drawer
- the active page is underlined in the drawer
- links reveal with a staggered animation; ordinary link clicks fade the drawer out over `260ms` before navigation

The visible drawer heading is hidden while its accessible label is retained. The drawer navigation can scroll on short screens. If the viewport returns to desktop width while the drawer is open, the modal closes and page scrolling resumes.

## Accessibility Considerations

The implementation includes:

- semantic page landmarks, descriptive image alternatives, form labels, fieldsets, and legends
- table captions and scoped headings in the sample timetable
- visible keyboard-focus styling and an active-page indicator
- on-page error summaries, `aria-invalid` states, and links that focus invalid controls
- status messages for autofill, storage problems, and demo confirmation
- a native modal dialog with Escape handling, focus return, and an expanded-state indicator on the menu button
- reduced-motion handling for menu animations and the closing delay
- an optional timer that is off by default, warns before expiry, and permits repeated time extensions or disabling
- fallback to the original navigation when JavaScript or native dialog support is unavailable

These are implementation-level accessibility considerations, not a claim of formal WCAG conformance. Native focus behavior and responsive presentation should be checked in the browsers used for a release.

## Assignment Constraints

The Assignment 2 implementation builds on the HTML/CSS design and adds:

- client-side storage to transfer a five-character job reference from Jobs to Apply
- a read-only job-reference value and applicant details suitable for form submission
- session-based prefill for subsequent applications
- JavaScript validation of date of birth, age, state/postcode consistency, and Other skills
- meaningful on-page feedback rather than alert boxes
- external JavaScript files and no JavaScript libraries in the main implementation
- documentation and links for enhancements in `enhancements2.html`

The academic brief requires form data to be transferred to a server. **This public portfolio deliberately simulates that step and does not claim to fulfil the server-transfer requirement.** Server-side validation and application storage are not implemented here. A production application would require an appropriate backend and independent server-side validation.

The original submitted archive is preserved separately. This repository represents the later portfolio reconstruction.

## Baseline Requirements vs Enhancements

| Area | Baseline requirement | Enhancement or portfolio adaptation |
| --- | --- | --- |
| Visual design | Assignment 1 pages, branding, and HTML/CSS structure | Retained across the interactive version, including the About profile and portrait. |
| Job selection | Transfer reference through `localStorage` | Valid-reference checks and read-only reset behavior. |
| Applicant details | Prefill through `sessionStorage` | Separate storage for applicant details and job selection, plus reset and storage-failure feedback. |
| Validation | DOB/age, postcode/state, Other skills, and on-page errors | Linked error summary with invalid-control states. |
| Completion feedback | No completion meter required | Live meter responds to required fields, validation, and conditional Other skills input. |
| Navigation | Shared site links | HamburgerElegant animated drawer, aligned controls, active underline, responsive switching, and smooth close. |
| Timing | No mandatory timer | Optional 20-minute timer with a one-minute warning and extension control. |
| Submission | Academic version transfers data to a server | Portfolio version displays an explicit browser-only demo confirmation. |

The completion meter and HamburgerElegant navigation are the two selected enhancements documented for Assignment 2. The timer is retained as an additional feature.

## Validation and Testing

Automated DOM integration checks during development covered:

- invalid calendar dates, leap years, and completed-age boundaries
- each prescribed state/postcode prefix, including leading zeroes
- rejection of invalid submissions and whitespace-only Other skills descriptions
- applicant autofill that retains a newly selected job reference
- reset behavior and storage-failure feedback
- the simulated submission confirmation
- menu state, Escape/close handlers, focus-return logic, resizing, and deferred link navigation

JavaScript syntax checks and local relative-link/asset checks were also performed. DOM checks do not establish visual layout correctness or reproduce all native browser dialog behavior. There is no committed automated test suite or formal accessibility certification claimed by this README.

Before a release, repeat checks at mobile, tablet, and desktop widths, especially on either side of `1200px`. Test keyboard-only navigation, reduced motion, the timer warning/extension, validation errors, and the full job-selection/autofill journey in a real browser.

## Portfolio and Privacy Review

Use fictional applicant details. Valid entries remain in the tab's `sessionStorage` for autofill; Reset clears those saved details. The selected job remains in `localStorage` until replaced or cleared. Browser storage is not a secure repository for sensitive application data.

The About page intentionally includes the developer name and portrait, a generic tutor label, and a sample timetable. This README does not reproduce student identifiers or academic contact details.

The private academic working repository and original submission archive are separate from this public portfolio. Check source files and history for credentials, unnecessary personal data, temporary files, and operating-system metadata before publishing further changes.

## References and Credits

- Original Data Source design, content, and supplied assets: Nikolaos Anestakis, Assignment 1 project.
- Responsive navigation: adapted from [NikolaosAnestakis/HamburgerElegant](https://github.com/NikolaosAnestakis/HamburgerElegant), `menudrawer.html`, source blob `6f9f00aa9e1f98984213f942c32d90e5dcdca409`. The source repository is private; the adaptation is included here.
- Additional implementation notes and retained design references: [`enhancements.html`](enhancements.html) and [`enhancements2.html`](enhancements2.html).

Existing asset credits should be retained and applicable image licences checked when reusing or extending the project.

## Project Status

Data Source is maintained as a portfolio demonstration of semantic HTML, responsive CSS, accessible form structure, plain JavaScript, browser storage, validation, and interactive navigation.

The portfolio is publicly hosted on GitHub Pages. It does not receive real job applications or provide a production recruitment backend.

## Author

Nikolaos Anestakis
