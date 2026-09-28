const TARGETS = [
  ["car", "🚗", "Car"], ["bus", "🚌", "Bus"], ["bike", "🚲", "Bicycle"], ["football", "⚽", "Football"],
  ["apple", "🍎", "Apple"], ["book", "📘", "Book"], ["laptop", "💻", "Laptop"], ["phone", "📱", "Phone"],
  ["camera", "📷", "Camera"], ["clock", "🕒", "Clock"], ["headphones", "🎧", "Headphones"], ["bottle", "🧴", "Bottle"],
  ["backpack", "🎒", "Backpack"], ["umbrella", "☂️", "Umbrella"], ["shoe", "👟", "Shoe"], ["guitar", "🎸", "Guitar"],
  ["key", "🔑", "Key"], ["pizza", "🍕", "Pizza"], ["balloon", "🎈", "Balloon"], ["star", "⭐", "Star"],
  ["dog", "🐕", "Dog"], ["cat", "🐈", "Cat"], ["plane", "✈️", "Plane"], ["rocket", "🚀", "Rocket"],
  ["tree", "🌳", "Tree"], ["crown", "👑", "Crown"], ["gift", "🎁", "Gift"], ["coffee", "☕", "Coffee"],
  ["sun", "☀️", "Sun"], ["moon", "🌙", "Moon"], ["diamond", "💎", "Diamond"], ["fire", "🔥", "Flame"],
  ["lightning", "⚡", "Lightning"], ["trophy", "🏆", "Trophy"], ["strawberry", "🍓", "Strawberry"]
];

const SHAPES = [
  { type: "circle", color: "#4f46e5", label: "●" },
  { type: "square", color: "#10b981", label: "■" },
  { type: "triangle", color: "#ef4444", label: "▲" },
  { type: "star", color: "#f59e0b", label: "★" }
];

