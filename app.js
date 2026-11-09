'use strict';
const $=id=>document.getElementById(id);
const list=a=>'<ol>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ol>';
const detail=(t,b)=>`<details><summary>${t}</summary><div>${b}</div></details>`;
const table=(heads,rows)=>`<div class="tablewrap"><table><thead><tr>${heads.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>'<tr>'+r.map(x=>`<td>${x}</td>`).join('')+'</tr>').join('')}</tbody></table></div>`;
const check=(key,text)=>`<label class="check"><input type="checkbox" data-key="${key}"><span>${text}</span></label>`;
const card=(n,title,body,key,done)=>`<section class="card"><h3><span class="step">${n}</span>${title}</h3>${body}${check(key,done)}</section>`;
const labels={bronze:'Bronze',silver:'Silver',gold:'Gold'};
const spellLabels={1:'Bronze 1',2:'Bronze 2',3:'Silver',4:'Gold 1',5:'Gold 2'};
let lesson=1,spellingData;
try{lesson=Number(location.hash.slice(1))||1;}catch{}lesson=Math.min(10,Math.max(1,Math.trunc(lesson)));
const texts={bronze:{title:'Search Dog',author:'Rebekah White',issue:'Level 2 · November 2024',pages:'Read PDF pages 1–4. The final page contains credits.'},silver:{title:'New New Zealanders',author:'Adrienne Jansen',issue:'Level 3 · November 2017',pages:'This PDF contains only your article: printed pages 34–41.'},gold:{title:'Rongoā for the Land',author:'Mere Whaanga',issue:'Level 4 · November 2020',pages:'Read PDF pages 1–4 (printed pages 2–9). The final page contains credits.'}};
const readTasks={
bronze:[
['Read and find',list(['Read <em>Search Dog</em> with a partner. Take turns reading a section.','Who is Roxy’s trainer?','How long does it take to train a search dog?','Name two places where volunteers search for people.'])],
['Put it in order',`<p>Reread <strong>Hide-and-seek</strong>. Number these events 1–4:</p><ul><li>Roxy crosses the creek.</li><li>Jana calls “Searching!”</li><li>Roxy finds the person and barks.</li><li>Roxy stops near the water and lifts her nose.</li></ul><p>Retell the practice search using <strong>First → Next → Then → Finally</strong>.</p>`],
['Main idea',`<p>Reread <strong>The world through a nose</strong>.</p>${list(['What is this section mostly about?','Write two facts that explain why a dog’s nose is good at finding people.','What is the whole article mostly about? Write one sentence.'])}${detail('Need a starter?','<p>This section explains how ______. One fact is ______. Another fact is ______.</p>')}`],
['Think deeper',list(['Why might searchers need to be patient? Use a clue about the training.','Why does Jana reward Roxy with a toy? Explain how this could help her learn.','How do search volunteers show compassion? Give one example from the text.'])+detail('Answer starter','<p>I think ______ because the text says ______. This suggests ______.</p>')],
['Word detective',`<p>Find <strong>volunteers</strong>, <strong>detect</strong> and <strong>obedient</strong> in the text.</p>${list(['For each word, write its meaning and the nearby words that helped you.','Use one word in your own sentence.','Summarise the article in three sentences: the job, the training and how it helps people.'])}`]
],
silver:[
['Read and find',list(['Read <em>New New Zealanders</em>. Take turns with a partner if helpful.','Why did the family leave Iraq in 2007?','Which country did they move to after Syria?','What was the biggest challenge when they arrived in New Zealand?'])],
['Sequence and retell',`<p>Put these stages in order:</p><ul><li>The family settles in New Zealand.</li><li>The family leaves Iraq for Syria.</li><li>Christian grows more comfortable and learns English.</li><li>The family moves to Lebanon.</li></ul><p>Retell the journey in 4–5 sentences. Explain why they moved.</p><p class="small">Write about the family in the article. You do not need to share personal experiences.</p>`],
['Main ideas',list(['Reread <strong>Day by Day</strong>. What is its main idea?','Find two details showing how Christian was supported at school.','Write a two-sentence summary of the whole article. Include the journey and settling in.'])+detail('Main idea reminder','<p>A main idea tells what a section is mostly about. Supporting details explain it.</p>')],
['Think deeper',list(['Why is a short walk to school a “big deal” for Christian? Combine clues from the start and later sections.','Why could the family feel safe in New Zealand but still feel lonely?','Which action helped Christian feel included? Explain why it mattered.'])+detail('Answer starter','<p>The family may have felt ______. One clue is ______. Another clue is ______. Together, these suggest ______.</p>')],
['Word detective',`<p>Find <strong>refugees</strong>, <strong>discontented</strong> and <strong>translated</strong>.</p>${list(['For each word, write its likely meaning and a context clue. Check a dictionary if needed.','How does <strong>dis-</strong> help you understand <strong>discontented</strong>?','Write one paragraph: What helps people settle into a new country? Use two details from the article.'])}<p class="small">This article was published in 2017. Its descriptions and numbers belong to that time.</p>`]
],
gold:[
['Read and find',list(['Read <em>Rongoā for the Land</em>. Use the subheadings to pause between sections.','Where is Taipōrutu, and how long has the land been in the same whānau?','What is the restoration plan called?','Name the three key native plants discussed in the article.'])],
['Sequence and summarise',`<p>Reread <strong>Making tītoki oil</strong>. Number these stages 1–4:</p><ul><li>Heat the bag of crushed seeds.</li><li>Collect and soak the berries.</li><li>Twist the bag to squeeze out the oil.</li><li>Remove the pulp, then crush the clean seeds and put them in a woven bag.</li></ul><p>Summarise the process in your own words. Then explain how the article’s subheadings group information.</p><p class="small">This is a reading task, not an activity to try.</p>`],
['Main ideas',list(['What is the main idea of <strong>The Ahikāroa Plan</strong>? Support it with two details.','How do the tī kōuka, tītoki and mānuka sections develop that idea?','Which two details best support the whole article’s message? Explain why they are important.'])],
['Think deeper',list(['Why does the plan begin with the ancestors? Connect information from two sections.','What does the final idea — healing the land helps heal people — suggest? Use evidence.','How could the restoration benefit future generations? Support your inference with details from <strong>Healing the Land</strong>.'])+detail('Evidence frame','<p>This suggests ______. In the ______ section, we learn ______. This connects with ______ because ______.</p>')],
['Word detective',`<p>Find <strong>erosion</strong>, <strong>regenerate</strong> and <strong>cultivated</strong>.</p>${list(['Explain each word using a context clue. Check your meaning.','How does <strong>re-</strong> help explain <strong>regenerate</strong>?','Why is <strong>rongoā</strong> an effective word in the title? Explain its literal meaning and its wider connection to the article.','Write a 3–4 sentence summary connecting restoration, history and wellbeing.'])}`]
]};
const reportModel=`<div class="model"><h4>Search and Rescue Dogs</h4><p>Search and rescue dogs help to find people who are lost. They work with trained people in New Zealand.</p><h4>Their Job</h4><p>Search dogs look for missing people. They can search in forests, towns and along the coast. Finding someone can help keep that person safe.</p><h4>Their Training</h4><p>Search dogs need lots of practice. Training can take two or three years. A trainer may reward a dog with its favourite toy.</p><h4>Their Noses</h4><p>Dogs use their strong sense of smell to find people. People leave tiny smell chemicals behind as they move. A dog can follow these smells even when it cannot see the person.</p><p>Search dogs and their trainers work together to help people in danger.</p><p class="small">Simple teaching model based on <em>Search Dog</em> by Rebekah White, School Journal, November 2024. <a href="assets/bronze.pdf" target="_blank" rel="noopener">Original source ↗</a></p></div>`;
const history=`<h4>Helping in New Zealand’s past</h4><p>In 1968, the ferry <em>Wahine</em> sank near Wellington during a severe storm. Police and local people helped the survivors. Some worked through the night in terrible weather.</p><p>This is one example of people helping others during a difficult time in New Zealand’s history.</p><p class="small">Class summary based on <a href="https://nzhistory.govt.nz/culture/responding-to-tragedy/wahine-1968" target="_blank" rel="noopener">NZHistory: Co-ordinating the rescue ↗</a>, Manatū Taonga.</p>`;
const writingTitles=['What is a report?','How is it organised?','Facts into notes','Choose your topic','Research and plan'];
const writingTeaching=[
`<p><strong>An information report teaches the reader about a topic using facts.</strong></p><p>Look for: a title, introduction, headings, grouped facts and topic words.</p>${detail('Read our short model report',reportModel)}<p><strong>Read the model above before your task.</strong></p>`,
`<p><strong>Group related facts under a heading.</strong></p>${table(['Part','Its job'],[['Title','Names the topic.'],['Introduction','Explains what the topic is.'],['Body sections','Use headings and topic sentences. Add facts and explanations.'],['Closing statement','Rounds off the important ideas.']])}${detail('Open the model again',reportModel)}<p>Diagrams, photographs and captions can help when they add information.</p>`,
`<p><strong>Read → say it in your own words → note → check.</strong></p><div class="model"><p><strong>Question:</strong> How are search dogs trained?</p><p><strong>Short note:</strong> lots of practice; training takes 2–3 years; toy as reward</p><p><strong>Source:</strong> White, <em>Search Dog</em>, 2024, PDF page 1.</p></div><p>Use key words. Keep names and dates accurate. Record the source.</p>`,
`<p><strong>Choose something you care about.</strong> Your report must link to <strong>compassion</strong> and <strong>New Zealand history</strong>.</p><p>It can be about a person, group, event or cause. You do not have to choose from your reading or the ideas below.</p>${detail('A few ideas to get you thinking',table(['If you like…','You could explore…','A possible history link'],[['Animals','How people protect animals','The history of the SPCA in New Zealand'],['Sport','Making sport more inclusive','New Zealand’s involvement in the Paralympics'],['Helping people','Welcoming people seeking safety','The Polish children who came to Pahīatua in 1944'],['Rescue stories','People helping after a disaster','The Wahine rescue in 1968'],['Nature','Caring for native plants and wildlife','Past land use and restoration at Taipōrutu']]))}<p class="note">Check your idea: Who or what is being cared for? What is the New Zealand history connection?</p><p>Your report should explain facts about the topic, including its history and how it shows compassion.</p>`,
`<p><strong>Turn your questions into headings. Add notes underneath.</strong></p><div class="model"><p><strong>Question:</strong> How do search dogs find people?</p><p><strong>Heading:</strong> Using Their Noses</p><p><strong>Topic sentence:</strong> Search dogs use smell to find people.</p></div><p>Choose headings that fit your own questions. Include your compassion and New Zealand history links. Mark facts you still need to find.</p>`
];
const writingTasks={
bronze:[
list(['Write: “An information report teaches us about ______.”','Copy the model’s title and one heading.','Write two facts from the model.'])+detail('Help','<p>A fact gives information we can check. Example: A search dog’s training can take two or three years.</p>'),
`<p>Sort these facts under <strong>Their Job</strong> or <strong>Their Training</strong>:</p><ul><li>Dogs look for missing people.</li><li>Training can take two or three years.</li><li>Dogs search in forests and towns.</li><li>A trainer may use a toy as a reward.</li></ul><p>Write one sentence to introduce the topic: <strong>Search and rescue dogs are ______.</strong></p>`,
`<p>Choose one fact from your reading. Complete:</p>${table(['Question','Short note','Source'],[['What do I want to know?','What did I learn?','Title + page']])}<p>Do this twice. Say each idea aloud before writing.</p>`,
list(['Choose a topic you care about. It can be your own idea.','Finish: “This links to compassion because ______.”','Write three questions: What is it? How does it help? How do people care for or support it?']),
`<p>Draw this plan. Use the prompts:</p>${table(['Part','What to write'],[['Title','My topic'],['Introduction','My topic is …'],['Heading 1','What is it? + two notes'],['Heading 2','How does it help? + two notes'],['Heading 3','How do people care for or support it? + two notes'],['Sources','Titles and pages used']])}<p>Begin with two sections if you need more time. Put a ? beside missing facts.</p>`
],
silver:[
list(['Explain the purpose of an information report in one sentence.','Find the model’s introduction and two headings. Explain their jobs.','Copy two topic-specific words and explain their meanings.']),
list(['Use the model. List each body heading with its main idea and two supporting facts.','Write a different suitable heading for one section.','Explain how the introduction differs from a body section.']),
`<p>Choose two research questions about your chosen topic. Find at least two useful facts for each.</p>${table(['Question','Notes in my words','Source + page'],[['…','…','…']])}<p>Check: Did I keep the meaning without copying whole sentences?</p>`,
list(['Choose your own topic, small enough for a short report.','Explain the compassion and New Zealand history connections.','Write three research questions that could become sections.','Open a starter source. Find one useful fact.']),
`<p>Create a plan with:</p>${list(['A working title and notes for the introduction.','Three headings, with two relevant facts under each.','A possible topic sentence for one section.','A closing idea and a source list.'])}<p>Mark gaps with a ? and write one next research question.</p>`
],
gold:[
list(['Explain the model’s purpose and intended audience.','Identify how its headings, factual details and topic vocabulary help readers.','Suggest one useful visual and write a caption for it.']),
list(['Map the model: introduction → sections → closing statement. Explain why the sections follow this order.','Choose a body paragraph. Identify its topic sentence and supporting detail.','Suggest one additional section or explanation that would improve the report.']),
`<p>Create three questions about your chosen topic. Collect relevant notes and record each source and page.</p>${list(['Group related notes together.','Separate what the source states from your own inference.','Identify one claim to check in another source. Do not present a guess as a fact.'])}`,
list(['Choose your own focused topic linked to compassion and New Zealand history.','State the report’s purpose and audience.','Write three or four research questions, including one about history or change over time.','Explain why your topic is useful to understand. Locate a starting source.']),
`<p>Plan a report that connects ideas clearly.</p>${list(['Draft an introduction that defines the topic.','Create three or four purposeful headings and arrange them logically.','Add a topic sentence and at least two supporting notes per section.','Plan a useful visual with a caption.','List sources, identify gaps and name a claim to verify in a second source.'])}<p>A complete plan is the goal. The full report comes next.</p>`
]};
const sourceLinks=`<p>Use a book, trusted website, museum resource or interview that fits <strong>your topic</strong>. The links below are optional starting points.</p><ul><li><a href="https://www.spca.nz/about/our-history" target="_blank" rel="noopener">SPCA: our history ↗</a></li><li><a href="https://paralympics.org.nz/about/what-we-do/nz-at-the-paralympics/" target="_blank" rel="noopener">New Zealand at the Paralympics ↗</a></li><li><a href="https://nzhistory.govt.nz/page/polish-refugees-land-new-zealand" target="_blank" rel="noopener">Polish refugees arrive in New Zealand ↗</a></li><li><a href="https://nzhistory.govt.nz/culture/responding-to-tragedy/wahine-1968" target="_blank" rel="noopener">The Wahine rescue ↗</a></li></ul>${detail('Our journal texts — optional sources','<p><a class="btn" href="assets/bronze.pdf" target="_blank" rel="noopener">Search Dog ↗</a><a class="btn" href="assets/silver.pdf" target="_blank" rel="noopener">New New Zealanders ↗</a><a class="btn" href="assets/gold.pdf" target="_blank" rel="noopener">Rongoā for the Land ↗</a></p>')}<p class="small">Record the source title and page or website address. Check dates and keep the facts accurate.</p>`;
let activity='spelling';
let choices={reading:'bronze',writing:'bronze',spelling:'1',newSpelling:'bronze'};
const dayNames=['Reading','Writing','Reading','Writing','Research & plan'];
const dayGoals=['Find facts and retell in order.','Recognise and organise an information report.','Explain main ideas and make inferences.','Choose a topic and make research notes.','Organise facts into a report plan.'];
const successCriteria=[['I can find facts in the text.','I can retell events or stages in order.'],['I can identify report features.','I can group related facts.'],['I can explain a main idea.','I can support an inference with a clue.'],['I can link my topic to compassion and NZ history.','I can record notes and sources.'],['I can organise facts under headings.','I can identify information I still need.']];
for (const [title, , goal, success] of Object.values(newLessons)) {
 dayNames.push(title);
 dayGoals.push(goal);
 successCriteria.push([success]);
}
function go(n,tabName){lesson=n;activity=tabName||'spelling';window.history.replaceState(null,'','#'+n);render();window.scrollTo({top:0,behavior:'smooth'});}


