/* Data Source | COS60004 Assignment 2
 * Plain JavaScript validation, localStorage job transfer and session autofill.
 * Reconstructed with AI assistance from the supplied Assignment 1 design.
 */
"use strict";

const DataSourceRules = {
  age(value, today = new Date()) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    if (!match) return null;
    const [, d, m, y] = match.map(Number);
    const birth = new Date(y, m - 1, d);
    if (birth.getFullYear() !== y || birth.getMonth() !== m - 1 || birth.getDate() !== d) return null;
    let age = today.getFullYear() - y;
    if (today.getMonth() < m - 1 || (today.getMonth() === m - 1 && today.getDate() < d)) age--;
    return age;
  },
  postcode(state, value) {
    const prefixes = { VIC: "38", NSW: "12", QLD: "49", NT: "0", WA: "6", SA: "5", TAS: "7", ACT: "0" };
    return /^\d{4}$/.test(value) && Boolean(prefixes[state]?.includes(value[0]));
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const JOB_KEY = "datasource.portfolio.assignment2.job";
  const DETAILS_KEY = "datasource.portfolio.assignment2.applicant";
  const allowedJobs = ["10000", "20000"];
  const read = (storageName, key) => {
    try { return window[storageName].getItem(key); } catch { return null; }
  };
  const write = (storageName, key, value) => {
    try { window[storageName].setItem(key, value); return true; } catch { return false; }
  };

  document.querySelectorAll("a[data-job-reference]").forEach(link => {
    link.addEventListener("click", event => {
      if (!write("localStorage", JOB_KEY, link.dataset.jobReference)) {
        event.preventDefault();
        let warning = document.getElementById("storage-warning");
        if (!warning) {
          warning = document.createElement("p");
          warning.id = "storage-warning";
          warning.setAttribute("role", "alert");
          link.parentElement.append(warning);
        }
        warning.textContent = "Please allow browser storage to select a job and continue.";
      }
    });
  });

  const form = document.getElementById("application-form");
  if (!form) return;
  // Enable custom on-page feedback only after JavaScript has initialized.
  form.noValidate = true;
  form.querySelector('[type="submit"]').disabled = false;
  const summary = document.getElementById("error-summary");
  const status = document.getElementById("application-status");
  const reference = document.getElementById("jobReference");
  const fields = ["firstName", "lastName", "streetAddress", "suburbTown", "postcode", "state", "email", "phone", "dateOfBirth", "otherSkills"];
  const checkboxes = ["programming", "networking", "desktopSupport", "otherSkillsSelected"];
  const field = name => form.elements.namedItem(name);
  const job = read("localStorage", JOB_KEY);
  reference.value = allowedJobs.includes(job) ? job : "";
  reference.defaultValue = reference.value;
  reference.readOnly = true;
  if (!reference.value) status.textContent = "Select a position on the Jobs page before applying.";

  try {
    const stored = JSON.parse(read("sessionStorage", DETAILS_KEY));
    if (stored && typeof stored === "object") {
      fields.forEach(name => { if (typeof stored[name] === "string") field(name).value = stored[name]; });
      checkboxes.forEach(name => { field(name).checked = stored[name] === true; });
      if (["Male", "Female", "Non Binary"].includes(stored.gender)) field("gender").value = stored.gender;
      if (reference.value) status.textContent = "Your details have been restored for this job. Please review them before submitting.";
    }
  } catch { /* Ignore malformed session data; keep the form available. */ }

  const clearErrors = () => {
    summary.hidden = true;
    summary.replaceChildren();
    form.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    const outcome = document.getElementById("demo-outcome");
    if (outcome) outcome.hidden = true;
  };
  const errors = () => {
    const list = [];
    const add = (el, message) => { list.push({ el, message }); el.setAttribute("aria-invalid", "true"); };
    if (!allowedJobs.includes(reference.value)) add(reference, "Choose a valid position from the Jobs page.");
    fields.filter(name => name !== "otherSkills").forEach(name => {
      const el = field(name);
      const label = form.querySelector(`label[for="${el.id}"]`).textContent.replace("*", "").trim();
      if (!el.value.trim()) add(el, `${label} is required.`);
      else if (!el.validity.valid) add(el, `${label}: ${el.title || "enter a valid value."}`);
    });
    const dob = field("dateOfBirth");
    if (dob.value && dob.validity.valid) {
      const age = DataSourceRules.age(dob.value);
      if (age === null) add(dob, "Date of birth must be a real calendar date in dd/mm/yyyy format.");
      else if (age < 15 || age > 80) add(dob, "You must be between 15 and 80 years old, inclusive.");
    }
    if (field("state").value && /^\d{4}$/.test(field("postcode").value) && !DataSourceRules.postcode(field("state").value, field("postcode").value)) {
      add(field("postcode"), "The postcode must match the selected state.");
    }
    if (!field("gender").value) add(form.querySelector('[name="gender"]'), "Select your gender.");
    if (field("otherSkillsSelected").checked && !field("otherSkills").value.trim()) add(field("otherSkills"), "Describe your other skills when Other skills is selected.");
    return list;
  };
  form.addEventListener("submit", event => {
    clearErrors();
    const problems = errors();
    if (problems.length) {
      event.preventDefault();
      summary.hidden = false;
      const heading = document.createElement("h2");
      heading.textContent = "Please check your application";
      const list = document.createElement("ul");
      problems.forEach(({ el, message }) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${el.id}`;
        link.textContent = message;
        link.addEventListener("click", e => { e.preventDefault(); el.focus(); });
        item.append(link); list.append(item);
      });
      summary.append(heading, list);
      summary.focus();
      return;
    }
    const details = {};
    fields.forEach(name => { details[name] = field(name).value; });
    checkboxes.forEach(name => { details[name] = field(name).checked; });
    details.gender = field("gender").value;
    if (!write("sessionStorage", DETAILS_KEY, JSON.stringify(details))) {
      // Keep the page visible so the applicant sees why autofill is unavailable.
      event.preventDefault();
      status.textContent = "Session storage is unavailable. Allow browser storage, then submit again to enable autofill.";
      status.focus();
      return;
    }
    if (form.dataset.submission === "demo") {
      event.preventDefault();
      const outcome = document.getElementById("demo-outcome");
      outcome.hidden = false;
      outcome.textContent = `Demo complete for position ${reference.value}. Your form passed browser validation. No application was sent or stored on a server.`;
      outcome.focus();
    }
  });
  form.addEventListener("reset", () => {
    try { window.sessionStorage.removeItem(DETAILS_KEY); } catch { /* Storage may be disabled. */ }
    clearErrors();
    status.textContent = "Application details cleared. Your selected job is retained.";
    form.dispatchEvent(new Event("datasource:reset"));
  });
});
