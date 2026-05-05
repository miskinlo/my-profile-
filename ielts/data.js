// ============================================================
// IELTS Beginner Practice — Data Bank
// ============================================================

const GRAMMAR_DATA = {
    tenses: [
        { question: "She ___ to school every day.", options: ["go", "goes", "going", "went"], answer: 1, explanation: "Use 'goes' for third person singular (she/he/it) in present simple." },
        { question: "They ___ playing football right now.", options: ["is", "are", "was", "were"], answer: 1, explanation: "'Are' is used with plural subjects (they) in present continuous." },
        { question: "I ___ my homework yesterday.", options: ["finish", "finishes", "finished", "finishing"], answer: 2, explanation: "'Finished' is the past simple form used for completed actions in the past." },
        { question: "He ___ already ___ the movie.", options: ["has/watched", "have/watched", "had/watch", "is/watching"], answer: 0, explanation: "'Has watched' — present perfect with third person singular." },
        { question: "We ___ to Paris next summer.", options: ["will travel", "traveled", "travels", "traveling"], answer: 0, explanation: "'Will travel' expresses a future plan or intention." },
        { question: "She ___ dinner when I arrived.", options: ["cooks", "cooked", "was cooking", "has cooked"], answer: 2, explanation: "Past continuous 'was cooking' describes an action in progress when another action happened." },
        { question: "The train ___ at 9 AM tomorrow.", options: ["leave", "leaves", "left", "is leaving"], answer: 1, explanation: "Present simple is used for scheduled events (timetables)." },
        { question: "I ___ English for three years.", options: ["study", "studied", "have studied", "am studying"], answer: 2, explanation: "Present perfect 'have studied' shows duration from past to present." },
        { question: "By next year, she ___ her degree.", options: ["finishes", "will finish", "will have finished", "finished"], answer: 2, explanation: "Future perfect 'will have finished' for actions completed before a future point." },
        { question: "If it rains, I ___ an umbrella.", options: ["take", "will take", "took", "would take"], answer: 1, explanation: "First conditional: If + present simple, will + base verb." },
        { question: "The children ___ in the park since morning.", options: ["play", "played", "have been playing", "are playing"], answer: 2, explanation: "Present perfect continuous for actions that started in the past and continue." },
        { question: "She ___ the piano when she was five.", options: ["learn", "learned", "has learned", "was learning"], answer: 1, explanation: "Past simple 'learned' for a completed action at a specific past time." },
        { question: "I wish I ___ harder last semester.", options: ["study", "studied", "had studied", "have studied"], answer: 2, explanation: "Past perfect 'had studied' after 'I wish' expresses regret about the past." },
        { question: "He ___ TV every evening.", options: ["watch", "watches", "watched", "is watching"], answer: 1, explanation: "'Watches' for habitual action with third person singular in present simple." },
        { question: "They ___ the project by Friday.", options: ["complete", "completed", "will have completed", "completing"], answer: 2, explanation: "Future perfect for actions that will be finished before a deadline." }
    ],
    articles: [
        { question: "I saw ___ elephant at the zoo.", options: ["a", "an", "the", "no article"], answer: 1, explanation: "'An' is used before vowel sounds. 'Elephant' starts with a vowel sound." },
        { question: "___ sun rises in the east.", options: ["A", "An", "The", "No article"], answer: 2, explanation: "'The' is used for unique things (there is only one sun)." },
        { question: "She is ___ honest person.", options: ["a", "an", "the", "no article"], answer: 1, explanation: "'An' before 'honest' because 'h' is silent, making a vowel sound." },
        { question: "I need ___ glass of water.", options: ["a", "an", "the", "no article"], answer: 0, explanation: "'A' before consonant sounds. 'Glass' starts with a consonant." },
        { question: "___ Mount Everest is the highest mountain.", options: ["A", "An", "The", "No article"], answer: 3, explanation: "No article before proper nouns of mountains." },
        { question: "He plays ___ guitar very well.", options: ["a", "an", "the", "no article"], answer: 2, explanation: "'The' is used before musical instruments." },
        { question: "I bought ___ new car last week.", options: ["a", "an", "the", "no article"], answer: 0, explanation: "'A' for non-specific singular countable noun mentioned for the first time." },
        { question: "___ water is essential for life.", options: ["A", "An", "The", "No article"], answer: 3, explanation: "No article for uncountable nouns used in a general sense." },
        { question: "Can you pass me ___ salt?", options: ["a", "an", "the", "no article"], answer: 2, explanation: "'The' when both speakers know which specific salt is being referred to." },
        { question: "She goes to ___ university in London.", options: ["a", "an", "the", "no article"], answer: 0, explanation: "'A' because 'university' starts with a /juː/ consonant sound." },
        { question: "___ Nile is the longest river in Africa.", options: ["A", "An", "The", "No article"], answer: 2, explanation: "'The' is used with rivers, oceans, and seas." },
        { question: "He is ___ best student in the class.", options: ["a", "an", "the", "no article"], answer: 2, explanation: "'The' is used with superlatives (best, worst, tallest, etc.)." },
        { question: "I had ___ egg for breakfast.", options: ["a", "an", "the", "no article"], answer: 1, explanation: "'An' before 'egg' because it starts with a vowel sound." },
        { question: "She works at ___ hospital near here.", options: ["a", "an", "the", "no article"], answer: 2, explanation: "'The' for a specific hospital that both speakers can identify." },
        { question: "___ dogs are loyal animals.", options: ["A", "An", "The", "No article"], answer: 3, explanation: "No article for plural nouns used in a general/generic sense." }
    ],
    prepositions: [
        { question: "The book is ___ the table.", options: ["in", "on", "at", "by"], answer: 1, explanation: "'On' is used for surfaces." },
        { question: "She arrived ___ Monday.", options: ["in", "on", "at", "by"], answer: 1, explanation: "'On' is used with days of the week." },
        { question: "The meeting is ___ 3 o'clock.", options: ["in", "on", "at", "by"], answer: 2, explanation: "'At' is used with specific times." },
        { question: "He lives ___ London.", options: ["in", "on", "at", "by"], answer: 0, explanation: "'In' is used with cities, countries, and large areas." },
        { question: "She is interested ___ music.", options: ["in", "on", "at", "about"], answer: 0, explanation: "'Interested in' is a fixed prepositional phrase." },
        { question: "The cat is hiding ___ the bed.", options: ["under", "on", "at", "in"], answer: 0, explanation: "'Under' means beneath or below something." },
        { question: "I was born ___ 1995.", options: ["in", "on", "at", "by"], answer: 0, explanation: "'In' is used with years, months, and seasons." },
        { question: "She is good ___ mathematics.", options: ["in", "on", "at", "for"], answer: 2, explanation: "'Good at' is the correct collocation for abilities." },
        { question: "We went ___ the cinema last night.", options: ["in", "at", "to", "on"], answer: 2, explanation: "'To' indicates direction or destination." },
        { question: "He depends ___ his parents.", options: ["in", "on", "at", "for"], answer: 1, explanation: "'Depend on' is a fixed phrasal verb." },
        { question: "The shop is ___ the corner.", options: ["in", "on", "at", "to"], answer: 2, explanation: "'At the corner' refers to a specific point/location." },
        { question: "She walked ___ the park.", options: ["through", "on", "at", "in"], answer: 0, explanation: "'Through' means from one side to the other." },
        { question: "I'm looking forward ___ the holiday.", options: ["for", "at", "to", "in"], answer: 2, explanation: "'Look forward to' is a fixed phrase meaning to anticipate with pleasure." },
        { question: "The picture is ___ the wall.", options: ["in", "on", "at", "by"], answer: 1, explanation: "'On' is used for things attached to a vertical surface." },
        { question: "He apologized ___ being late.", options: ["about", "for", "to", "at"], answer: 1, explanation: "'Apologize for' is the correct prepositional phrase." }
    ]
};