const readingStarters={
bronze:{
0:[null,'Roxy’s trainer is ______.','It takes ______ to train a search dog.','Volunteers search for people in ______ and ______.'],
2:['This section is mostly about ______.','A dog’s nose is good at finding people because ______. Another reason is ______.','The whole article is mostly about ______.'],
3:['Searchers may need to be patient because ______. The text tells us ______.','Jana rewards Roxy with a toy because ______. This could help her learn by ______.','Search volunteers show compassion by ______. An example from the text is ______.']},
silver:{
0:[null,'The family left Iraq in 2007 because ______.','After Syria, the family moved to ______.','Their biggest challenge in New Zealand was ______.'],
2:['The main idea of “Day by Day” is ______.','Christian was supported at school when ______. He was also helped by ______.','The article explains ______. It also shows ______.'],
3:['Walking to school is a big deal for Christian because ______. The text tells us ______.','The family could feel safe but still lonely because ______. One clue is ______.','The action that helped Christian feel included was ______. It mattered because ______.']},
gold:{
0:[null,'Taipōrutu is ______. The land has been in the same whānau for ______.','The restoration plan is called ______.','The three key native plants are ______, ______ and ______.'],
2:['The main idea of “The Ahikāroa Plan” is ______. This is supported by ______ and ______.','The plant sections develop this idea by showing ______. For example, ______.','Two important details are ______ and ______. They support the message because ______.'],
3:['The plan begins with the ancestors because ______. The ______ section explains ______, which connects to ______.','The final idea suggests ______. Evidence for this is ______.','The restoration could benefit future generations by ______. The “Healing the Land” section supports this because ______.']}
};
function readingTaskBody(colour,idx){
 let body=readTasks[colour][idx][1];
 if(idx===1){
 const retell=colour==='silver'?'First, the family ______ because ______. Next, ______. Then, ______. Finally, ______.':colour==='gold'?'First, ______. Next, ______. Then, ______. Finally, ______.':'First, ______. Next, ______. Then, ______. Finally, ______.';
 return body+`<div class="sentence-start"><strong>Retell starter:</strong> ${retell}${colour==='gold'?'<br><strong>Explain the headings:</strong> The subheadings group information by ______. This helps the reader ______.':''}</div>`;
 }
 let n=0;const starters=readingStarters[colour][idx]||[];
 return body.replace(/<li>([\s\S]*?)<\/li>/g,(_,question)=>{const starter=starters[n++];return `<li>${question}${starter?`<div class="sentence-start"><strong>Start:</strong> ${starter}</div>`:''}</li>`;});
}

