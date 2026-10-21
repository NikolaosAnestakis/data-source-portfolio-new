# Data Source - Interactive careers portfolio

Assignment 1 design extended with client-side validation and browser storage.
Serve this folder with any static HTTP server or GitHub Pages. For example:

```bash
python3 -m http.server 8083
```

Start at jobs.html. Use fictional data. Submissions are simulated; no applicant
data is transmitted to a server. Valid details remain in sessionStorage within
this tab until reset/cleared or the session ends. Job selection uses localStorage.
JavaScript is required; submission is disabled when it is unavailable.

See enhancements2.html for features, implementation and AI attribution.
This is a reconstruction, not the original university submission. Academic files
and Git history are excluded. Review asset licences before making the repo public.

## HamburgerElegant integration

Mobile navigation adapts the author's private HamburgerElegant/menudrawer.html
(source blob 6f9f00aa9e1f98984213f942c32d90e5dcdca409).
CSS is external in styles/hamburger.css; JS stays in scripts/enhancements.js.
The two assessed enhancements are the completion meter and responsive drawer.
The optional timer is retained as an additional unassessed feature.
Desktop navigation is retained; the drawer is enabled at 900px and below.
Native dialog support is required for the drawer. Older browsers retain the
original navigation. Browser visual and keyboard verification remains required.