const VOCABULARY_DATA = {
    academic: [
        { word: "Analyze", phonetic: "/ˈæn.ə.laɪz/", definition: "To examine something in detail to understand it better", example: "Scientists analyze data to draw conclusions.", synonyms: ["examine", "investigate", "study"] },
        { word: "Approach", phonetic: "/əˈproʊtʃ/", definition: "A way of dealing with a situation or problem", example: "We need a new approach to solve this issue.", synonyms: ["method", "strategy", "technique"] },
        { word: "Concept", phonetic: "/ˈkɒn.sept/", definition: "An abstract idea or general notion", example: "The concept of freedom varies across cultures.", synonyms: ["idea", "notion", "theory"] },
        { word: "Significant", phonetic: "/sɪɡˈnɪf.ɪ.kənt/", definition: "Important; large enough to have an effect", example: "There was a significant improvement in her scores.", synonyms: ["important", "major", "notable"] },
        { word: "Evidence", phonetic: "/ˈev.ɪ.dəns/", definition: "Facts or information showing whether something is true", example: "The evidence supports the theory of climate change.", synonyms: ["proof", "data", "indication"] },
        { word: "Benefit", phonetic: "/ˈben.ɪ.fɪt/", definition: "An advantage or profit gained from something", example: "Regular exercise has many health benefits.", synonyms: ["advantage", "gain", "profit"] },
        { word: "Environment", phonetic: "/ɪnˈvaɪ.rən.mənt/", definition: "The surroundings or conditions in which a person lives", example: "We must protect the environment for future generations.", synonyms: ["surroundings", "habitat", "setting"] },
        { word: "Research", phonetic: "/rɪˈsɜːrtʃ/", definition: "Systematic investigation to establish facts", example: "The research was conducted over three years.", synonyms: ["study", "investigation", "inquiry"] },
        { word: "Method", phonetic: "/ˈmeθ.əd/", definition: "A particular way of doing something", example: "This teaching method is very effective.", synonyms: ["technique", "procedure", "system"] },
        { word: "Structure", phonetic: "/ˈstrʌk.tʃər/", definition: "The arrangement of parts in something complex", example: "The structure of the essay needs improvement.", synonyms: ["framework", "organization", "arrangement"] },
        { word: "Process", phonetic: "/ˈprɒs.es/", definition: "A series of actions or steps to achieve something", example: "The application process takes about two weeks.", synonyms: ["procedure", "system", "operation"] },
        { word: "Establish", phonetic: "/ɪˈstæb.lɪʃ/", definition: "To set up on a permanent basis", example: "The company was established in 1990.", synonyms: ["found", "create", "set up"] }
    ],
    everyday: [
        { word: "Accommodation", phonetic: "/əˌkɒm.əˈdeɪ.ʃən/", definition: "A place to live, work, or stay in", example: "We need to find accommodation near the university.", synonyms: ["housing", "lodging", "residence"] },
        { word: "Appointment", phonetic: "/əˈpɔɪnt.mənt/", definition: "A formal arrangement to meet someone", example: "I have a dentist appointment at 2 PM.", synonyms: ["meeting", "date", "engagement"] },
        { word: "Available", phonetic: "/əˈveɪ.lə.bəl/", definition: "Able to be used or obtained; free", example: "Is this seat available?", synonyms: ["free", "accessible", "obtainable"] },
        { word: "Convenient", phonetic: "/kənˈviː.ni.ənt/", definition: "Fitting in well with needs; easy to use", example: "Is Thursday convenient for you?", synonyms: ["suitable", "handy", "practical"] },
        { word: "Definitely", phonetic: "/ˈdef.ɪ.nət.li/", definition: "Without any doubt; certainly", example: "I will definitely be there on time.", synonyms: ["certainly", "surely", "absolutely"] },
        { word: "Essential", phonetic: "/ɪˈsen.ʃəl/", definition: "Absolutely necessary; extremely important", example: "Water is essential for survival.", synonyms: ["vital", "crucial", "necessary"] },
        { word: "Familiar", phonetic: "/fəˈmɪl.i.ər/", definition: "Well known from long or close association", example: "This area looks familiar to me.", synonyms: ["known", "recognized", "common"] },
        { word: "Gradually", phonetic: "/ˈɡrædʒ.u.ə.li/", definition: "In a gradual way; slowly", example: "Her English is gradually improving.", synonyms: ["slowly", "steadily", "progressively"] },
        { word: "Immediately", phonetic: "/ɪˈmiː.di.ət.li/", definition: "At once; without delay", example: "Please respond immediately.", synonyms: ["instantly", "right away", "promptly"] },
        { word: "Opportunity", phonetic: "/ˌɒp.əˈtjuː.nə.ti/", definition: "A chance for advancement or progress", example: "This job is a great opportunity.", synonyms: ["chance", "prospect", "opening"] },
        { word: "Recommend", phonetic: "/ˌrek.əˈmend/", definition: "To suggest as good or suitable", example: "I recommend this restaurant for dinner.", synonyms: ["suggest", "advise", "endorse"] },
        { word: "Schedule", phonetic: "/ˈʃed.juːl/", definition: "A plan for carrying out activities", example: "What's your schedule for tomorrow?", synonyms: ["timetable", "plan", "agenda"] }
    ],
    "ielts-common": [
        { word: "Approximately", phonetic: "/əˈprɒk.sɪ.mət.li/", definition: "Close to an exact amount but not completely accurate", example: "Approximately 60% of students passed the exam.", synonyms: ["about", "roughly", "around"] },
        { word: "Contribute", phonetic: "/kənˈtrɪb.juːt/", definition: "To give in order to help achieve something", example: "Everyone should contribute to the discussion.", synonyms: ["give", "provide", "add"] },
        { word: "Demonstrate", phonetic: "/ˈdem.ən.streɪt/", definition: "To show clearly that something exists or is true", example: "The results demonstrate a clear pattern.", synonyms: ["show", "prove", "illustrate"] },
        { word: "Furthermore", phonetic: "/ˌfɜːðəˈmɔːr/", definition: "In addition to what has already been said", example: "The plan is effective. Furthermore, it's affordable.", synonyms: ["moreover", "additionally", "also"] },
        { word: "Illustrate", phonetic: "/ˈɪl.ə.streɪt/", definition: "To explain or make something clear by examples", example: "This chart illustrates the growth in population.", synonyms: ["demonstrate", "show", "explain"] },
        { word: "Majority", phonetic: "/məˈdʒɒr.ə.ti/", definition: "The greater number; more than half", example: "The majority of people support this policy.", synonyms: ["most", "bulk", "greater part"] },
        { word: "Nevertheless", phonetic: "/ˌnev.ə.ðəˈles/", definition: "In spite of that; however", example: "It was raining; nevertheless, we went hiking.", synonyms: ["however", "nonetheless", "still"] },
        { word: "Participate", phonetic: "/pɑːˈtɪs.ɪ.peɪt/", definition: "To take part in an activity or event", example: "All students must participate in the discussion.", synonyms: ["join", "take part", "engage"] },
        { word: "Relevant", phonetic: "/ˈrel.ə.vənt/", definition: "Closely connected to the matter at hand", example: "Please include only relevant information.", synonyms: ["applicable", "pertinent", "related"] },
        { word: "Subsequently", phonetic: "/ˈsʌb.sɪ.kwənt.li/", definition: "After a particular thing has happened", example: "He studied hard and subsequently passed the exam.", synonyms: ["afterwards", "later", "then"] },
        { word: "Tendency", phonetic: "/ˈten.dən.si/", definition: "An inclination towards a particular behavior", example: "There is a tendency for prices to increase.", synonyms: ["inclination", "trend", "pattern"] },
        { word: "Whereas", phonetic: "/weərˈæz/", definition: "In contrast or comparison with the fact that", example: "He likes tea, whereas she prefers coffee.", synonyms: ["while", "although", "but"] }
    ]
};