function vocabularyTask(colour){
 const first=lesson===1;
 const words={bronze:first?['volunteers','detect']:['obedient'],silver:first?['refugees','translated']:['discontented'],gold:first?['erosion','cultivated']:['regenerate']}[colour];
 const extra=first?'Use one word in your own sentence.':colour==='silver'?'How does the prefix dis- help you understand discontented?':colour==='gold'?'How does re- help explain regenerate? Why is rongoā an effective word in the title?':'Use obedient in a sentence about a search dog.';
 return `<section class="card"><h3>Word detective</h3><p>Find <strong>${words.join('</strong> and <strong>')}</strong> in your text.</p>${list(['Write what each word means.<div class="sentence-start"><strong>Start:</strong> The word ______ means ______.</div>','Copy a nearby word or phrase that helped you work it out.<div class="sentence-start"><strong>Start:</strong> The words “______” helped me work this out because ______.</div>',extra+(first||colour==='bronze'?'':'<div class="sentence-start"><strong>Start:</strong> The word part ______ means ______, so ______. '+(colour==='gold'?'The title is effective because rongoā means ______ and suggests ______.':'')+'</div>')])}${check(`vocab-${colour}-${lesson}`,'I used clues to explain the vocabulary.')}</section>`;
}

function readingPage(){
 if(lesson>5)return extensionReading();
 const colour=choices.reading,t=texts[colour];
 const resource=`<span class="tag ${colour}">${labels[colour]}</span><h3>${t.title}</h3><p class="small">${t.author} · School Journal ${t.issue}<br>${t.pages}</p><a class="btn" href="assets/${colour}.pdf#page=1" target="_blank" rel="noopener">Open your reading ↗</a>`;
 if(lesson===2||lesson===4){const prev=lesson===2?1:3;return `<section class="card">${resource}<p><strong>Today’s main activity is writing.</strong></p><p>Use this text for facts, or finish an earlier answer.</p><button data-go="${prev}" data-activity="reading">Revisit Lesson ${prev} reading →</button></section>`;}
 const indices=lesson===1?[0,1]:[2,3];
 return `<section class="card">${resource}<p class="small"><strong>Answer in full sentences.</strong> Use the starters to help. Fill in your own ideas and check the text.</p></section>`+indices.map((idx,i)=>`<section class="card"><h3><span class="step">${i+1}</span>${readTasks[colour][idx][0]}</h3>${readingTaskBody(colour,idx)}${check(`simple-read-${colour}-${idx}`,'I completed this task and checked the text.')}</section>`).join('')+vocabularyTask(colour)+`<section class="card"><h3>Check and share</h3><p>${lesson===1?'Retell the main events or process to a partner.':lesson===3?'Share one inference and the text clue that supports it.':'Explain one new word and how you worked out its meaning.'}</p><p class="small">Finished? Improve one answer using a more precise detail from the text.</p></section>`;
}
const structureTasks={
 bronze:`<p>Sort these facts under <strong>Their Job</strong> or <strong>Their Training</strong>:</p><ul><li>Dogs look for missing people.</li><li>Training can take two or three years.</li><li>Dogs search in forests and towns.</li><li>A trainer may use a toy as a reward.</li></ul>`,
 silver:list(['Choose two headings from the model. Record the main idea and a supporting fact for each.','Write a different suitable heading for one section.']),
 gold:list(['Map the model: introduction → sections → closing statement. Explain its order.','Identify a topic sentence and supporting details in one body paragraph.'])
};
function writingPageContent(){const c=choices.writing;
 if(lesson===1||lesson===3){let next=lesson+1;return `<section class="card"><span class="tag ${c}">${labels[c]}</span><h3>Today’s main activity is reading.</h3><p>Writing continues in Lesson ${next}. Finish your reading answers first.</p><button data-go="${lesson}" data-activity="reading">Open today’s reading →</button></section>`;}
 if(lesson===2)return `<section class="card learn"><h3>Writing · ${labels[c]}</h3></section><section class="card"><h3>1. Read together</h3>${history}<p><strong>Talk:</strong> Who needed help? What did other people do to help them?</p></section><section class="card"><h3>2. Learn</h3><p>An information report <strong>teaches readers about a topic using facts.</strong></p><p>Use a title, introduction, headings, grouped facts and topic words.</p>${detail('Read the short model report',reportModel).replace('<details>','<details open>')}${table(['Part','Job'],[['Introduction','Explains the topic.'],['Body sections','Group facts under headings.'],['Closing statement','Rounds off the important ideas.']])}</section><section class="card"><h3>3. Your task</h3><span class="tag ${c}">${labels[c]}</span>${writingTasks[c][0]}<h4>Group the information</h4>${structureTasks[c]}${check(`simple-write-${c}-2`,'I found report features and grouped related information.')}</section><section class="card exit"><h3>Check and share</h3><p>How do headings help the reader?</p></section>`;
 if(lesson===4)return `<section class="card learn"><h3>Writing · ${labels[c]}</h3></section><section class="card"><h3>1. Choose a topic</h3>${writingTeaching[3]}${writingTasks[c][3]}<p class="note">Check: compassion link ✓ small enough ✓ facts available ✓</p></section><section class="card"><h3>2. Research and note</h3>${writingTeaching[2]}<h4>Your task</h4>${c==='bronze'?'<p>Choose two of your questions. Find one fact for each. Record short notes and the title and page.</p>':c==='silver'?'<p>Find facts for two of your questions. Record short notes in your own words, with the title and page.</p>':'<p>Find facts for your questions. Group your notes, record sources and identify one claim to check in another source.</p>'}${sourceLinks}${check(`simple-write-${c}-4`,'I chose a topic, wrote questions and started my notes.')}</section><section class="card exit"><h3>Check and share</h3><p>What is your topic? How does it connect to compassion?</p></section>`;
 return `<section class="card learn"><h3>Research and plan · ${labels[c]}</h3></section><section class="card"><h3>2. Research and plan</h3>${writingTeaching[4]}${writingTasks[c][4]}${detail('Open research starting sources',sourceLinks)}${detail('Revisit the model report',reportModel)}${check(`simple-write-${c}-5`,'I grouped my notes under headings and marked missing facts.')}</section><section class="card exit"><h3>Check and share</h3><p>What have you learned? What do you still need to find out?</p></section><p class="small">A plan and research notes are the goal. Draft your full report next week.</p>`;
}

