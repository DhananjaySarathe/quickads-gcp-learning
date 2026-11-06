(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const phases = roadmapPhases;
  const storageKey = 'quickads-gcp-learning-v1';
  const phaseKeys = Object.keys(phases);
  const validKeys = new Set(phaseKeys.flatMap(key => phases[key].steps.map((_, i) => `${key}-${i}`)));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 'setup';
  let activeStep = 0;
  let completed = new Set();

  const guides = {
    setup: [
      ['Your Google account is your identity. Google Cloud uses it to know who is signing in; a project is where you will organize your cloud resources.', 'Sign in to your own Google account and check that you can access its recovery options. Keep this learning account separate from company production work.'],
      ['The welcome offer has eligibility rules. A Google account alone does not tell you whether you qualify for the Google Cloud Free Trial.', 'Open the official free-trial terms in the footer. Check whether you have used the trial before or have ever been a paying Google Cloud, Maps Platform, or Firebase user.'],
      ['Signing up for the trial creates a billing account. Payment verification is part of signup; it is different from choosing to upgrade to a paid billing account.', 'Open cloud.google.com/free and use your learning account. Enter your country and verification information yourself, then check that the console says Free Trial.'],
      ['Eligible new users receive $300 of welcome credit for 90 days. During the Free Trial you are not billed; a manual upgrade to paid billing changes that.', 'Find your trial status, remaining credit and end date in Billing. Write down the end date. Do not assume a paid account still has trial protections.'],
      ['A project groups resources, settings and permissions. The project name is a friendly label; the project ID is the identifier commands and APIs often use.', 'Select or create gcp-learning-lab. Find its project ID and billing link. Before creating any resource, check the project picker.'],
      ['An alerts-only budget sends notifications when spending reaches thresholds. It is a warning system, not a switch that stops resources or caps spending.', 'In Billing, create a small learning budget with actual and forecast alerts. Verify the recipients. Keep resource cleanup on your checklist too.']
    ],
    day1: [
      ['A click can trigger an HTTP request. Your browser finds the destination, sends the request, and uses the response to update the page. Your API runs the application logic.', 'Play the request journey above. Then use the Network panel in your browser on a practice app: find one request, its method, status code and response.'],
      ['A project groups your work. A region is a geographical location for resources. IAM controls access, and Billing shows which account pays for usage.', 'Locate the project picker, Billing, IAM and a service page in the console. Write one plain sentence describing what each is for.'],
      ['Your app is a running process that listens on a port. A container packages it with dependencies. A managed platform can run that container without you administering the host machine.', 'Run a small API locally. Find its port, logs and environment variables. Stop it and start it again. Explain what changed and what stayed the same.'],
      ['Cloud Run is a managed platform for running an application. You provide code or a container and configuration; Google manages the underlying serving infrastructure.', 'Start with a tiny HTTP API in a language you already know. Use the current Cloud Run quickstart with your tutor, and verify its response from the deployed URL.'],
      ['A revision represents a deployed version and its configuration. Having an identifiable version makes it easier to test a change and return to a working one.', 'Change the API response to include a version marker. Deploy the change, inspect the new revision and confirm the URL returns the new marker.'],
      ['Logs are messages about what your application did. A startup failure and a failed request happen at different points, so looking at the right log matters.', 'In your learning app, introduce one harmless error. Read its logs, fix the cause, redeploy and confirm recovery. Remove any resources you no longer need.']
    ],
    day2: [
      ['The memory and local files of an application instance are not a durable database. Data that must outlive that instance needs an appropriate storage service.', 'Save a small test record to your chosen database or storage service. Replace the application instance and verify that the record remains available.'],
      ['A service account is an identity for software. Give it only the access its job needs, and keep secrets out of source code and public repositories.', 'Identify one dependency the lab app needs. Give the app its own identity, grant narrowly scoped access and test it without a hardcoded key.'],
      ['Healthy services need more than a successful deploy. Request rate, latency and error rate tell you how users are experiencing the app; logs help explain failures.', 'Send successful and deliberately failing requests to the lab. Locate both in logs and compare the service metrics.'],
      ['A rollback returns service traffic to a known working version. A tested recovery procedure is more useful than hoping the next release works.', 'Deploy a harmless broken revision in the lab, then return traffic to a working revision. Verify the response and record the recovery steps.'],
      ['Cloud charges come from different units: compute, storage, requests and data transfer. An always-on baseline and usage-driven work behave differently.', 'Try the sliders in the visual lab. Then list your actual lab resources and look up the billing units for each using their current pricing pages.'],
      ['Ownership means you can explain, change, observe, recover and clean up a service. Finishing the two days is a starting point for this practice.', 'Explain your lab architecture aloud. Demonstrate one change, find one failure, recover, then inventory the resources and costs that remain.']
    ],
    foundation: [
      ['Repeating a deployment exposes the assumptions hidden in copied commands. Notes should explain which values belong to your app and environment.', 'Recreate the practice service using your own notes. For each command, explain what it changes and how you will verify the result.'],
      ['A container still has processes, files, signals and ports. These basics help you reason about failures even when a managed platform runs the host.', 'Inspect a local container. Identify its main process, startup command, listening port and shutdown behavior. Fix one intentional configuration error.'],
      ['Permission failures and connectivity failures have different causes. Identity answers who is calling; networking answers whether the destination can be reached.', 'In a lab, compare a denied request with an unreachable endpoint. Record the evidence that distinguishes them before changing anything.'],
      ['A real architecture map starts with evidence: the resources that exist, who owns them and which application depends on each one.', 'With authorized read-only access, inventory one QuickAds application. Record confirmed service names and owners without copying secrets into this public site.'],
      ['An end-to-end request may involve a frontend, an API, stored data and background processing. The useful map follows one concrete user action.', 'Choose one real application action and trace its confirmed dependencies. Mark which parts return immediately and which continue in the background.'],
      ['Reproducibility means another developer can create and verify a service using your instructions. Missing configuration is often where the exercise gets stuck.', 'Reproduce one small service in an isolated test environment. Ask a teammate to follow the notes and record any missing assumptions.']
    ],
    ownership: [
      ['An actionable alert says what is wrong, why it matters and what to inspect next. A dashboard should help answer a specific operational question.', 'Choose one user-visible symptom. Build a view of its latency and failures, and write a short response procedure for an alert.'],
      ['A backup is useful only if you can restore it. Recovery practice also reveals how much data or time a failure could cost.', 'Restore test data into a separate environment. Measure the time, verify the restored data and note the recovery limitations.'],
      ['A cloud bill is easier to explain when you group costs by workload and look for idle capacity, data movement and usage patterns.', 'For one authorized workload, identify the largest cost categories and compare them with its traffic and utilization. Write down the evidence behind each hypothesis.'],
      ['A cost optimization is a tradeoff to test. Lower resource use is not a win if users get slower responses or more failures.', 'Change one variable in a test: a query, cache, resource size or scaling setting. Compare cost-related usage, latency and errors with the same workload.'],
      ['Infrastructure as code makes environment configuration reviewable and repeatable. The important skill is understanding what a planned change will do.', 'Describe a small test environment as code, review the planned changes and reproduce it. Include a cleanup procedure.'],
      ['A good improvement proposal connects measurements to a change, explains the tradeoffs and includes a way to return to the previous state.', 'Document the baseline, experiment, results and rollback plan for one real improvement. Take it through the company’s normal review process.']
    ]
  };
  const diagrams = {
    setup: [['lock', 'Your identity'], ['cloud', 'Google Cloud'], ['network', 'Your project']],
    day1: [['browser', 'Browser'], ['server', 'Your API'], ['database', 'Data']],
    day2: [['server', 'Run'], ['pulse', 'Observe'], ['check', 'Recover']],
    foundation: [['browser', 'Frontend'], ['network', 'Services'], ['database', 'Dependencies']],
    ownership: [['chart', 'Measure'], ['server', 'Change'], ['pulse', 'Compare']]
  };

  function icon(name, className = '') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', `icon ${className}`);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#i-${name}`);
    svg.append(use);
    return svg;
  }
  function firstIncomplete(phase) {
    const index = phases[phase].steps.findIndex((_, i) => !completed.has(`${phase}-${i}`));
    return index < 0 ? 0 : index;
  }
  function snapshot() {
    return {version: 1, modelContent: {roadmap: 'gcp-v1', phase: selected, lesson: activeStep, completed: [...completed]}};
  }
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(snapshot())); }
    catch { $('roadmap-storage-status').textContent = 'This browser cannot save progress. Export a backup before leaving.'; }
  }
  function restore(state) {
    if (state?.modelContent?.roadmap !== 'gcp-v1') return;
    const saved = state.modelContent;
    selected = phaseKeys.includes(saved.phase) ? saved.phase : 'setup';
    completed = new Set(Array.isArray(saved.completed) ? saved.completed.filter(key => validKeys.has(key)) : []);
    activeStep = Number.isInteger(saved.lesson) && saved.lesson >= 0 && saved.lesson < 6 ? saved.lesson : firstIncomplete(selected);
  }
  function updateProgress() {
    const percent = Math.round(completed.size / validKeys.size * 100);
    $('header-count').textContent = `${completed.size} / ${validKeys.size}`;
    $('roadmap-count').textContent = `${completed.size} of ${validKeys.size} milestones`;
    $('progress-percent').textContent = `${percent}%`;
    $('roadmap-progress').setAttribute('aria-valuenow', String(completed.size));
    $('roadmap-progress').querySelector('span').style.width = `${percent}%`;
    phaseKeys.forEach(key => {
      const n = phases[key].steps.filter((_, i) => completed.has(`${key}-${i}`)).length;
      document.querySelector(`[data-progress="${key}"]`).textContent = `${n} of 6`;
      document.querySelector(`[data-phase="${key}"]`).classList.toggle('is-done', n === 6);
      if (selected === key) $('roadmap-phase-count').textContent = `${n} / 6`;
    });
  }
  function renderList() {
    $('roadmap-steps').replaceChildren();
    phases[selected].steps.forEach(([title], i) => {
      const row = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lesson-step';
      button.classList.toggle('is-done', completed.has(`${selected}-${i}`));
      if (i === activeStep) button.setAttribute('aria-current', 'step');
      const number = document.createElement('span');
      number.className = 'step-number';
      number.setAttribute('aria-hidden', 'true');
      if (completed.has(`${selected}-${i}`)) number.append(icon('check')); else number.textContent = i + 1;
      const label = document.createElement('span');
      label.textContent = title;
      button.append(number, label, icon('arrow'));
      button.setAttribute('aria-label', `${i + 1}. ${title}${completed.has(`${selected}-${i}`) ? ', completed' : ''}`);
      button.addEventListener('click', () => {
        activeStep = i;
        renderList(); showLesson(); persist();
        $('lesson-title').focus({preventScroll: true});
        if (window.innerWidth <= 850) $('lesson-pane').scrollIntoView({block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth'});
      });
      row.append(button); $('roadmap-steps').append(row);
    });
  }
  function showLesson() {
    const [title, , evidence] = phases[selected].steps[activeStep];
    const [explanation, action] = guides[selected][activeStep];
    $('lesson-title').textContent = title;
    $('lesson-title').tabIndex = -1;
    $('lesson-position').textContent = `Step ${activeStep + 1} of 6`;
    $('lesson-explanation').textContent = explanation;
    $('lesson-action').textContent = action;
    $('lesson-proof').textContent = `You’re ready when: ${evidence}`;
    $('lesson-complete').checked = completed.has(`${selected}-${activeStep}`);
    $('lesson-complete').setAttribute('aria-label', `Mark “${title}” as complete`);
    $('roadmap-prompt-area').hidden = true;
    $('roadmap-action-status').textContent = '';
    $('lesson-visual').replaceChildren();
    diagrams[selected].forEach(([glyph, label], i) => {
      if (i) $('lesson-visual').append(icon('arrow', 'mini-arrow'));
      const node = document.createElement('span'); node.className = 'mini-node';
      const text = document.createElement('span'); text.textContent = label;
      node.append(icon(glyph), text); $('lesson-visual').append(node);
    });
  }
  function renderChapter() {
    $('roadmap-phase-title').textContent = phases[selected].title;
    $('roadmap-time').textContent = phases[selected].time;
    $('roadmap-outcome').textContent = phases[selected].outcome;
    document.querySelectorAll('[data-phase]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.phase === selected)));
    renderList(); showLesson(); updateProgress();
  }
  document.querySelectorAll('[data-phase]').forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.phase; activeStep = firstIncomplete(selected);
    renderChapter(); persist();
    if (window.innerWidth <= 600) $('chapter-workspace').scrollIntoView({block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }));
  $('lesson-complete').addEventListener('change', event => {
    const key = `${selected}-${activeStep}`;
    if (event.target.checked) completed.add(key); else completed.delete(key);
    renderList(); updateProgress(); persist();
    $('roadmap-action-status').textContent = event.target.checked ? 'Small win saved. Choose the next step when you’re ready.' : 'Marked for more practice.';
  });
  $('continue-learning').addEventListener('click', () => {
    selected = phaseKeys.find(key => phases[key].steps.some((_, i) => !completed.has(`${key}-${i}`))) || 'ownership';
    activeStep = firstIncomplete(selected); renderChapter(); persist();
  });
  $('roadmap-learn').addEventListener('click', () => {
    const step = phases[selected].steps[activeStep];
    $('roadmap-prompt').value = `Continue my QuickAds GCP learning roadmap. Phase: ${phases[selected].title}. Teach this milestone: ${step[0]}. Context: ${step[1]}. Teach me from zero, one small step at a time. Use a simple diagram or animation when it helps. Use an advertising-product practice example and distinguish it from confirmed QuickAds infrastructure. Explain each action before I do it, and check my understanding. Completion evidence: ${step[2]} I will enter any login and payment information myself.`;
    $('roadmap-prompt-area').hidden = false;
    $('roadmap-action-status').textContent = 'Your tutor prompt is ready below.';
  });
  $('roadmap-copy').addEventListener('click', async () => {
    const field = $('roadmap-prompt'); let copied = false;
    try { await navigator.clipboard.writeText(field.value); copied = true; }
    catch { field.select(); try { copied = document.execCommand('copy'); } catch { /* Keep the selected text for manual copy. */ } }
    $('roadmap-action-status').textContent = copied ? 'Copied. Paste it into our GCP chat.' : 'Select and copy the prompt, then paste it into our GCP chat.';
  });
  $('roadmap-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(snapshot(), null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'quickads-gcp-progress.json'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('roadmap-backup-status').textContent = 'Backup downloaded. Import it on another device to continue.';
  });
  $('roadmap-import-button').addEventListener('click', () => $('roadmap-import').click());
  $('roadmap-import').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 20000) throw new Error('Choose a progress backup smaller than 20 KB.');
      const saved = JSON.parse(await file.text());
      if (saved.version !== 1 || saved.modelContent?.roadmap !== 'gcp-v1' || !Array.isArray(saved.modelContent.completed) || !phaseKeys.includes(saved.modelContent.phase) || !saved.modelContent.completed.every(key => typeof key === 'string' && validKeys.has(key))) throw new Error('This is not a valid roadmap backup. Choose an exported progress JSON file.');
      saved.modelContent.completed.forEach(key => completed.add(key));
      selected = saved.modelContent.phase; activeStep = firstIncomplete(selected);
      renderChapter(); persist();
      $('roadmap-backup-status').textContent = 'Progress imported and merged. Your previous completed milestones are preserved.';
    } catch (error) { $('roadmap-backup-status').textContent = error instanceof SyntaxError ? 'This file is not valid JSON. Choose an exported progress backup.' : error.message; }
    event.target.value = '';
  });
  try { restore(JSON.parse(localStorage.getItem(storageKey) || 'null')); }
  catch { $('roadmap-storage-status').textContent = 'Saved progress could not be read. Import a backup or export this session before leaving.'; }
  renderChapter();

  // User-controlled, finite request animation. No network requests are made.
  const requestCopy = [
    'One click can involve several services. Follow the little packet to see who does what.',
    'The browser finds the destination using DNS, then sends an HTTPS request asking for an ad.',
    'Your API receives the request and runs the code that decides what data is needed.',
    'The API reads the saved ad details from its data store. The browser does not do this read directly.',
    'The API sends a response back. Your frontend uses that data to show the ad. Full circle.'
  ];
  const packetRoutes = [[], [[83,76],[150,76]], [[150,76],[253,76]], [[253,76],[428,76]], [[428,96],[253,96],[83,96]]];
  let requestStep = 0, requestTimer = null, requestFrame = null, playing = false;
  function haltPacket() { if (requestFrame !== null) cancelAnimationFrame(requestFrame); requestFrame = null; }
  function animatePacket(points) {
    haltPacket();
    const dot = $('request-packet'); const final = points[points.length - 1];
    dot.style.opacity = '1'; dot.style.fill = requestStep === 4 ? '#39886b' : '#d47b36';
    if (reducedMotion.matches) { dot.setAttribute('cx', final[0]); dot.setAttribute('cy', final[1]); return; }
    const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    const total = lengths.reduce((a, b) => a + b, 0); let start;
    function frame(time) {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / 1350); let distance = progress * total;
      let segment = 0;
      while (segment < lengths.length - 1 && distance > lengths[segment]) { distance -= lengths[segment]; segment++; }
      const t = lengths[segment] ? distance / lengths[segment] : 1;
      dot.setAttribute('cx', points[segment][0] + (points[segment + 1][0] - points[segment][0]) * t);
      dot.setAttribute('cy', points[segment][1] + (points[segment + 1][1] - points[segment][1]) * t);
      if (progress < 1) requestFrame = requestAnimationFrame(frame); else requestFrame = null;
    }
    requestFrame = requestAnimationFrame(frame);
  }
  function requestButton() {
    $('request-play').querySelector('span').textContent = playing ? 'Pause journey' : requestStep === 4 ? 'Replay journey' : requestStep ? 'Continue journey' : 'Play the journey';
    $('request-play').querySelector('use').setAttribute('href', playing ? '#i-pause' : '#i-play');
  }
  function showRequestStep(step) {
    requestStep = step; $('request-demo').dataset.step = String(step);
    $('request-step-count').textContent = step ? `${step} / 4` : 'Ready?';
    $('request-description').textContent = requestCopy[step];
    if (step) animatePacket(packetRoutes[step]);
    requestButton();
  }
  function stopRequest() { clearTimeout(requestTimer); requestTimer = null; playing = false; haltPacket(); requestButton(); }
  function scheduleStep() {
    requestTimer = setTimeout(() => {
      if (requestStep >= 4) { stopRequest(); return; }
      showRequestStep(requestStep + 1); scheduleStep();
    }, 3600);
  }
  $('request-play').addEventListener('click', () => {
    if (playing) { stopRequest(); return; }
    playing = true;
    showRequestStep(requestStep === 0 || requestStep === 4 ? 1 : requestStep);
    requestButton(); scheduleStep();
  });
  $('request-next').addEventListener('click', () => { stopRequest(); showRequestStep(requestStep >= 4 ? 1 : requestStep + 1); });

  const gifTimers = new Map();
  function stopGif(key) {
    clearTimeout(gifTimers.get(key)); gifTimers.delete(key);
    $(`${key}-animation`).src = `./assets/${key}-poster.png`;
    const button = document.querySelector(`[data-gif="${key}"]`);
    button.setAttribute('aria-pressed', 'false'); button.querySelector('span').textContent = 'Play animation';
    button.querySelector('use').setAttribute('href', '#i-play');
  }
  document.querySelectorAll('[data-gif]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.gif;
    if (button.getAttribute('aria-pressed') === 'true') { stopGif(key); return; }
    document.querySelectorAll('[data-gif][aria-pressed="true"]').forEach(other => stopGif(other.dataset.gif));
    $(`${key}-animation`).src = `./assets/${key}-flow.gif?play=${Date.now()}`;
    button.setAttribute('aria-pressed', 'true'); button.querySelector('span').textContent = 'Stop animation';
    button.querySelector('use').setAttribute('href', '#i-pause');
    gifTimers.set(key, setTimeout(() => stopGif(key), 14400));
  }));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) { stopRequest(); document.querySelectorAll('[data-gif][aria-pressed="true"]').forEach(button => stopGif(button.dataset.gif)); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stopRequest(); document.querySelectorAll('[data-gif][aria-pressed="true"]').forEach(button => stopGif(button.dataset.gif)); }
  });
  function updateWork() {
    const volume = Number($('request-volume').value), duration = Number($('request-duration').value);
    $('request-volume-value').value = volume.toLocaleString('en-IN');
    $('request-duration-value').value = `${duration} ms`;
    $('work-total').value = `${(volume * duration / 60000).toFixed(1)} min / day`;
    $('work-bar').style.width = `${Math.max(1, volume * duration / 100000)}%`;
  }
  $('request-volume').addEventListener('input', updateWork);
  $('request-duration').addEventListener('input', updateWork); updateWork();
  const feedback = {
    owner: 'Too broad. Project Owner allows far more than reading images. Try the smallest permission that lets this service do its job.',
    reader: 'Exactly. Give the app its own service account and only the required read permissions on that bucket’s objects. This is least privilege.',
    password: 'Keep your personal login out of the app. Use a service account for the software, with narrowly scoped permissions. Try again.'
  };
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-answer]').forEach(other => { other.classList.remove('is-correct', 'is-incorrect'); other.setAttribute('aria-pressed', 'false'); });
    const correct = button.dataset.answer === 'reader';
    button.classList.add(correct ? 'is-correct' : 'is-incorrect'); button.setAttribute('aria-pressed', 'true');
    $('quiz-feedback').textContent = feedback[button.dataset.answer]; $('quiz-feedback').classList.toggle('correct', correct);
  }));
})();