const LISTENING_DATA = [
    {
        title: "Hotel Booking",
        context: "A woman calls a hotel to make a reservation for her holiday.",
        conversation: [
            { speaker: "Receptionist", text: "Good morning, Grand Hotel. How can I help you?" },
            { speaker: "Woman", text: "Hello, I'd like to book a room for next week, please." },
            { speaker: "Receptionist", text: "Certainly. What dates are you looking at?" },
            { speaker: "Woman", text: "From Monday the 15th to Friday the 19th. That's four nights." },
            { speaker: "Receptionist", text: "Let me check availability. Would you prefer a single or double room?" },
            { speaker: "Woman", text: "A double room, please. Does it have a sea view?" },
            { speaker: "Receptionist", text: "Yes, we have a double room with sea view available. It's £95 per night." },
            { speaker: "Woman", text: "That sounds fine. Does it include breakfast?" },
            { speaker: "Receptionist", text: "Yes, a full English breakfast is included. Can I take your name, please?" },
            { speaker: "Woman", text: "Yes, it's Sarah Mitchell. That's M-I-T-C-H-E-L-L." },
            { speaker: "Receptionist", text: "Thank you, Ms. Mitchell. And a contact number?" },
            { speaker: "Woman", text: "It's 07745 332198." },
            { speaker: "Receptionist", text: "Perfect. Would you like to add airport transfer? It's £30 each way." },
            { speaker: "Woman", text: "Yes, please. Just from the airport to the hotel on Monday." },
            { speaker: "Receptionist", text: "Noted. Your total comes to £410 — that's four nights plus one airport transfer. Shall I send confirmation to your email?" },
            { speaker: "Woman", text: "Yes, please. It's sarah.mitchell@email.com." }
        ],
        questions: [
            { question: "How many nights will the woman stay?", options: ["Three", "Four", "Five", "Six"], answer: 1 },
            { question: "What type of room did she book?", options: ["Single with garden view", "Double with sea view", "Single with sea view", "Double with garden view"], answer: 1 },
            { question: "How much is the room per night?", options: ["£85", "£90", "£95", "£100"], answer: 2 },
            { question: "What is the woman's surname?", options: ["Marshal", "Mitchell", "Michael", "Mitchel"], answer: 1 },
            { question: "What is the total cost?", options: ["£380", "£400", "£410", "£420"], answer: 2 }
        ]
    },
    {
        title: "Course Enrollment",
        context: "A student calls a language school to ask about English courses.",
        conversation: [
            { speaker: "Admin", text: "Hello, City Language Centre. How may I help you?" },
            { speaker: "Student", text: "Hi, I'm interested in enrolling in an English course. Could you tell me what's available?" },
            { speaker: "Admin", text: "Of course! We have three levels: beginner, intermediate, and advanced. Which level are you looking for?" },
            { speaker: "Student", text: "I think intermediate would be best for me. When does it start?" },
            { speaker: "Admin", text: "The next intermediate course starts on September 5th. Classes are Monday, Wednesday, and Friday." },
            { speaker: "Student", text: "What time are the classes?" },
            { speaker: "Admin", text: "You can choose morning sessions from 9 to 11, or evening sessions from 6 to 8." },
            { speaker: "Student", text: "The evening class would work better for me. How long is the course?" },
            { speaker: "Admin", text: "It's 12 weeks. The fee is £450 for the full course, which includes all materials." },
            { speaker: "Student", text: "Is there a placement test?" },
            { speaker: "Admin", text: "Yes, you'll need to take a short placement test. It's free and takes about 30 minutes." },
            { speaker: "Student", text: "Great. How many students are in each class?" },
            { speaker: "Admin", text: "Maximum 15 students per class. We keep groups small for better interaction." },
            { speaker: "Student", text: "That sounds perfect. Can I register today?" },
            { speaker: "Admin", text: "Absolutely! I just need your full name and email address." },
            { speaker: "Student", text: "My name is David Chen, and my email is d.chen@gmail.com." }
        ],
        questions: [
            { question: "What level course is the student interested in?", options: ["Beginner", "Intermediate", "Advanced", "Pre-intermediate"], answer: 1 },
            { question: "When does the course start?", options: ["September 1st", "September 5th", "September 10th", "September 15th"], answer: 1 },
            { question: "What time is the evening class?", options: ["5 to 7", "6 to 8", "7 to 9", "5 to 8"], answer: 1 },
            { question: "How much does the course cost?", options: ["£350", "£400", "£450", "£500"], answer: 2 },
            { question: "What is the maximum class size?", options: ["10", "12", "15", "20"], answer: 2 }
        ]
    },
    {
        title: "Car Rental",
        context: "A man calls a car rental company to hire a car for the weekend.",
        conversation: [
            { speaker: "Agent", text: "Quick Drive Car Rentals, good afternoon. How can I help?" },
            { speaker: "Man", text: "Hi, I need to rent a car for this weekend. From Saturday morning to Sunday evening." },
            { speaker: "Agent", text: "No problem. What size car are you looking for?" },
            { speaker: "Man", text: "Something medium-sized. I'll be driving with my family — two adults and two children." },
            { speaker: "Agent", text: "I'd suggest our Toyota Corolla or similar. That's £45 per day, so £90 for two days." },
            { speaker: "Man", text: "Does that include insurance?" },
            { speaker: "Agent", text: "Basic insurance is included. Full coverage is an extra £15 per day." },
            { speaker: "Man", text: "I'll take the full coverage. Do I need to pick it up from your office?" },
            { speaker: "Agent", text: "We have two locations — the city centre on Park Street, and the airport branch." },
            { speaker: "Man", text: "The city centre would be closer for me. What time can I collect it?" },
            { speaker: "Agent", text: "We open at 8 AM on Saturday. You'll need your driving licence and a credit card." },
            { speaker: "Man", text: "Perfect. Is there a mileage limit?" },
            { speaker: "Agent", text: "You get 200 miles free per day. After that, it's 25p per mile." },
            { speaker: "Man", text: "That should be plenty. I'll book it then." },
            { speaker: "Agent", text: "Great. Can I have your name please?" },
            { speaker: "Man", text: "James Patterson. P-A-T-T-E-R-S-O-N." }
        ],
        questions: [
            { question: "How long will he rent the car?", options: ["One day", "Two days", "Three days", "One week"], answer: 1 },
            { question: "How much is the basic rental per day?", options: ["£35", "£40", "£45", "£50"], answer: 2 },
            { question: "Where will he collect the car?", options: ["Airport", "City centre", "Train station", "His home"], answer: 1 },
            { question: "What is the free mileage limit per day?", options: ["100 miles", "150 miles", "200 miles", "250 miles"], answer: 2 },
            { question: "What does he need to bring?", options: ["Passport and cash", "Driving licence and credit card", "ID card and debit card", "Passport and credit card"], answer: 1 }
        ]
    },
    {
        title: "Doctor Appointment",
        context: "A patient calls a medical centre to book an appointment.",
        conversation: [
            { speaker: "Receptionist", text: "Greenfield Medical Centre, good morning." },
            { speaker: "Patient", text: "Hello, I'd like to make an appointment with a doctor, please." },
            { speaker: "Receptionist", text: "Is this urgent or a routine check-up?" },
            { speaker: "Patient", text: "I've had a bad cough for about a week now, so I think I should see someone." },
            { speaker: "Receptionist", text: "I see. Dr. Williams has an opening tomorrow at 10:30 AM. Would that work?" },
            { speaker: "Patient", text: "Is there anything available today?" },
            { speaker: "Receptionist", text: "Let me check... Yes, Dr. Patel can see you at 4:15 this afternoon." },
            { speaker: "Patient", text: "That's perfect. I'll take that one." },
            { speaker: "Receptionist", text: "Are you registered with us? Can I have your name?" },
            { speaker: "Patient", text: "Yes, I am. My name is Robert Hughes. H-U-G-H-E-S." },
            { speaker: "Receptionist", text: "Ah yes, I have your file. Date of birth?" },
            { speaker: "Patient", text: "March 22nd, 1988." },
            { speaker: "Receptionist", text: "Perfect. Please arrive 10 minutes early and bring your health card." },
            { speaker: "Patient", text: "Will do. Is the parking still free?" },
            { speaker: "Receptionist", text: "Yes, we have free parking at the back of the building. See you at 4:15." }
        ],
        questions: [
            { question: "What is the patient's main problem?", options: ["Headache", "Bad cough", "Back pain", "Fever"], answer: 1 },
            { question: "What time is the appointment?", options: ["10:30 AM", "2:15 PM", "4:15 PM", "5:00 PM"], answer: 2 },
            { question: "Which doctor will the patient see?", options: ["Dr. Williams", "Dr. Patel", "Dr. Hughes", "Dr. Green"], answer: 1 },
            { question: "When should the patient arrive?", options: ["On time", "5 minutes early", "10 minutes early", "15 minutes early"], answer: 2 },
            { question: "Where is the parking?", options: ["In front", "At the back", "Across the street", "Underground"], answer: 1 }
        ]
    },
    {
        title: "Delivery Service",
        context: "A customer calls about a package delivery issue.",
        conversation: [
            { speaker: "Operator", text: "Express Delivery Services, this is Tom speaking." },
            { speaker: "Customer", text: "Hi Tom. I'm calling about a parcel I was expecting yesterday. It didn't arrive." },
            { speaker: "Operator", text: "I'm sorry about that. Can I have your tracking number?" },
            { speaker: "Customer", text: "Yes, it's ED-7742-UK." },
            { speaker: "Operator", text: "Let me look that up... Okay, I can see the package. It says delivery was attempted at 2:30 PM but no one was home." },
            { speaker: "Customer", text: "Oh, I was definitely home all day! Maybe they went to the wrong address?" },
            { speaker: "Operator", text: "Your address on file is 45 Oak Avenue, isn't it?" },
            { speaker: "Customer", text: "No! It's 54 Oak Avenue. There must be a mistake." },
            { speaker: "Operator", text: "Ah, I see the error. I do apologize. I'll arrange redelivery to 54 Oak Avenue." },
            { speaker: "Customer", text: "When will it come?" },
            { speaker: "Operator", text: "I can schedule it for tomorrow between 9 AM and 1 PM. Would that be okay?" },
            { speaker: "Customer", text: "Yes, that works. I'll make sure I'm home." },
            { speaker: "Operator", text: "If you're not home, would you like us to leave it with a neighbor?" },
            { speaker: "Customer", text: "Yes, you can leave it with number 56. That's my neighbor Mrs. Bradley." },
            { speaker: "Operator", text: "Noted. Is there anything else I can help with?" },
            { speaker: "Customer", text: "No, that's all. Thank you for sorting it out." }
        ],
        questions: [
            { question: "What is the tracking number?", options: ["ED-7742-UK", "ED-7724-UK", "ED-7742-US", "ED-7744-UK"], answer: 0 },
            { question: "What was the problem with the delivery?", options: ["Package was damaged", "Wrong address", "Package was lost", "Driver was late"], answer: 1 },
            { question: "What is the correct address?", options: ["45 Oak Avenue", "54 Oak Avenue", "54 Oak Street", "45 Oak Street"], answer: 1 },
            { question: "When is the redelivery scheduled?", options: ["Today afternoon", "Tomorrow 9 AM-1 PM", "Tomorrow 1 PM-5 PM", "Next Monday"], answer: 1 },
            { question: "Where can the package be left if no one is home?", options: ["At the post office", "In the garden", "With neighbor at number 56", "At the local shop"], answer: 2 }
        ]
    }
];