const writingBookTemplates={
2:{
bronze:[['Information Report Features','An information report teaches us about ______.','Title: ______','One heading: ______','Fact 1: ______','Fact 2: ______'],['Sort the Facts','Their Job','• ______','• ______','Their Training','• ______','• ______']],
silver:[['Information Report Features','Purpose: An information report ______.','Introduction: It introduces ______.','Heading 1: ______. Its job is to ______.','Heading 2: ______. Its job is to ______.','Topic word 1: ______ means ______.','Topic word 2: ______ means ______.'],['Group the Information','Heading 1: ______','Main idea: ______','Supporting fact: ______','Heading 2: ______','Main idea: ______','Supporting fact: ______','My new heading for one section: ______']],
gold:[['Purpose, Audience and Features','Purpose: This report informs readers about ______.','Audience: ______','The headings help readers by ______.','A factual detail is ______. This helps readers ______.','Topic vocabulary: ______. It helps readers understand ______.','My visual idea: ______','Caption: ______'],['Map the Report','Introduction — introduces ______.','Section 1: ______ — explains ______.','Section 2: ______ — explains ______.','Section 3: ______ — explains ______.','Closing statement — sums up ______.','This order helps the reader because ______.'],['Look Closely at One Paragraph','Section heading: ______','Topic sentence: ______','Supporting detail 1: ______','Supporting detail 2: ______']]
},
4:{
bronze:[['My Report Topic','Topic: ______','This links to compassion because ______.','Question 1: What is ______?','Question 2: How does ______ help?','Question 3: How do people care for or support ______?'],['My Research Notes','Question: ______','Short note: ______','Source title and page: ______','Question: ______','Short note: ______','Source title and page: ______']],
silver:[['My Report Topic','My focused topic: ______','It connects to compassion because ______.','My classmates could learn ______.','Question 1: ______?','Question 2: ______?','Question 3: ______?'],['My Research Notes','Question 1: ______?','Useful fact in my own words: ______','Source title and page: ______','Question 2: ______?','Useful fact in my own words: ______','Source title and page: ______']],
gold:[['My Report Topic','Focused topic: ______','Compassion connection: ______','Purpose: To inform readers about ______.','Audience: ______','Question 1: ______?','Question 2: ______?','Question 3: ______?','History or change question: ______?','This topic is useful to understand because ______.','Starting source: ______'],['My Research Notes','Research question: ______?','Related notes in my own words:','• ______','• ______','Source title, author/date and page: ______','An inference I made (not a checked fact): ______','A claim to check in another source: ______']]
},
5:{
bronze:[['My Information Report Plan','Working title: ______','Introduction: My topic is ______.','Heading 1: ______','• Fact: ______','• Fact: ______','Heading 2: ______','• Fact: ______','• Fact: ______','Heading 3: ______','• Fact: ______','• Fact: ______','Sources — titles and pages: ______','? I still need to find out ______.']],
silver:[['My Information Report Plan','Working title: ______','Introduction notes: ______','Heading 1: ______','• Fact: ______','• Fact: ______','Heading 2: ______','• Fact: ______','• Fact: ______','Heading 3: ______','• Fact: ______','• Fact: ______','Topic sentence for one section: ______','Closing idea: ______','Sources — titles and pages: ______','? My next research question: ______?']],
gold:[['My Information Report Plan','Working title: ______','Introduction: ______ is ______. It ______.','Section 1 heading: ______','Topic sentence: ______','• Supporting note: ______','• Supporting note: ______','Section 2 heading: ______','Topic sentence: ______','• Supporting note: ______','• Supporting note: ______','Section 3 heading: ______','Topic sentence: ______','• Supporting note: ______','• Supporting note: ______','Optional Section 4: use the same pattern.','Useful visual: ______','Caption: ______','Sources — title, author/date and page: ______','? Information still needed: ______','Claim to verify in a second source: ______']]
}
};
function writingBookTemplate(){
 const c=choices.writing,parts=writingBookTemplates[lesson]?.[c];if(!parts)return '';
 return `<section class="card writing-template"><span class="tag ${c}">${labels[c]}</span><h3>In your book</h3><p>Use this layout under your date and WALT. Fill the gaps with your own ideas.</p>${parts.map(([heading,...lines])=>`<div class="book-template-page"><h4>${heading}</h4>${lines.map(line=>`<div class="template-line">${line}</div>`).join('')}</div>`).join('')}${lesson===4&&c==='gold'?'<p class="small">Repeat the research-notes pattern for each question.</p>':''}<p class="small">Use the template as a guide. Your answers can take more than one line.</p></section>`;
}