// 60+ Rich Decision Scenarios across 8 Categories
const DECISION_TEMPLATES = [
  // 1. Technology
  ["A critical production payment service goes down during flash-sale traffic. What is the optimal decision?", "Execute the stable rollback snapshot and replay missing events from transaction logs.", "Deploy an unverified hotfix directly to production without testing.", "Shut down all servers for 24 hours.", "Ignore alerts and wait for auto-restarts.", "Technology", "Restoring a verified stable baseline stops cascading outages while logs guarantee transaction recovery."],
  ["An automated script printed unhashed passwords into Elasticsearch debug logs for 48 hours. What is your protocol?", "Halt logging, purge log indexes, rotate all affected passwords, and file a security incident.", "Silently delete the logs and hope nobody noticed.", "Post the credentials in the team channel.", "Wait until next month's retro.", "Technology", "Rapid credential revocation and incident disclosure prevent lateral exploitation."],
  ["A third-party authentication API returns 504 Gateway Timeouts for 30% of requests. What is the resilient pattern?", "Implement a circuit breaker with exponential backoff and fallback to cached session tokens.", "Bombard the API with infinite synchronous retries.", "Disable authentication for all users completely.", "Show an empty blank page.", "Technology", "Circuit breakers prevent thread exhaustion and give upstream services space to recover."],
  ["Two senior engineers disagree on GraphQL vs REST, delaying the release by 2 weeks. How should you resolve it?", "Define objective criteria (payload, caching, client complexity) and run a 2-day proof of concept.", "Side with whichever engineer has higher tenure automatically.", "Build both backends in full and maintain both indefinitely.", "Cancel the project.", "Technology", "Objective criteria and empirical spikes eliminate subjective debate."],
  ["A scanner finds a Zero-Day remote code execution bug in an open-source dependency with no patch yet. What is safest?", "Apply a web application firewall rule to block exploit payloads and isolate the affected module.", "Disable the scanner to avoid alerts.", "Wait 3 weeks for an upstream patch.", "Post details on social media.", "Technology", "Virtual patching via WAF and module sandboxing mitigates risk before official release."],
  ["Your machine learning model has 98% accuracy in training but drops engagement by 20% in production. What to check?", "Data leakage or train-serving skew where production distributions diverge from offline data.", "Assume users are intentionally boycotting the app.", "Increase server clock speed.", "Delete the database.", "Technology", "Train-serving skew produces misleading offline metrics that fail in real world traffic."],
  ["Cloud database costs spike by 400% after merging an unindexed N+1 query. How do you triage?", "Roll back or feature-flag the query immediately, then apply eager loading and composite indexing.", "Request an emergency cloud budget increase without changing code.", "Turn off all query monitoring.", "Tell users to stop visiting the site.", "Technology", "Feature flags allow instant operational containment while developers fix query efficiency."],
  ["You must choose consistency or availability for a banking ledger across partitions. What does CAP require?", "Consistency and Partition Tolerance (CP): Financial ledgers cannot tolerate split-brain discrepancies.", "Availability: Allow negative balances and phantom withdrawals during netsplits.", "CAP theorem does not apply.", "Delete past transactions.", "Technology", "Financial ledgers require strict linearizability to prevent irreversible fiscal imbalance."],

  // 2. Movies & Entertainment
  ["In Christopher Nolan's 'Interstellar', why does 1 hour on Miller's Planet equal 7 years on Earth?", "Extreme gravitational time dilation caused by the immense mass of Gargantua.", "Atmospheric radiation reflection.", "Onboard clocks were damaged.", "Miller's Planet orbits faster than light.", "Movies", "General relativity dictates that strong gravitational fields curve spacetime, slowing time relative to distant observers."],
  ["A studio finds midway through production that test audiences find the lead unsympathetic. What works best?", "Introduce a relatable moral vulnerability or compassionate action early in Act 1.", "Add louder explosions in the finale.", "Blame the audience and make no changes.", "Remove all character dialogue.", "Movies", "Audience empathy is cultivated through early authentic stakes and relatable moral choices."],
  ["In 'The Matrix', what does Neo taking the Red Pill symbolize philosophically?", "Choosing uncomfortable, rigorous truth and self-awareness over blissful ignorance.", "Submitting to robotic rule.", "Desiring to be a software developer.", "Endorsing virtual reality.", "Movies", "The Red Pill mirrors Plato's Cave: confronting jarring truth rather than comfortable falsehoods."],
  ["What camera technique did Alfred Hitchcock pioneer in 'Vertigo' to convey psychological vertigo?", "The Dolly Zoom (pushing camera forward while zooming out simultaneously).", "Night-vision handheld camera.", "120 FPS high speed slow motion.", "Strobe lighting with wide shots.", "Movies", "The Dolly Zoom distorts depth perspective while keeping foreground subject scale unchanged."],
  ["What is the primary role of a Foley Artist in film production?", "Recreating and recording everyday physical sound effects in sync with footage.", "Designing promotional film posters.", "Directing high-risk stunt actors.", "Financing the movie budget.", "Movies", "Foley artists provide realistic acoustic textures that location microphones fail to capture."],
  ["In 'The Shawshank Redemption', what allowed Andy Dufresne to preserve his hope across decades?", "Patience, intellectual enrichment, stoic discipline, and incremental daily effort.", "Violent riots against guards.", "Surrendering all desire for freedom.", "Refusing to interact with any humans.", "Movies", "Quiet discipline, mental preservation, and steady daily effort overcome seemingly impossible constraints."],
  ["What makes 'Chekhov's Gun' a fundamental screenwriting principle?", "Every narrative element introduced must serve a purposeful function later in the story.", "Every film must include firearms.", "Protagonists must always triumph early.", "Films should never have twists.", "Movies", "If a gun is introduced in Act 1, it must fire by Act 3; extraneous items break narrative trust."],
  ["In Hayao Miyazaki's 'Spirited Away', how does Chihiro regain her identity and save her parents?", "Through diligence, humility, kindness, and remembering her true name and connection to nature.", "Using magical weapons against bathhouse owners.", "Hoarding gold nuggets from No-Face.", "Abandoning her family.", "Movies", "Character growth is achieved through integrity, diligence, and genuine empathy rather than brute force."],

  // 3. General Knowledge
  ["Why does the human body require dietary Iron, and what happens if deficient?", "Iron synthesizes hemoglobin to bind oxygen in red blood cells; deficiency causes anemia and fatigue.", "Iron only hardens fingernails.", "Iron neutralizes stomach acids.", "Iron converts sunlight to Vitamin D.", "General Knowledge", "Heme iron forms the oxygen-binding core of hemoglobin, without which cellular respiration collapses."],
  ["What astronomical phenomenon causes the Earth to experience four distinct seasons?", "The 23.5-degree axial tilt of the Earth relative to its orbital plane around the Sun.", "Fluctuations in Earth's distance from the Sun.", "Volcanic ash clouds blocking solar rays.", "Jupiter's gravitational pull.", "General Knowledge", "Earth's fixed axial tilt changes solar angle of incidence and daylight hours as Earth orbits the Sun."],
  ["What is the fundamental economic concept of 'Opportunity Cost'?", "The value of the next best alternative forgone when making a decision.", "The total sales tax on an invoice.", "The construction cost of a factory.", "A clearance sale discount.", "General Knowledge", "Every resource allocated to one alternative forfeits the benefits of the next best opportunity."],
  ["Why does water expand when freezing into ice, unlike almost all other liquids?", "Hydrogen bonds arrange molecules into an open hexagonal crystal lattice less dense than liquid water.", "Trapped air bubbles push molecules apart.", "Thermal contraction splits atoms.", "Ice absorbs gravity.", "General Knowledge", "Ice's lower density allows ice sheets to float, insulating underlying aquatic life from freezing solid."],
  ["Which layer of the atmosphere absorbs the vast majority of harmful ultraviolet (UV-B) rays?", "The Stratospheric Ozone Layer (O3).", "The Tropospheric cloud layer.", "The Exosphere hydrogen fringe.", "The Ionosphere radio bounce layer.", "General Knowledge", "Ozone molecules absorb energetic UV photons, preventing DNA mutation in surface organisms."],
  ["What is the primary objective of a central bank when it raises benchmark interest rates?", "Cool down an overheating economy and curb high inflation by increasing borrowing costs.", "Give free money to retail banks.", "Stimulate maximum immediate consumer spending.", "Weaken the national currency.", "General Knowledge", "Higher interest rates discourage excessive credit creation, dampening aggregate demand to stabilize prices."],
  ["What property makes Carbon the foundational element for terrestrial organic life?", "Its tetravalence (4 valence electrons) enables versatile, stable covalent bonds with diverse elements.", "It is the heaviest element known.", "It emits natural radioactive heat.", "It is insoluble in all liquids.", "General Knowledge", "Carbon's 4 valence electrons enable long chains, rings, DNA backbones, and complex enzymes."],
  ["What was the landmark accomplishment of the 1944 Bretton Woods Conference?", "Establishing the IMF, World Bank, and pegged foreign exchange systems post-WWII.", "Drafting the steam engine patent.", "Signing the Treaty of Versailles.", "Creating the Euro currency.", "General Knowledge", "Bretton Woods built the postwar international monetary architecture to preserve economic stability."],

  // 4. Workplace & Professional
  ["You have 3 critical deliverables due at 5 PM but realistically only have time for two. What do you do?", "Triage by impact, notify stakeholders before midday, and secure a realistic scope adjustment.", "Rush all three by skipping QA and testing.", "Submit whatever is half-done at 4:59 PM in silence.", "Log off early and blame your ISP.", "Workplace", "Proactive communication and impact triage preserve software quality and professional trust."],
  ["A junior colleague repeatedly interrupts peers during sprint reviews. What is the constructive response?", "Offer private, empathetic 1-on-1 feedback with specific examples and active listening tips.", "Mock them publicly during the client call.", "Exclude them from future invites without word.", "Complain anonymously on Twitter.", "Workplace", "Private, behavior-focused feedback allows colleagues to improve without damaging psychological safety."],
  ["Your manager asks for an estimate on a feature using unverified machine learning APIs. How to estimate?", "Allocate a 3-day timeboxed research spike to assess API feasibility before committing to a range.", "Promise 4 hours to look impressive.", "Refuse to ever give software estimates.", "Quote 2 years so there's no pressure.", "Workplace", "Research spikes derisk technical unknowns before businesses commit to external delivery dates."],
  ["You accidentally run a production query that deletes customer notification preferences. Backups exist. What now?", "Alert the engineering lead and DBA immediately with timestamps and help restore from backup.", "Delete access logs to hide your identity.", "Blame a fictitious cyberattack.", "Take an unannounced 3-day vacation.", "Workplace", "Immediate transparent escalation minimizes recovery time before downstream systems diverge."],
  ["A client requests major scope expansion 1 week before signoff, promising more money later. How to respond?", "Acknowledge the idea's merit, explain launch risk, and issue a formal Change Request for Phase 2.", "Force engineers to work 24/7 unpaid overtime.", "Insult the client and breach contract.", "Accept silently without contractual updates.", "Workplace", "Formal change management protects project quality and team health while keeping client terms clear."],
  ["You notice signs of severe burnout in a high-performing teammate. How can you best support them?", "Check in privately with genuine care, offer to absorb blocking tasks, and encourage taking PTO.", "Report them for having a negative attitude.", "Assign them double work to stay busy.", "Ignore them completely until they quit.", "Workplace", "Peer empathy and pragmatic task relief prevent clinical burnout and foster sustainable teams."],
  ["Your company shifts to asynchronous hybrid work. What habit is most vital for individual effectiveness?", "Writing clear, structured documentation for decisions, PRs, and blockers rather than verbal chats.", "Moving your mouse to stay green 24/7.", "Scheduling 9 spontaneous video calls daily.", "Never writing anything down.", "Workplace", "Thorough asynchronous documentation unlocks distributed productivity without communication bottlenecks."],
  ["Another team blames your team for a missed milestone, but your records prove their inputs were 3 weeks late.", "Present the objective timeline and handoff timestamps calmly, focusing on process improvement.", "Yell insults at the opposing manager.", "Silently take the blame for others' delays.", "Storm out of the meeting.", "Workplace", "Factual data and objective handoff logs defuse emotional friction and pinpoint real pipeline fixes."],

  // 5. Student Life & Academic
  ["You have a final semester exam and a work shift scheduled at the exact same hour next week. What to do?", "Speak with your manager immediately to swap shifts, and alert the professor if issues persist.", "Skip both without notifying anyone.", "Send a friend to impersonate you.", "Arrive 45 minutes late without explanation.", "Student Life", "Early proactive notice gives employers and professors opportunity to arrange legitimate alternatives."],
  ["In a 4-person group project worth 40% of your grade, one teammate vanishes for 3 weeks. What should you do?", "Document communication attempts and task splits, notify the professor with evidence, and redistribute.", "Do nothing and fail the course.", "Put their name on the paper for free marks.", "Physically confront the student.", "Student Life", "Early factual documentation enables professors to grade fairly without jeopardizing innocent peers."],
  ["It is 1 AM before your chemistry exam and you are exhausted with 2 chapters left. What is optimal?", "Do a 20-minute active recall review of high-yield concepts, get 6 hours sleep, and wake up clear.", "Chug 4 energy drinks and pull an all-nighter.", "Give up and sleep through the exam.", "Panic on social media until dawn.", "Student Life", "Sleep consolidates synaptic memory; cognitive recall plunges dramatically under sleep deprivation."],
  ["A classmate offers to sell you last year's exam paper, claiming questions are identical. What do you do?", "Decline, study approved course materials and past papers, and safeguard your academic record.", "Buy the paper and resell to classmates.", "Blackmail the seller.", "Only study that paper and skip the syllabus.", "Student Life", "Academic integrity violations carry expulsion consequences that permanently stain transcripts."],
  ["You find a paragraph that perfectly summarizes your literature review argument. What is mandatory?", "Paraphrase in your own voice, integrate with your thesis, and provide an accurate academic citation.", "Copy and paste with no quotation marks.", "Use a synonym spinner to evade detection.", "Delete that section from your paper.", "Student Life", "Rigorous scholarly citation gives credit to original thinkers and validates academic research."],
  ["You feel overwhelmed balancing 5 courses, student club leadership, and a part-time job. How to balance?", "Apply the Eisenhower Matrix to prioritize high-leverage tasks, delegate club duties, and prune extras.", "Multitask everything during lectures.", "Drop out without speaking to an advisor.", "Play video games for 14 hours straight.", "Student Life", "The Eisenhower Matrix separates urgency from importance, enabling strategic delegation."],
  ["During a thesis defense, a committee member asks a technical question you don't know. What is best?", "Acknowledge the limitation honestly, state your reasoned hypothesis, and commit to following up.", "Invent fake statistics on the spot.", "Attack the question as irrelevant.", "Faint to escape answering.", "Student Life", "Intellectual humility and structured scientific reasoning earn genuine respect from review boards."],
  ["Your roommate plays loud music late at night while you are studying. How do you resolve this?", "Have a calm, respectful daytime conversation to establish agreed quiet hours and mutual boundaries.", "Destroy their speaker while they are out.", "Suffer in silent resentment all year.", "Call the police without talking first.", "Student Life", "Courteous daytime dialogue resolves interpersonal friction before animosity escalates."],

  // 6. Ethics & Governance
  ["You find an accounting error that added $25,000 to your non-profit's budget from an unverified donor.", "Report the anomaly to finance immediately, preserve audit logs, and initiate reconciliation.", "Spend the money quickly on office perks.", "Transfer the money to an offshore account.", "Delete the ledger row silently.", "Ethics", "Financial transparency and audit reconciliation protect non-profits from legal sanctions."],
  ["An AI recruitment model penalizes candidates from women's colleges due to historical data bias. What must you do?", "Halt deployment, audit the training distribution for systemic bias, and apply fairness constraints.", "Deploy anyway because algorithms are math.", "Delete all female applicants from records.", "Blame the candidates for college choice.", "Ethics", "Automated models amplify historical disparities unless actively audited and mitigated."],
  ["An executive demands you sign an environmental report containing falsified runoff numbers. What do you do?", "Refuse to falsify official records, document the directive, and report through compliance channels.", "Sign the false report to stay in favor.", "Sign but cross your fingers.", "Accept a cash bribe to stay quiet.", "Ethics", "Falsifying environmental compliance poses public health hazards and incurs severe criminal liability."],
  ["You find a USB drive in the corporate parking lot labeled 'Executive Salaries & Layoffs Q4'. What do you do?", "Turn it in directly to Information Security without plugging it into any machine.", "Plug it into your laptop to view salaries.", "Post the contents on Reddit.", "Sell the drive to news outlets.", "Ethics", "Unknown USBs are prime malware injection vectors, and reading private payroll breaches trust."],
  ["A lab worker notices stability testing data for a pediatric antibiotic was manipulated to pass inspection.", "Escalate to QA and if suppressed, file a protected whistleblower report to regulators.", "Ignore it because children aren't your concern.", "Shred all raw testing notebooks.", "Buy stock in the pharma company.", "Ethics", "In healthcare, patient safety supersedes organizational profits; compromised drugs can be lethal."],
  ["Your marketing director asks you to post fake 5-star reviews on the App Store to boost launch metrics.", "Politely refuse, noting fake reviews violate FTC regulations and app store terms risking bans.", "Write 500 reviews with bot scripts.", "Pay friends cash to write fake reviews.", "Post 1-star reviews on competitors.", "Ethics", "Astroturfing breaches consumer protection laws and frequently triggers permanent app marketplace bans."],
  ["Facial recognition software has a 35% false match rate on darker skin tones, but police want to deploy next week.", "Demand deployment be paused until demographic parity and false match benchmarks meet safety standards.", "Ship immediately to collect the contract fee.", "Tell police to ignore errors.", "Delete the warning disclaimer.", "Ethics", "Deploying racially disparate biometric tools in law enforcement directly leads to wrongful arrests."],
  ["While reviewing an M&A deal, you learn non-public material information that a stock will triple tomorrow.", "Do not trade that stock or tip others; trading on material non-public info is illegal insider trading.", "Invest your life savings immediately.", "Post the tip on anonymous forums.", "Demand an insider commission.", "Ethics", "Insider trading undermines market integrity and carries mandatory criminal prison sentences."],

  // 7. Business & Strategy
  ["A SaaS startup burns $150K/month with 4 months of runway left. The enterprise sales cycle is 6 months. What to do?", "Cut non-essential overhead, refocus on fast-closing high-margin accounts, and secure bridge capital.", "Double spending on billboard ads.", "Hire 20 more people to appear large.", "Do nothing and hope revenue surges.", "Business", "Disciplined cost containment and short-cycle conversions stave off insolvency before capital closes."],
  ["A competitor launches a clone product at half your retail price. How should an established leader react?", "Double down on brand trust, superior support, ecosystem lock-in, and proprietary innovation.", "Slash prices below manufacturing cost.", "File frivolous lawsuits without patents.", "Surrender the market entirely.", "Business", "Commoditization price wars destroy margins; enduring competitive moats come from value differentiation."],
  ["An e-commerce site sees 80% cart abandonment on mobile checkout versus 30% on desktop. What is optimal?", "Add 1-click mobile wallets (Apple Pay/Google Pay), remove mandatory signup, and streamline steps.", "Make the checkout form 5 pages longer.", "Turn off mobile buying completely.", "Send angry emails to abandoners.", "Business", "Mobile typing friction drives abandonment; native digital wallets and guest checkouts dramatically lift conversion."],
  ["What does a Net Promoter Score (NPS) of -25 indicate about a product's health?", "The product has substantially more detractors than promoters, signaling high churn risk.", "The product is the most loved in the world.", "Customers are ecstatic and evangelizing.", "NPS is meaningless.", "Business", "Negative NPS reveals systemic dissatisfaction, negative word of mouth, and unsustainable customer acquisition costs."],
  ["Why do venture investors demand a Customer Lifetime Value (LTV) to Acquisition Cost (CAC) of at least 3:1?", "It proves the business generates sufficient unit margin to cover overhead and scale profitably.", "It is a government regulation.", "It guarantees zero competition.", "It ensures staff get annual bonuses.", "Business", "A 3:1 LTV:CAC ratio ensures enough gross contribution margin to fund sales, engineering, and server overhead."],
  ["A retail chain wants to expand into a new international market. Which entry model lowers cultural risk?", "Partner with proven local franchisees who know domestic culinary tastes, supply chains, and zoning laws.", "Open 100 stores overnight without research.", "Refuse to translate menus into local tongues.", "Air-freight all ingredients daily.", "Business", "Local franchise partnerships transfer regulatory and cultural adaptation to experienced operators."],
  ["When should an engineering team prioritize refactoring technical debt over shipping consumer features?", "When bug velocity outpaces feature delivery, fragility halts releases, and engineer turnover surges.", "Never; code quality doesn't affect business.", "Only when developers run out of ideas.", "Every Friday without automated tests.", "Business", "Unchecked technical debt compounds like financial interest until it brings product delivery to a halt."],
  ["What is the strategic purpose of building a 'Network Effect' into a platform?", "Each new user increases the value of the platform for all existing users, creating a defensive moat.", "It eliminates the need for servers.", "It guarantees zero support tickets.", "It makes web pages load instantly.", "Business", "Two-sided network effects make platforms exponentially stickier and harder for competitors to disrupt."],

  // 8. Real-World Problem Solving
  ["You are home during an intense blizzard and power fails. Outside temp is -15°C. What is the survival protocol?", "Consolidate into a central interior room with closed doors, insulate windows, and avoid indoor gas grills.", "Bring an outdoor charcoal grill inside for heat.", "Open all windows to equalize pressure.", "Drink alcohol to stay warm.", "Problem Solving", "Charcoal grills emit lethal carbon monoxide; consolidating body heat in an insulated room prevents hypothermia."],
  ["Smoke emerges from your kitchen oven and grease flames erupt. How do you extinguish a kitchen grease fire?", "Smother with a metal lid/sheet to starve of oxygen, turn off heat, or use baking soda; NEVER use water.", "Pour a bowl of water onto the grease.", "Blow violently on the fire.", "Carry the flaming pan outside through rooms.", "Problem Solving", "Water causes explosive steam expansion that atomizes burning oil; oxygen starvation safely extinguishes grease fires."],
  ["You are driving on a wet highway and your car hydroplanes (tires lose road grip). How do you regain control?", "Ease foot gently off the accelerator, hold the wheel steady, and avoid slamming on the brakes.", "Slam the brake pedal to the floor.", "Yank the steering wheel back and forth.", "Pull the mechanical handbrake at 70 mph.", "Problem Solving", "Slamming brakes while tires float on water induces violent spins; easing off throttle allows treads to regain traction."],
  ["You are hiking in a dense forest and realize you lost the trail with sunset 90 minutes away. What is protocol (S.T.O.P.)?", "Stop, Think, Observe, Plan: Stay in a visible dry spot, build shelter before dark, and conserve energy.", "Sprint in random directions trying to hit a road.", "Eat unknown mushrooms for energy.", "Wade through river rapids in the dark.", "Problem Solving", "Panic wandering leads to severe exposure; remaining near your last known point helps search teams locate you."],
  ["In an office cafeteria, a peer clutches their throat, unable to speak, cough, or breathe. What do you do?", "Perform the Heimlich Maneuver (abdominal thrusts inward and upward just above navel) immediately.", "Give them a large glass of water.", "Slap their face until they breathe.", "Walk away to avoid embarrassment.", "Problem Solving", "The universal choking sign signals airway blockage; abdominal thrusts generate pressure to dislodge the obstruction."],
  ["A laptop battery catches fire and hisses with toxic white smoke on your desk. What is proper containment?", "Evacuate bystanders, use copious water or ABC extinguisher from safe distance, ventilate, and call 911.", "Hug the laptop with your clothes.", "Throw into a plastic trash can.", "Blow on the battery cells.", "Problem Solving", "Lithium battery thermal runaway produces hazardous hydrogen fluoride; immediate ventilation and fire services are vital."],
  ["Someone in your home experiences suspected carbon monoxide poisoning (dizziness, headache, nausea). First step?", "Evacuate everyone into fresh outdoor air immediately and dial 911 from outside.", "Tell them to take a nap in the same room.", "Turn on gas burners to test them.", "Wait 24 hours to see if symptoms pass.", "Problem Solving", "Carbon monoxide binds to hemoglobin 200x stronger than oxygen; fresh air evacuation is life-critical."],
  ["You receive a call from an alleged bank fraud agent demanding your 6-digit SMS verification code. What do you do?", "Hang up immediately, find the bank's official number on the back of your card, and call them directly.", "Read the code to the caller immediately.", "Give them your online password.", "Wire money to their personal account.", "Problem Solving", "Banks never ask for OTPs; scammers use urgency and spoofed numbers to bypass two-factor authentication."]
];