const READING_DATA = [
    {
        title: "The Impact of Smartphones on Daily Life",
        passage: `<p>Smartphones have become an essential part of modern life. Since the introduction of the first iPhone in 2007, these devices have transformed how people communicate, work, and entertain themselves. Today, approximately 6.8 billion people worldwide own a smartphone, representing about 85% of the global population.</p>

<p>One of the most significant changes brought by smartphones is in communication. People no longer rely solely on phone calls or face-to-face meetings. Instead, they use messaging apps, video calls, and social media platforms to stay connected with friends, family, and colleagues across the globe. Research shows that the average person checks their phone 96 times per day — roughly once every 10 minutes during waking hours.</p>

<p>In the workplace, smartphones have enabled greater flexibility. Many employees can now work remotely, access important documents on the go, and respond to emails outside traditional office hours. However, this constant connectivity has raised concerns about work-life balance. Studies indicate that 60% of workers feel unable to fully disconnect from their jobs due to smartphone notifications.</p>

<p>The impact on education has been equally profound. Students can access educational resources, watch tutorial videos, and participate in online courses through their phones. Language learning apps, for instance, have made it possible for millions of people to study new languages at their own pace without attending formal classes.</p>

<p>Despite these benefits, health experts have expressed concerns about excessive smartphone use. Problems such as poor sleep quality, reduced attention span, eye strain, and decreased physical activity have all been linked to heavy phone usage. The blue light emitted by screens can disrupt the body's natural sleep cycle, leading to insomnia and fatigue.</p>

<p>Looking ahead, smartphones will continue to evolve. Features like artificial intelligence assistants, augmented reality, and improved health monitoring are expected to make these devices even more central to daily routines. The challenge for society will be finding a healthy balance between the convenience of technology and the need for genuine human connection.</p>`,
        questions: [
            { question: "When was the first iPhone introduced?", type: "mcq", options: ["2005", "2006", "2007", "2008"], answer: 2 },
            { question: "What percentage of the global population owns a smartphone?", type: "mcq", options: ["75%", "80%", "85%", "90%"], answer: 2 },
            { question: "How many times does the average person check their phone per day?", type: "mcq", options: ["56 times", "76 times", "96 times", "116 times"], answer: 2 },
            { question: "What percentage of workers feel unable to disconnect from their jobs?", type: "mcq", options: ["40%", "50%", "60%", "70%"], answer: 2 },
            { question: "According to the passage, which is NOT mentioned as a health concern?", type: "mcq", options: ["Poor sleep quality", "Hearing loss", "Eye strain", "Reduced attention span"], answer: 1 },
            { question: "The passage suggests that smartphones have made work:", type: "mcq", options: ["Less productive", "More flexible but harder to disconnect", "Only possible in offices", "Completely remote for everyone"], answer: 1 }
        ]
    },
    {
        title: "Climate Change and Its Effects on Wildlife",
        passage: `<p>Climate change is one of the most pressing environmental challenges of our time. As global temperatures continue to rise, wildlife around the world is being forced to adapt, migrate, or face extinction. Scientists estimate that if current trends continue, one in six species could be at risk of extinction by the end of the century.</p>

<p>One of the most visible effects of climate change on wildlife is the loss of habitat. Polar bears, for example, depend on Arctic sea ice for hunting seals. As temperatures rise and ice melts earlier each year, polar bears must swim longer distances to find food, leading to exhaustion and, in some cases, drowning. The Arctic has lost approximately 40% of its summer sea ice since 1979.</p>

<p>Coral reefs, often called the "rainforests of the sea," are also severely affected. When ocean temperatures rise even slightly — by just 1 to 2 degrees Celsius — corals expel the algae living in their tissues, causing them to turn white in a process known as bleaching. Without these algae, corals cannot get enough nutrients and eventually die. The Great Barrier Reef has experienced several mass bleaching events in recent years.</p>

<p>Bird migration patterns have also been disrupted. Many species now arrive at their breeding grounds earlier in spring, but the insects and plants they depend on may not have adjusted their timing accordingly. This mismatch between predators and prey — known as "phenological mismatch" — can lead to declining populations.</p>

<p>On land, forests are experiencing changes too. Warmer temperatures have allowed bark beetles to survive winters that once kept their populations in check. These beetles have destroyed millions of hectares of forest in North America, affecting not only the trees but also the countless species that depend on forest ecosystems.</p>

<p>Conservation efforts are underway worldwide. Protected areas are being expanded, wildlife corridors are being created to allow animals to move between habitats, and breeding programs are helping endangered species recover. However, experts agree that reducing greenhouse gas emissions remains the most critical step in protecting global biodiversity.</p>`,
        questions: [
            { question: "What fraction of species could face extinction if current trends continue?", type: "mcq", options: ["One in four", "One in five", "One in six", "One in ten"], answer: 2 },
            { question: "How much summer sea ice has the Arctic lost since 1979?", type: "mcq", options: ["20%", "30%", "40%", "50%"], answer: 2 },
            { question: "What causes coral bleaching?", type: "mcq", options: ["Pollution from ships", "Rising ocean temperatures", "Overfishing", "Strong ocean currents"], answer: 1 },
            { question: "What is 'phenological mismatch'?", type: "mcq", options: ["When animals cannot find mates", "When predators and prey timing don't align", "When birds fly to wrong locations", "When plants grow too fast"], answer: 1 },
            { question: "What has allowed bark beetles to thrive?", type: "mcq", options: ["More rainfall", "Less competition", "Warmer winters", "More forests"], answer: 2 },
            { question: "According to the passage, what is the most critical conservation step?", type: "mcq", options: ["Creating wildlife corridors", "Expanding protected areas", "Reducing greenhouse gas emissions", "Breeding programs"], answer: 2 }
        ]
    },
    {
        title: "The History and Benefits of Public Libraries",
        passage: `<p>Public libraries have served communities for centuries, evolving from exclusive collections for the wealthy into inclusive spaces open to all. The first truly public library in the English-speaking world opened in Manchester, England, in 1653. Today, there are more than 300,000 public libraries worldwide, serving billions of people each year.</p>

<p>The modern public library offers far more than just books. While lending books remains a core function — with the average library holding between 50,000 and 100,000 volumes — libraries now provide internet access, digital media, community meeting spaces, children's programs, and adult education courses. Many libraries also offer job search assistance, language classes, and technology training.</p>

<p>Research has consistently shown that access to public libraries correlates with higher literacy rates and better educational outcomes. A study conducted across 20 countries found that children who regularly used libraries scored 10 to 15 percent higher on reading assessments than those who did not. For adults, library access has been linked to improved employment prospects and greater civic engagement.</p>

<p>The digital age has not diminished the importance of libraries — rather, it has expanded their role. Libraries now provide free access to electronic books, audiobooks, and online databases that would otherwise cost individuals hundreds or thousands of dollars per year. They also serve as vital technology hubs in communities where many residents cannot afford home internet connections.</p>

<p>Libraries also play a crucial social role. They are among the few remaining public spaces where people can spend time without being required to purchase anything. For homeless individuals, new immigrants, elderly residents, and students, libraries provide warmth, safety, and resources. During emergencies and natural disasters, libraries often serve as information centres and community gathering points.</p>

<p>Despite their proven value, many libraries face funding challenges. Budget cuts have forced some to reduce hours, lay off staff, or close branches entirely. Library advocates argue that every dollar invested in public libraries returns between four and six dollars in community benefits, making them one of the most cost-effective public investments available.</p>`,
        questions: [
            { question: "When did the first truly public library open in the English-speaking world?", type: "mcq", options: ["1553", "1653", "1753", "1853"], answer: 1 },
            { question: "How many public libraries exist worldwide?", type: "mcq", options: ["More than 100,000", "More than 200,000", "More than 300,000", "More than 400,000"], answer: 2 },
            { question: "By how much did regular library users score higher on reading assessments?", type: "mcq", options: ["5-10%", "10-15%", "15-20%", "20-25%"], answer: 1 },
            { question: "According to the passage, libraries serve all of the following groups EXCEPT:", type: "mcq", options: ["Homeless individuals", "New immigrants", "Business executives specifically", "Elderly residents"], answer: 2 },
            { question: "How much return does every dollar invested in libraries generate?", type: "mcq", options: ["$2-3", "$3-4", "$4-6", "$6-8"], answer: 2 },
            { question: "The passage suggests that the digital age has:", type: "mcq", options: ["Made libraries less important", "Had no effect on libraries", "Expanded libraries' role", "Replaced libraries entirely"], answer: 2 }
        ]
    }
];

