const roadmapPhases = {
    setup: {
      title:'Your first GCP account', time:'45–60 min · before Day 1',
      outcome:'A learning project with trial status, credit balance, and spending alerts checked.',
      steps:[
        ['Google account ready','Your own learning account · sign-in and recovery access','You can sign in to Google.'],
        ['Free Trial eligibility checked','No previous Free Trial; never a paying Google Cloud, Maps Platform, or Firebase user','You know whether the welcome offer applies.'],
        ['Free Trial signup completed','cloud.google.com/free · country, profile, identity and payment verification','The console opens with a Free Trial billing account.'],
        ['Credit and trial status verified','$300 welcome credit · 90 days from signup · eligible services only','You can find the remaining credit and trial end date.'],
        ['Learning project selected or created','Project name: gcp-learning-lab · billing link checked','You can identify the active project and its project ID.'],
        ['Spending alerts configured','Small learning budget · actual and forecast alerts · alerts-only budgets do not cap spend','You can find the budget and its notification recipients.']
      ]
    },
    day1: {
      title:'Understand it. Deploy it.',time:'About 6 focused hours',
      outcome:'A tiny API you can explain, deploy, update, and debug.',
      steps:[
        ['Trace one browser request','1 h · server, HTTP, DNS, IP address, port, CPU and memory','You can draw the path from a button click to an API response.'],
        ['Navigate GCP with confidence','1 h · projects, regions, billing, resources and permissions','You can find where a resource lives and who can access it.'],
        ['Inspect a running application','1 h · Linux basics, processes, ports, logs and containers','You can explain VM versus container versus managed platform.'],
        ['Deploy your first API','1 h · a small backend on Cloud Run','A browser or terminal receives your API response.'],
        ['Change it and deploy again','1 h · application configuration and revisions','You can identify the new running version.'],
        ['Break it, then fix it','1 h · startup errors, request errors and resource cleanup','You can find a deliberate failure in the logs and repair it.']
      ]
    },
    day2: {
      title:'Operate it. Understand the bill.',time:'About 6 focused hours',
      outcome:'A service with persistent data, controlled access, and a recovery path.',
      steps:[
        ['Keep data beyond a restart','1 h · one database or storage option; durable versus temporary data','Your test data survives replacement of an application instance.'],
        ['Give the app its own identity','1 h · service accounts, minimum permissions and secrets','The app accesses its dependency without a hardcoded secret.'],
        ['Watch service health','45 min · request latency, error rates and logs','You can distinguish a healthy response from a failed one.'],
        ['Recover from a bad release','45 min · small traffic test, scaling observations and rollback','You can return to a working revision.'],
        ['Explain what generates charges','1½ h · billing units, baseline cost, usage and data transfer','You can estimate a small workload and compare configurations.'],
        ['Complete the ownership challenge','1 h · explain the architecture, diagnose an issue and clean up','You can operate the lab with fewer prompts and inventory what remains.']
      ]
    },
    foundation: {
      title:'Make the foundations stick',time:'Weeks 1–4 · pace adapts to practice',
      outcome:'You can explain and redeploy a service in the context of your company’s architecture.',
      steps:[
        ['Repeat the deployment independently','Week 1 · recreate the lab from your own notes','You can deploy without copying an unexplained command.'],
        ['Strengthen Linux and container skills','Weeks 1–2 · processes, signals, files, ports and images','You can diagnose an app that fails to start.'],
        ['Understand access and connectivity','Week 2 · IAM, application credentials, public and private access','You can explain a permission failure versus a network failure.'],
        ['Map the company’s services','Week 3 · read-only inventory, owners and dependencies','You can name the actual services used by one application.'],
        ['Follow a real request end to end','Weeks 3–4 · frontend, API, database and background work','You can draw the complete request path.'],
        ['Reproduce a small service in a test environment','Week 4 · configuration, dependencies and deployment notes','Another developer can follow your notes.']
      ]
    },
    ownership: {
      title:'Build operational judgment',time:'Weeks 5–12 · evidence over speed',
      outcome:'You can propose, test, and explain a measurable improvement to a real service.',
      steps:[
        ['Build useful monitoring','Week 5 · dashboards and actionable alerts','You can identify which symptoms need attention.'],
        ['Practice failure and recovery','Week 6 · backups, restore exercises and rollback in a test environment','You can demonstrate recovery and explain its limits.'],
        ['Read the bill by workload','Week 7 · service costs, utilization, idle resources and traffic patterns','You can explain the largest cost drivers.'],
        ['Test one optimization','Week 8 · query efficiency, caching, resource size or scaling','You can compare cost, latency and errors before and after.'],
        ['Make infrastructure repeatable','Weeks 9–10 · infrastructure as code and deployment automation','You can reproduce a test environment.'],
        ['Deliver a reviewed improvement','Weeks 11–12 · company platform depth, change review and rollback plan','Your proposal includes measurements, tradeoffs and a recovery path.']
      ]
    }
  };