function randomInt(max) { return Math.floor(Math.random() * max); }
function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function clampLevel(level) { return Math.max(1, Math.min(10, Number(level) || 1)); }

function makeFocus(level, index) {
  const target = TARGETS[index % TARGETS.length];
  const totalCells = level === 1 ? 16 : level <= 3 ? 20 : 24;
  const targetCount = Math.min(8, 3 + level);
  const timeSeconds = Math.max(9, 20 - (level * 2));
  const distractors = shuffle(TARGETS.filter(item => item[0] !== target[0]));
  const cells = Array.from({ length: targetCount }, () => target[1]);
  while (cells.length < totalCells) cells.push(distractors[cells.length % distractors.length][1]);
  return {
    id: `focus_${String(index + 1).padStart(3, "0")}`,
    level,
    target: { id: target[0], emoji: target[1], name: target[2] },
    cells: shuffle(cells),
    targetCount,
    totalCells,
    timeSeconds
  };
}

function makeMemory(level, index) {
  const count = Math.min(10, 5 + level);
  const itemPool = TARGETS.map(item => item[1]);
  const offset = (index * 4) % itemPool.length;
  const pool = itemPool.slice(offset).concat(itemPool.slice(0, offset));
  const sequence = pool.slice(0, count);
  const distractorCount = Math.min(10, 5 + level);
  const remainingPool = itemPool.filter(item => !sequence.includes(item));
  const distractors = shuffle(remainingPool).slice(0, distractorCount);
  const displaySeconds = Math.max(1.8, Math.round((4.0 - (level * 0.4)) * 10) / 10);
  return {
    id: `memory_${String(index + 1).padStart(3, "0")}`,
    level,
    sequence,
    choices: shuffle([...sequence, ...distractors]),
    displaySeconds
  };
}

