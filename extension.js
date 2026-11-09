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
const readingPractice = {
  6: {
    bronze: ['Find two Gap Filler projects. Explain how people used each one.', 'Choose one detail that shows people helping Christchurch recover. Explain how it helped.', 'Use volunteers in a sentence about Christchurch.'],
    silver: ['Find two ways people helped Zuhaib in Auckland. Who helped and what did each person do?', 'Find one detail in the opening that supports your main idea. Explain the link.', 'Use afford in a sentence that shows its meaning.'],
    gold: ['Find two details that show how difficult it could be for Ann to reach patients.', 'Choose one detail from Patients that supports your main idea. Explain why it fits.', 'Explain what the bounty adds to your understanding of the situation.']
  },
  8: {
    bronze: ['Find one detail about Gap Filler and one about Street Art. Add both to your retell.', 'Write a four-sentence retell in your own words. End by explaining how one idea helped the community.', 'Find a clue that helped you work out what temporary means.'],
    silver: ['Add two details from Chips at the Mall to your timeline. Explain where they fit.', 'Write a five-sentence retell. Explain how support from others helped Zuhaib move forward.', 'Use life-changing in a new sentence and explain why it fits.'],
    gold: ['Add two details from Patients to your sequence. Explain where they fit.', 'Write a five- or six-sentence retell. Include what Ann did and how Ngāti Ruanui responded.', 'Replace emerged with a synonym. Explain whether it keeps the meaning.']
  },
  10: {
    bronze: ['Choose another detail from the article that shows people helping. Explain who it helped and how.', 'Write two sentences explaining what the article shows about compassion after the earthquakes.'],
    silver: ['Find another clue that supports your inference about why Zuhaib gives away food.', 'Write two or three sentences connecting the help Zuhaib received with the help he gives others.'],
    gold: ['Find a second detail about how Ngāti Ruanui treated Ann. Explain how it supports or adds to your first inference.', 'Write a short paragraph about what Ann’s actions and the response to her show about compassion. Use evidence from Patients.']
  }
};
function extensionReading() {
  const colour = choices.reading;
  const [title, url] = journalLinks[colour];
  const [q1,s1,q2,s2,q3,s3] = newReading[lesson][colour];
  const headings = {6:['Find it','Main idea'],8:['Put it in order','Retell it'],10:['Read for clues','Explain your inference']};
  return `<section class="card"><span class="tag ${colour}">${labels[colour]}</span><h3>${title}</h3><a class="btn" href="${url}" target="_blank" rel="noopener">Open full text ↗</a><p>Answer in full sentences. Use the starters to help.</p></section>` +
    [...headings[lesson],'Vocabulary'].map((heading,i) =>
      card(i+1, heading, `<p>${[q1,q2,q3][i]}</p><p><strong>${[s1,s2,s3][i]}</strong></p>`, `read-${lesson}-${colour}-${i}`, 'I checked the text.')).join('') +
    card(4, 'Read again and show your thinking', list(readingPractice[lesson][colour]),
      `read-${lesson}-${colour}-practice`, 'I reread the text and checked my answers.') +
    `<section class="card"><h3>Finished early?</h3><p>Write one new question about the text. Swap with a partner or answer it yourself using a detail from the reading.</p></section>`;
}
const spellingExamples = {
  bronze: [['cuasebe','tghouth','priserus','therano','enoguh'],['becuse','thougt','surprize','anoter','enogh'],['because','thought','surprise','another','enough']],
  silver: [['cessaryne','tunityoppor','mendrecom','diatelyimme','sponsibilityre'],['necesary','oportunity','recomend','imediately','responsibilty'],['necessary','opportunity','recommend','immediately','responsibility']],
  gold: [['legeprivi','nairequestion','sableindispen','ryhierach','niummillen'],['privelege','questionaire','indispensible','heirarchy','millenium'],['privilege','questionnaire','indispensable','hierarchy','millennium']]
};
function extensionSpelling() {
  const colour = choices.newSpelling;
  const words = {bronze:[...spellingData.words[1],...spellingData.words[2]],silver:spellingData.words[3],gold:[...spellingData.words[4],...spellingData.words[5]]}[colour];
  const [jumbles, slips, answers] = spellingExamples[colour];
  const wordBank = detail('Need to choose words? Open your word bank', list(words));
  const activities = {
    6:['Word Bubble','<p>Pick five words. Draw a bubble around each word. Underline the tricky part and write a reminder underneath.</p><div class="spelling-model"><strong>surprise</strong><div>I need to remember the r before the p.</div></div>'],
    7:['Unjumble It','<p>Unjumble these five words. Check them, then cover and write them again.</p>'+list(jumbles)+detail('Check my words',list(answers))],
    8:['Spot the Slip','<p>Fix one spelling mistake in each word. Underline the part you fixed.</p>'+list(slips)+detail('Check my words',list(answers))],
    9:['Words in Sentences','<p>Choose five words. Write a full sentence for each and underline your spelling words.</p>'],
    10:['Beat Your First Try','<p>Pick five tricky words. Look, say, cover, write and check. Try any word you missed once more.</p>']
  };
  const [title, task] = activities[lesson];
  const chooseWords = [6, 9, 10].includes(lesson);
  const next = newLessons[lesson][1][1];
  return `<section class="card"><span class="tag ${colour}">${labels[colour]}</span><h3>${title}</h3><p class="small">Start here. Write only the words you use in this activity.</p>${task}${chooseWords ? wordBank : ''}${check(`new-spell-${lesson}-${colour}`,'I checked my spelling.')}</section><button data-go="${lesson}" data-activity="${next}">Open ${next} →</button>`;
}
const newWriting = {
  7: [
    ['Use your Lesson 5 plan. Write a title and introduce your topic.', ['Title — …','My topic is …','It matters in Aotearoa New Zealand because …']],
    ['Draft a first section about the historical event or situation. Use a heading, two facts and a sentence explaining why they matter.', ['Heading — …','In …, … happened.','One important detail was …','This mattered because …']],
    ['Start a second section about compassion. Explain who helped, what they did and who benefited.', ['Heading — …','… showed compassion by …','This helped … because …']],
    ['Reread your introduction and both sections. Add one missing detail and record where you found it.', ['Detail to add — …','Source title and page or web address — …']]
  ],
  9: [
    ['Finish your historical section. Give the reader enough detail to understand what happened, when or where it happened, and why it mattered.', ['In …, … happened.','A key detail was …','This mattered because …']],
    ['Finish your compassion section. Describe what someone did and explain the difference it made. Include at least two details from your research.', ['People showed care by …','One example was …','This helped because …']],
    ['Write a further section explaining the result, legacy or what changed next. Give it a heading and use a fact to support it.', ['Heading — …','After this, …','A fact that shows the impact is …']],
    ['Add a short ending and list your sources.', ['This report shows …','Sources — title and page or web address']]
  ],
  10: [
    ['Reread your report. Improve two sentences. Make one fact more precise and explain one idea more clearly.', ['Fact before → Fact after','Explanation before → Explanation after']],
    ['Check your facts against your sources. Ask a partner to point out one clear section and one detail they still need. Make a final edit and finish your copy.', ['Title → Introduction → Headings and facts → Ending → Sources']]
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
    `<section class="card"><h3>Finished early?</h3><p>Add a labelled timeline or image caption that helps explain your topic. Use a fact you can check in your sources.</p></section>` +
    check(`new-write-${lesson}-${colour}`,'I checked my report.') + '</section>';
}
