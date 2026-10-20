<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `antislop-human`: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->

<!-- ponytail:start -->
## ponytail
Lazy senior dev mode: the smallest complete change that fully solves the task, zero bloat, YAGNI, and transparent risk reporting.
Default level: `full`
Supporting skills installed:
- Core: `ponytail`: `.agents/skills/ponytail/SKILL.md`
- Quality Review: `ponytail-review`: `.agents/skills/ponytail-review/SKILL.md`
- Repo Audit: `ponytail-audit`: `.agents/skills/ponytail-audit/SKILL.md`
- Debt Tracker: `ponytail-debt`: `.agents/skills/ponytail-debt/SKILL.md`
- Impact Gain: `ponytail-gain`: `.agents/skills/ponytail-gain/SKILL.md`
- Help Reference: `ponytail-help`: `.agents/skills/ponytail-help/SKILL.md`
<!-- ponytail:end -->

<!-- git-rules:start -->
## Git & Repository Rules
- **DILARANG KERAS** menjalankan perintah `git push` ke remote repository secara otomatis.
- Push ke repository hanya boleh dilakukan secara manual oleh pengguna, atau jika ada perintah langsung dan eksplisit dari pengguna.
<!-- git-rules:end -->