function makeReaction(level, index) {
  const target = TARGETS[index % TARGETS.length];
  return {
    id: `reaction_${String(index + 1).padStart(3, "0")}`,
    level,
    rounds: 6,
    lives: 3,
    targetEmoji: target[1],
    targetName: target[2],
    targetType: ["green", "cyan", "amber"][index % 3]
  };
}

function makePattern(level, index) {
  const mode = level <= 2 ? index % 2 : index % 4;
  if (mode === 0) {
    const start = 2 + (index % 7); const step = 2 + (level % 4); const length = Math.min(7, 4 + Math.floor(level / 3));
    const sequence = Array.from({ length }, (_, n) => ({ type: "num", color: "#4f46e5", label: String(start + n * step) }));
    const answer = start + length * step;
    return patternResult(index, level, sequence, { type: "num", color: "#4f46e5", label: String(answer) }, [answer, answer + step, answer - step, answer * 2]);
  }
  if (mode === 1) {
    const start = 1 + (index % 5); const step = 1 + (level % 3); const length = Math.min(7, 4 + Math.floor(level / 3));
    const sequence = Array.from({ length }, (_, n) => ({ type: "num", color: "#8b5cf6", label: String(start + n * step) }));
    const answer = start + length * step;
    return patternResult(index, level, sequence, { type: "num", color: "#8b5cf6", label: String(answer) }, [answer, answer + 1, answer + step * 2, Math.max(0, answer - step)]);
  }
  if (mode === 2) {
    const offset = index % 4; const length = Math.min(7, 4 + Math.floor(level / 3));
    const sequence = Array.from({ length }, (_, n) => ({ type: "mixed", color: n % 2 ? "#10b981" : "#4f46e5", label: String.fromCharCode(65 + offset + n) }));
    const answer = String.fromCharCode(65 + offset + length);
    const answerColor = length % 2 ? "#10b981" : "#4f46e5";
    return patternResult(index, level, sequence, { type: "mixed", color: answerColor, label: answer }, [answer, String.fromCharCode(answer.charCodeAt(0) + 1), String.fromCharCode(answer.charCodeAt(0) - 1), "Z"]);
  }
  const shapeOffset = index % SHAPES.length; const length = Math.min(7, 4 + Math.floor(level / 3));
  const sequence = Array.from({ length }, (_, n) => SHAPES[(shapeOffset + n) % SHAPES.length]);
  const answer = SHAPES[(shapeOffset + length) % SHAPES.length];
  return patternResult(index, level, sequence, answer, [answer, SHAPES[(shapeOffset + length + 1) % 4], SHAPES[(shapeOffset + length + 2) % 4], SHAPES[(shapeOffset + length + 3) % 4]]);
}

