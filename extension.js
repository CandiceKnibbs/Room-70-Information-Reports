const newLessons = {
  6: ['Reading', ['spelling','reading'], 'Find facts and explain the main idea.', 'I can find a fact and say what a section is mostly about.'],
  7: ['Writing', ['spelling','writing'], 'Draft an introduction and a section of my report.', 'I can introduce my topic and group facts under a heading.'],
  8: ['Reading', ['spelling','reading'], 'Sequence and retell key events.', 'I can retell three events in order in my own words.'],
  9: ['Writing', ['spelling','writing'], 'Develop and finish my report draft.', 'I can explain my facts and show how my topic links to compassion and New Zealand history.'],
  10: ['Reading & writing', ['spelling','reading','writing'], 'Use clues to make inferences and check my report.', 'I can support an inference with a clue and make a clear improvement to my report.']
};
const journalLinks = {
  bronze: ['Idea City', 'assets/idea-city.pdf'],
  silver: ['Give Forever', 'assets/give-forever.pdf'],
  gold: ['Ann Evans: Colonial Nurse', 'assets/ann-evans.pdf']
};
const newReading = {
  6: {
    bronze: ['What is one place that closed after the Christchurch earthquakes?', 'One place that closed was …', 'What is Gap Filler mostly about?', 'This section is mostly about …', 'What does volunteers mean in Gap Filler?', 'Volunteers are people who …'],
    silver: ['What does Zuhaib do at his shop on Sundays?', 'On Sundays, Zuhaib …', 'What is the opening section mostly about?', 'This section is mostly about …', 'What does afford mean when the article talks about food?', 'If someone can’t afford food, it means …'],
    gold: ['In Patients, how did Ann travel to people who lived far away?', 'Ann travelled by …', 'What is Patients mostly about?', 'This section is mostly about …', 'What does bounty mean in the account about Tītokowaru?', 'In this account, a bounty is …']
  },
  8: {
    bronze: ['Put these in order: people create new projects, earthquakes strike Christchurch, places close.', 'The order is …', 'Retell what happened. Name one project and how people could use it.', 'First, … Then, … After that, …', 'In Street Art, what does temporary mean?', 'Temporary means …'],
    silver: ['Put these in order: Zuhaib buys his own shop, sleeps in a park, gets a job at the kebab shop.', 'The order is …', 'Retell those events in your own words.', 'First, … Next, … Later, …', 'In Chips at the Mall, why was the lawyer’s help life-changing?', 'The help was life-changing because …'],
    gold: ['Reread Patients. Order these events: Ann cares for people in the camp, Ngāti Ruanui ask Ann for help, Ann meets Tītokowaru.', 'The order is …', 'Retell the events in your own words.', 'First, … When Ann arrived, … Over the next six weeks, …', 'What does emerged mean when the two men appear on the track?', 'The men emerged, which means they …']
  },
  10: {
    bronze: ['How might someone feel after seeing an All Right? poster?', 'Someone might feel …', 'Why might the team have made the posters after the earthquakes? Give a clue.', 'They may have made the posters because … A clue is …', 'What does feel a little blue mean in the poster?', 'In this poster, it means …'],
    silver: ['How might Zuhaib have felt when the man at the kebab shop listened to him?', 'Zuhaib might have felt …', 'How might being helped in Auckland explain why Zuhaib gives away food? Give a clue.', 'His experience may help explain why he … A clue is …', 'What does in need mean when the article describes who Zuhaib helps?', 'In this section, people in need are …'],
    gold: ['Why might Ann have felt worried when she arrived at the camp?', 'Ann may have felt worried because …', 'What can you infer about how Ngāti Ruanui treated Ann while she cared for people in the camp? Give a clue.', 'I think Ngāti Ruanui treated Ann … A detail that supports this is …', 'In Final years in Hāwera, what does supplement her income mean?', 'Ann ran other businesses to …']
  }
};
function extensionReading() {
  const colour = choices.reading;
  const [title, url] = journalLinks[colour];
  const [q1,s1,q2,s2,q3,s3] = newReading[lesson][colour];
  const headings = {6:['Find it','Main idea'],8:['Put it in order','Retell it'],10:['Read for clues','Explain your inference']};
  return `<section class="card"><span class="tag ${colour}">${labels[colour]}</span><h3>${title}</h3><a class="btn" href="${url}" target="_blank" rel="noopener">Open full text ↗</a><p>Answer in full sentences. Use the starters to help.</p></section>` +
    [...headings[lesson],'Vocabulary'].map((heading,i) =>
      card(i+1, heading, `<p>${[q1,q2,q3][i]}</p><p><strong>${[s1,s2,s3][i]}</strong></p>`, `read-${lesson}-${colour}-${i}`, 'I checked the text.')).join('');
}
const spellingExamples = {
  bronze: [['cuasebe','tghouth','priserus'],['becuse','thougt','surprize'],['because','thought','surprise']],
  silver: [['cessaryne','tunityoppor','mendrecom'],['necesary','oportunity','recomend'],['necessary','opportunity','recommend']],
  gold: [['legeprivi','nairequestion','sableindispen'],['privelege','questionaire','indispensible'],['privilege','questionnaire','indispensable']]
};
function extensionSpelling() {
  const colour = choices.newSpelling;
  const words = {bronze:[...spellingData.words[1],...spellingData.words[2]],silver:spellingData.words[3],gold:[...spellingData.words[4],...spellingData.words[5]]}[colour];
  const [jumbles, slips, answers] = spellingExamples[colour];
  const wordBank = detail('Need to choose words? Open your word bank', list(words));
  const activities = {
    6:['Word Bubble','<p>Pick five words. Draw a bubble around each word. Underline the tricky part and write a reminder underneath.</p><div class="spelling-model"><strong>surprise</strong><div>I need to remember the r before the p.</div></div>'],
    7:['Unjumble It','<p>Unjumble these three words. Check them, then cover and write them again.</p>'+list(jumbles)+detail('Check my words',list(answers))],
    8:['Spot the Slip','<p>Fix one spelling mistake in each word. Underline the part you fixed.</p>'+list(slips)+detail('Check my words',list(answers))],
    9:['Words in Sentences','<p>Choose two words. Write a full sentence for each and underline your spelling words.</p>'],
    10:['Beat Your First Try','<p>Pick three tricky words. Look, say, cover, write and check. Try any word you missed once more.</p>']
  };
  const [title, task] = activities[lesson];
  const chooseWords = [6, 9, 10].includes(lesson);
  const next = newLessons[lesson][1][1];
  return `<section class="card"><span class="tag ${colour}">${labels[colour]}</span><h3>${title}</h3><p class="small">Start here. Write only the words you use in this activity.</p>${task}${chooseWords ? wordBank : ''}${check(`new-spell-${lesson}-${colour}`,'I checked my spelling.')}</section><button data-go="${lesson}" data-activity="${next}">Open ${next} →</button>`;
}
const newWriting = {
  7: [
    ['Use your Lesson 5 plan. Write a title and introduce your topic.', ['Title — …','My topic is …','It matters in Aotearoa New Zealand because …']],
    ['Write your first section. Use one heading and facts from your notes.', ['Heading — …','This section is about …','One fact is …','Another fact is …']]
  ],
  9: [
    ['Draft your remaining sections. Check where you explain the history and the act of compassion.', ['Heading — …','In …, … happened.','People showed care by …','This helped because …']],
    ['Add a short ending and list your sources.', ['This report shows …','Sources — title and page or web address']]
  ],
  10: [
    ['Reread your report. Improve one sentence so a reader can understand your topic more clearly.', ['Before — …','After — …']],
    ['Check your headings, facts and sources. Finish your final copy.', ['Title → Introduction → Headings and facts → Ending → Sources']]
  ]
};
const writingExtension = {
  bronze: 'Use the starters to turn your notes into complete sentences.',
  silver: 'Use topic sentences and add a detail that explains each main fact.',
  gold: 'Use precise topic words and check that dates and claims match your sources.'
};
function extensionWriting() {
  const colour = choices.writing;
  return `<section class="card"><span class="tag ${colour}">${labels[colour]}</span><p>${writingExtension[colour]}</p>` +
    newWriting[lesson].map(([prompt, rows], i) => `<section class="question-pair"><h4>${i+1}. ${prompt}</h4><div class="book-template-page"><strong>In your book</strong>${rows.map(row=>`<div class="template-line">${row}</div>`).join('')}</div></section>`).join('') +
    check(`new-write-${lesson}-${colour}`,'I checked my report.') + '</section>';
}