function writingPage(){
 if(lesson>5)return extensionWriting();
 const c=choices.writing,base=writingPageContent();
 if(![2,4,5].includes(lesson))return base;
 const parts=writingBookTemplates[lesson][c];
 const lines=(p,start=0,end)=>parts[p].slice(1).slice(start,end);
 const pair=(question,rows)=>`<section class="question-pair"><h4>${question}</h4><div class="book-template-page"><p class="small"><strong>In your book:</strong> fill in your own ideas.</p>${rows.map(row=>`<div class="template-line">${row}</div>`).join('')}</div></section>`;
 let intro='',tasks=[];
 if(lesson===2){
 intro=base.slice(0,base.indexOf('<section class="card"><h3>3. Your task'));
 if(c==='bronze')tasks=[['1. What does an information report do?',lines(0,0,1)],['2. Copy the model’s title and one heading.',lines(0,1,3)],['3. Write two facts from the model.',lines(0,3)],['4. Sort these facts under Their Job or Their Training: dogs look for missing people; training takes two or three years; dogs search in forests and towns; a trainer may use a toy as a reward.',lines(1)]];
 if(c==='silver')tasks=[['1. Explain the purpose of an information report.',lines(0,0,1)],['2. Find the introduction and two headings. Explain their jobs.',lines(0,1,4)],['3. Choose two topic words and explain their meanings.',lines(0,4)],['4. For two headings, record the main idea and a supporting fact. Suggest a new heading for one section.',lines(1)]];
 if(c==='gold')tasks=[['1. Explain the model’s purpose and intended audience.',lines(0,0,2)],['2. Explain how headings, factual details and topic vocabulary help readers.',lines(0,2,5)],['3. Suggest a useful visual and write its caption.',lines(0,5)],['4. Map the introduction, sections and closing statement. Explain the order.',lines(1)],['5. Find a topic sentence and supporting details in one body paragraph.',lines(2)]];
 }
 if(lesson===4){
 intro=`<section class="card learn"><h3>Choose a topic and make notes · ${labels[c]}</h3></section><section class="card"><h3>Choose your topic</h3>${writingTeaching[3]}</section>`;
 const topicLines=['My topic: ______','It shows compassion because ______.','It links to New Zealand history because ______.'];
 if(c==='bronze')tasks=[['1. Choose a topic you care about. Explain both links.',topicLines],['2. Write three questions you want to research. Include a question about New Zealand history.',['Question 1: ______?','Question 2: ______?','Question 3: ______?']],['3. Find a fact for two questions. Record short notes and the source.',lines(1)]];
 if(c==='silver')tasks=[['1. Choose your own focused topic and explain both links.',topicLines.concat(['My classmates could learn ______.'])],['2. Write three research questions. Include one about your topic’s New Zealand history.',['Question 1: ______?','Question 2: ______?','Question 3: ______?']],['3. Research two questions. Record notes in your own words and your sources.',lines(1)]];
 if(c==='gold')tasks=[['1. Choose a focused topic you care about. Explain both links, purpose and audience.',topicLines.concat(['Purpose: To inform readers about ______.','Audience: ______'])],['2. Write three or four research questions. Include one about New Zealand history.',['Question 1: ______?','Question 2: ______?','Question 3: ______?','Optional question 4: ______?']],['3. Explain why the topic matters to you and find a starting source.',['I want to learn about this because ______.','Starting source: ______']],['4. Research your questions. Group notes, record sources and identify a claim to check.',lines(1)]];
 intro+=`<section class="card">${writingTeaching[2]}${sourceLinks}</section>`;
 }
 if(lesson===5){
 const examples=list([
  '<strong>Pahīatua’s Polish refugee children (1944).</strong> How did people help children displaced by war find safety and settle in Aotearoa? <a href="https://nzhistory.govt.nz/page/polish-refugees-land-new-zealand" target="_blank" rel="noopener">NZHistory ↗</a>',
  '<strong>The Wahine rescue (1968).</strong> Who helped passengers during and after the ferry disaster? What did they do? <a href="https://nzhistory.govt.nz/culture/responding-to-tragedy/wahine-1968" target="_blank" rel="noopener">NZHistory ↗</a>',
  '<strong>Student Volunteer Army (2010–11).</strong> How did students help Christchurch communities after the earthquakes? <a href="https://www.canterbury.ac.nz/about-uc/what-we-do/uc-in-the-community/canterbury-knowledge-commons/stories-of-impact/the-uc-student-volunteer-armys-response-to-covid-19" target="_blank" rel="noopener">University of Canterbury ↗</a>'
 ]);
 intro=`<section class="card learn"><h3>Research and plan · ${labels[c]}</h3><p><strong>Choose any topic from Aotearoa New Zealand’s history that you can connect to compassion.</strong> You can keep your Lesson 4 topic or change it. Pick a specific event, person, group or action and ask: Who needed help? Who showed care? What did they do?</p>${detail('Need inspiration? See three optional examples',examples+'<p>You can use one of these ideas or bring your own. A story from your local community or whānau can work if you can find evidence to research it.</p>')}</section><section class="card"><h3>My planning template</h3><p>Copy the prompts below into your book or a document. Use short notes in your own words. Save your plan for Lesson 7.</p>${detail('See how a question becomes a heading','<p><strong>Topic</strong> — Student Volunteer Army after the Christchurch earthquakes.</p><p><strong>Question</strong> — What did students do to help?</p><p><strong>Heading</strong> — Students help with the clean-up.</p><p><strong>Note</strong> — University students organised volunteers to help affected communities.</p><p><strong>Source</strong> — University of Canterbury, The UC Student Volunteer Army’s response to COVID-19 (background section).</p>')}</section>`;
 const groups=[
  ['What happened?', 'Who was involved? When and where did it happen?', 'What happened and when?'],
  ['How did people show compassion?', 'Who helped, what did they do, and who benefited?', 'How people helped'],
  ['What difference did it make?', 'What changed afterwards? What evidence shows the impact?', 'The impact']
 ];
 tasks=[
  ['1. Choose your topic and explain the link.', ['Working title — …','My topic fits Aotearoa New Zealand history because …','It connects to compassion because …','Introduction notes (who, what, where and when) — …']],
  ...groups.map(([heading,starter,example],i)=>[`${i+2}. Group ${i+1} · ${heading} ${starter}`,[
    'My research question — …',`My report heading (e.g. ${example}) — …`,'Fact or note 1 — …','Fact or note 2 — …','Source title and page or URL — …'
  ]]),
  ['5. Check your plan before drafting.', ['My closing idea — …','One question I still need to answer — …',
    {bronze:'Say your three headings aloud. Check that each fact fits under its heading.',silver:'Draft a topic sentence for one section. Check that it answers your question.',gold:'Cross-check one important claim with a second source. Record what the sources agree on or where they differ.'}[c]]]
 ];
 }

 return intro+`<section class="card"><span class="tag ${c}">${labels[c]}</span><h3>Your task</h3><p>Work through one question at a time. Use the template directly below it.</p>${tasks.map(([q,l])=>pair(q,l)).join('')}${check(`simple-write-${c}-${lesson}`,'I completed the tasks and checked my work.')}</section><section class="card exit"><h3>Check and share</h3><p>${lesson===2?'How do headings help a reader?':lesson===4?'How does your topic link to compassion and New Zealand history?':'What do you still need to find out?'}</p></section>`;
}