function patternResult(index, level, sequence, correctAnswer, optionValues) {
  const options = shuffle(optionValues.map(value => typeof value === "number" ? { type: "num", color: correctAnswer.color, label: String(value) } : value));
  return { id: `pattern_${String(index + 1).padStart(3, "0")}`, level, title: "Adaptive Sequence", sequence, correctAnswer, options };
}

function makeDecision(level, index) {
  const template = DECISION_TEMPLATES[index % DECISION_TEMPLATES.length];
  const question = template[0];
  const answerTexts = template.slice(1, 5);
  const correctText = answerTexts[0];
  const category = template[5] || "Technology";
  const explanation = template[6] || "Optimal decision based on risk management and evidence.";
  const options = shuffle(answerTexts.map((text, optionIndex) => ({
    key: String.fromCharCode(65 + optionIndex),
    text,
    isCorrect: text === correctText
  })));
  const timeSeconds = Math.max(8, 14 - level);
  return {
    id: `decision_${String(index + 1).padStart(3, "0")}`,
    level,
    category,
    question,
    options,
    explanation,
    timeSeconds
  };
}

export function generateChallenge(game, level, index = randomInt(60)) {
  const safeLevel = clampLevel(level);
  if (game === "focus") return makeFocus(safeLevel, index);
  if (game === "memory") return makeMemory(safeLevel, index);
  if (game === "reaction") return makeReaction(safeLevel, index);
  if (game === "pattern") return makePattern(safeLevel, index);
  return makeDecision(safeLevel, index);
}

export function challengePoolIds(game) {
  return Array.from({ length: 60 }, (_, index) => `${game}_${String(index + 1).padStart(3, "0")}`);
}

export function regenerateChallenge(game, level, excludedIds) {
  const available = challengePoolIds(game).filter(id => !excludedIds.includes(id));
  const selectedId = available[randomInt(Math.max(1, available.length))] || challengePoolIds(game)[randomInt(60)];
  const selectedIndex = Number(selectedId.split("_").pop()) - 1;
  return generateChallenge(game, level, Math.max(0, selectedIndex));
}
