# Specification

## Summary
**Goal:** Redesign the main page with a hero section matching Air Canada's design and add an editable flight status indicator.

**Planned changes:**
- Redesign main page hero section with "Where can we take you?" headline centered over background image
- Add flight status indicator to main page showing current operational status (On Time, Delayed, Cancelled)
- Implement FlightStatus type in backend with functions to set and retrieve status
- Add flight status editing controls to admin dashboard at /admin-ops
- Connect main page status indicator to backend using React Query for automatic updates

**User-visible outcome:** Users see a redesigned main page with Air Canada-style hero section and real-time flight status. Admin staff can update the operational status from the admin dashboard, which immediately reflects on the main page.