function spellingPage(){if(lesson>5)return extensionSpelling();
 const level=choices.spelling,words=spellingData.words[level];
 const task=lesson===1?'<p>Choose five tricky words. Look → cover → write → check.</p>':spellingData.tasks[level][lesson-2][1].replace(/Group ([1-5])/g,(_,n)=>spellLabels[n]);
 const title=lesson===1?'Choose five focus words':spellingData.tasks[level][lesson-2][0].replace(/^\d+\. /,'');
 return `<section class="card learn"><h3>Spelling</h3><p>Complete today’s activity. Continue unfinished practice from last week if needed.</p></section><section class="card"><span class="tag">${spellLabels[level]}</span><h3>${title}</h3>${task}${detail('Your 20 spelling words','<ol class="words">'+words.map(w=>'<li>'+w+'</li>').join('')+'</ol>').replace('<details>','<details open>')}${check(`simple-spell-${level}-${lesson}`,'I tested my words and corrected mistakes.')}${detail('More spelling practice',spellingData.tasks[level].map(([t,b])=>'<h4>'+t.replace(/^\d+\. /,'')+'</h4>'+b.replace(/Group ([1-5])/g,(_,n)=>spellLabels[n])).join(''))}</section><button data-go="${lesson}" data-activity="${[1,3].includes(lesson)?'reading':'writing'}">Continue to today’s ${[1,3].includes(lesson)?'reading':'writing'} →</button>`;
}
function render(){
 const availableActivities=newLessons[lesson]?.[1] || ([1,3].includes(lesson)?['spelling','reading']:['spelling','writing']);
 const choiceKey=activity==='spelling' && lesson>5?'newSpelling':activity;
 const legacySpelling=choiceKey==='spelling';
 const opts=legacySpelling?spellLabels:labels;
 if(!availableActivities.includes(activity))activity='spelling';
 $('lessons').innerHTML=dayNames.map((name,i)=>`<button data-go="${i+1}" ${lesson===i+1?'aria-current="step"':''}>Lesson ${i+1}<small>${name}</small></button>`).join('');
 let goal=dayGoals[lesson-1],criteria=successCriteria[lesson-1],heading=dayNames[lesson-1];
 if(lesson>5){
  heading=activity[0].toUpperCase()+activity.slice(1);
  if(activity==='spelling'){
   goal='Practise spelling words accurately.';
   criteria=['I can check my spelling and correct any mistakes.'];
  }
  if(lesson===10 && activity==='reading'){
   goal='Use clues to make inferences.';
   criteria=['I can support my inference with a clue from the text.'];
  }
  if(lesson===10 && activity==='writing'){
   goal='Check and improve my information report.';
   criteria=['I can improve a sentence and check my headings, facts and sources.'];
  }
 }
 $('today').innerHTML=`<p class="eyebrow">Lesson ${lesson} · ${dayNames[lesson-1]}</p><h2>${heading}</h2><section class="learning-bubble" aria-label="WALT and success criteria"><p class="bubble-walt"><strong>WALT:</strong> ${goal}</p><div class="simple-sc"><strong>Success criteria (no need to copy in your book)</strong><ul>${criteria.map(x=>'<li>'+x+'</li>').join('')}</ul></div></section><div class="book-standard"><p class="small"><strong>Set up your book like this. Copy the WALT, not the success criteria.</strong></p><div class="book-line">Date: Today’s date</div><div class="book-line book-under">WALT: ${goal}</div><div class="book-line book-under">Lesson ${lesson} — ${activity[0].toUpperCase()+activity.slice(1)} · ${opts[choices[choiceKey]]}</div><div class="book-line">Start your work here.</div></div><p class="small">Start with Spelling. Then open ${availableActivities[1]==='reading'?'Reading':'Writing'} — choose your colour.</p>`;
 const firstPanel=lesson>5?'activities':'today';
 const secondPanel=lesson>5?'today':'activities';
 const first=$(firstPanel),second=$(secondPanel);
 if(first.nextElementSibling!==second)second.before(first);
 $('activities').innerHTML=availableActivities.map(a=>`<button data-tab="${a}" aria-pressed="${activity===a}">${a[0].toUpperCase()+a.slice(1)}</button>`).join('');

 $('levels').innerHTML=Object.entries(opts).map(([value,label])=>`<button class="level ${legacySpelling?(value==='1'||value==='2'?'bronze':value==='3'?'silver':'gold'):value}" data-choice="${value}" aria-pressed="${choices[choiceKey]===value}">${label}</button>`).join('');
 $('content').innerHTML=({reading:readingPage,writing:writingPage,spelling:spellingPage}[activity])()+`<nav class="next" aria-label="Move between lessons">${lesson>1?`<button data-go="${lesson-1}">← Lesson ${lesson-1}</button>`:'<span></span>'}${lesson<10?`<button data-go="${lesson+1}">Lesson ${lesson+1} →</button>`:'<span>You’ve reached Lesson 10.</span>'}</nav>`;
 document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(Number(b.dataset.go),b.dataset.activity));
 document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{activity=b.dataset.tab;render();});
 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{choices[choiceKey]=b.dataset.choice;try{localStorage.setItem('r70-simple-choices',JSON.stringify(choices));}catch{}render();});
 document.querySelectorAll('[data-key]').forEach(c=>{try{c.checked=localStorage.getItem('r70-report-'+c.dataset.key)==='1';}catch{}c.onchange=()=>{try{localStorage.setItem('r70-report-'+c.dataset.key,c.checked?'1':'0');}catch{}};});
}
async function init(){try{const r=await fetch('spelling.json');if(!r.ok)throw Error();spellingData=await r.json();try{const v=JSON.parse(localStorage.getItem('r70-simple-choices'));if(v){for(const a of ['reading','writing','spelling','newSpelling'])if(Object.hasOwn(a==='spelling'?spellLabels:labels,v[a]))choices[a]=v[a];}}catch{}activity='spelling';render();}catch{$('content').innerHTML='<section class="card"><h2>Refresh to load your lesson</h2><p>Check your connection and refresh the page.</p></section>';}}
init();