// Recommendation engine data
const RECOMMENDATION_RULES = {
    grammar: {
        low: { threshold: 50, message: "Your grammar needs more practice. Focus on {category} — try taking more quizzes in this area.", priority: "high" },
        medium: { threshold: 75, message: "Good progress on grammar! Continue practicing {category} to solidify your knowledge.", priority: "medium" },
        high: { threshold: 100, message: "Excellent grammar skills! Try moving to more advanced exercises.", priority: "low" }
    },
    vocabulary: {
        low: { threshold: 10, message: "Build your vocabulary by reviewing flashcards daily. Aim for 5 new words each day.", priority: "high" },
        medium: { threshold: 30, message: "Your vocabulary is growing! Keep reviewing and try using new words in sentences.", priority: "medium" },
        high: { threshold: 100, message: "Great vocabulary base! Focus on academic and IELTS-specific terms.", priority: "low" }
    },
    listening: {
        low: { threshold: 50, message: "Practice listening daily. Start with slower conversations and work up to normal speed.", priority: "high" },
        medium: { threshold: 75, message: "Your listening is improving! Try listening without the transcript first.", priority: "medium" },
        high: { threshold: 100, message: "Strong listening skills! Challenge yourself with longer and faster conversations.", priority: "low" }
    },
    reading: {
        low: { threshold: 50, message: "Read passages carefully and practice skimming for main ideas. Time yourself to build speed.", priority: "high" },
        medium: { threshold: 75, message: "Good reading comprehension! Work on answering questions faster.", priority: "medium" },
        high: { threshold: 100, message: "Excellent reading skills! Try more complex academic texts.", priority: "low" }
    }
};
