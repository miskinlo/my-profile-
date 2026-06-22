// ============================================================
// IELTS Beginner Practice — Main Application
// ============================================================

// State
let state = {
    currentSection: 'dashboard',
    grammar: { category: 'tenses', currentQ: 0, answers: [], timer: null, seconds: 0, quizActive: false },
    vocabulary: { category: 'academic', currentIndex: 0, flipped: false, learned: [], reviewing: [] },
    listening: { currentScenario: null, conversationIndex: 0, playing: false, speed: 'slow', answers: {} },
    reading: { currentPassage: null, startTime: null, timerInterval: null, answers: {} }
};

// ============================================================
// NAVIGATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    setupNavigation();
    setupCategoryButtons();
    updateDashboard();
});

function setupNavigation() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateTo(section);
        });
    });

    const toggle = document.querySelector('.nav-toggle');
    toggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('open');
    });
}

function navigateTo(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

    document.getElementById(section).classList.add('active');
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    document.querySelector('.nav-links').classList.remove('open');

    state.currentSection = section;

    if (section === 'dashboard') updateDashboard();
    if (section === 'scores') updateScoresPage();
}

// ============================================================
// LOCAL STORAGE
// ============================================================

function loadProgress() {
    const saved = localStorage.getItem('ielts_progress');
    if (saved) {
        const data = JSON.parse(saved);
        state.vocabulary.learned = data.vocabLearned || [];
        state.vocabulary.reviewing = data.vocabReviewing || [];
    }
}

function getScores() {
    return JSON.parse(localStorage.getItem('ielts_scores') || '{"grammar":[],"listening":[],"reading":[],"vocabulary":{"learned":0}}');
}

function saveScore(type, score, details) {
    const scores = getScores();
    if (!scores[type]) scores[type] = [];

    const entry = {
        score,
        date: new Date().toISOString(),
        details: details || {}
    };

    if (type === 'vocabulary') {
        scores.vocabulary.learned = state.vocabulary.learned.length;
    } else {
        scores[type].push(entry);
    }

    localStorage.setItem('ielts_scores', JSON.stringify(scores));
    updateStreak();
}

function saveVocabProgress() {
    const data = {
        vocabLearned: state.vocabulary.learned,
        vocabReviewing: state.vocabulary.reviewing
    };
    localStorage.setItem('ielts_progress', JSON.stringify(data));
}

function updateStreak() {
    const streakData = JSON.parse(localStorage.getItem('ielts_streak') || '{"lastDate":null,"count":0}');
    const today = new Date().toDateString();

    if (streakData.lastDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (streakData.lastDate === yesterday) {
        streakData.count++;
    } else if (streakData.lastDate !== today) {
        streakData.count = 1;
    }

    streakData.lastDate = today;
    localStorage.setItem('ielts_streak', JSON.stringify(streakData));
}

function getStreak() {
    const streakData = JSON.parse(localStorage.getItem('ielts_streak') || '{"lastDate":null,"count":0}');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (streakData.lastDate !== today && streakData.lastDate !== yesterday) {
        return 0;
    }
    return streakData.count;
}

// ============================================================
// DASHBOARD
// ============================================================

function updateDashboard() {
    const scores = getScores();

    const totalQuizzes = (scores.grammar?.length || 0) + (scores.listening?.length || 0) + (scores.reading?.length || 0);
    document.getElementById('total-quizzes').textContent = totalQuizzes;

    const allScores = [...(scores.grammar || []), ...(scores.listening || []), ...(scores.reading || [])].map(s => s.score);
    const avg = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;
    document.getElementById('avg-score').textContent = avg + '%';

    document.getElementById('streak-days').textContent = getStreak();
    document.getElementById('words-learned').textContent = state.vocabulary.learned.length;

    updateWeeklyChart();
    updateRecommendations();
}

function updateWeeklyChart() {
    const scores = getScores();
    const allEntries = [...(scores.grammar || []), ...(scores.listening || []), ...(scores.reading || [])];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - mondayOffset);
    monday.setHours(0, 0, 0, 0);

    const chartDays = document.querySelectorAll('.chart-day');
    chartDays.forEach((dayEl, i) => {
        const dayStart = new Date(monday);
        dayStart.setDate(monday.getDate() + i);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);

        const dayScores = allEntries.filter(e => {
            const d = new Date(e.date);
            return d >= dayStart && d < dayEnd;
        });

        const avgScore = dayScores.length > 0
            ? Math.round(dayScores.reduce((a, b) => a + b.score, 0) / dayScores.length)
            : 0;

        const fill = dayEl.querySelector('.bar-fill');
        fill.style.height = avgScore + '%';
        fill.style.background = avgScore > 70 ? 'var(--success)' : avgScore > 40 ? 'var(--warning)' : 'var(--primary)';
    });
}

function updateRecommendations() {
    const scores = getScores();
    const recommendations = [];

    // Grammar recommendations
    const grammarScores = scores.grammar || [];
    if (grammarScores.length === 0) {
        recommendations.push({ icon: '📝', title: 'Start Grammar Practice', text: 'Take your first grammar quiz to assess your level.', action: 'grammar' });
    } else {
        const recentGrammar = grammarScores.slice(-5);
        const avgGrammar = recentGrammar.reduce((a, b) => a + b.score, 0) / recentGrammar.length;

        // Check weakest category
        const categoryScores = {};
        grammarScores.forEach(s => {
            if (s.details && s.details.category) {
                if (!categoryScores[s.details.category]) categoryScores[s.details.category] = [];
                categoryScores[s.details.category].push(s.score);
            }
        });

        let weakest = null;
        let weakestAvg = 100;
        Object.entries(categoryScores).forEach(([cat, catScores]) => {
            const avg = catScores.reduce((a, b) => a + b, 0) / catScores.length;
            if (avg < weakestAvg) { weakestAvg = avg; weakest = cat; }
        });

        if (avgGrammar < 50) {
            recommendations.push({ icon: '⚠️', title: 'Focus on Grammar', text: `Your grammar score is ${Math.round(avgGrammar)}%. Practice ${weakest || 'tenses'} more.`, action: 'grammar', priority: 'high' });
        } else if (avgGrammar < 75) {
            recommendations.push({ icon: '📈', title: 'Improve Grammar', text: `Good progress! Work on ${weakest || 'prepositions'} to reach 75%+.`, action: 'grammar', priority: 'medium' });
        }
    }

    // Vocabulary recommendations
    if (state.vocabulary.learned.length < 10) {
        recommendations.push({ icon: '📚', title: 'Build Vocabulary', text: 'Learn at least 10 new words. Use flashcards daily!', action: 'vocabulary' });
    } else if (state.vocabulary.learned.length < 25) {
        recommendations.push({ icon: '📖', title: 'Expand Vocabulary', text: `You know ${state.vocabulary.learned.length} words. Aim for 25+!`, action: 'vocabulary', priority: 'medium' });
    }

    // Listening recommendations
    const listeningScores = scores.listening || [];
    if (listeningScores.length === 0) {
        recommendations.push({ icon: '🎧', title: 'Try Listening Practice', text: 'Practice IELTS Section 1 conversations to improve comprehension.', action: 'listening' });
    } else {
        const avgListening = listeningScores.slice(-3).reduce((a, b) => a + b.score, 0) / Math.min(listeningScores.length, 3);
        if (avgListening < 60) {
            recommendations.push({ icon: '🎧', title: 'More Listening Practice', text: 'Try slower speed and use transcripts to build understanding.', action: 'listening', priority: 'high' });
        }
    }

    // Reading recommendations
    const readingScores = scores.reading || [];
    if (readingScores.length === 0) {
        recommendations.push({ icon: '📖', title: 'Start Reading Practice', text: 'Read IELTS-style passages to build comprehension and speed.', action: 'reading' });
    } else {
        const avgReading = readingScores.slice(-3).reduce((a, b) => a + b.score, 0) / Math.min(readingScores.length, 3);
        if (avgReading < 60) {
            recommendations.push({ icon: '📖', title: 'Improve Reading', text: 'Practice skimming and scanning techniques for better scores.', action: 'reading', priority: 'high' });
        }
    }

    // Render recommendations
    const container = document.getElementById('recommendations-list');
    if (recommendations.length === 0) {
        container.innerHTML = '<div class="recommendation-card"><div class="rec-icon">🎉</div><div class="rec-content"><h3>Great Job!</h3><p>Keep practicing regularly to maintain your progress.</p></div></div>';
    } else {
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card ${rec.priority || ''}">
                <div class="rec-icon">${rec.icon}</div>
                <div class="rec-content">
                    <h3>${rec.title}</h3>
                    <p>${rec.text}</p>
                </div>
                <button class="btn-primary btn-sm" onclick="navigateTo('${rec.action}')">Practice</button>
            </div>
        `).join('');
    }
}

// ============================================================
// GRAMMAR QUIZ
// ============================================================

function setupCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.grammar.category = btn.dataset.category;
            startGrammarQuiz();
        });
    });

    document.querySelectorAll('.vocab-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.vocab-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.vocabulary.category = btn.dataset.vocab;
            state.vocabulary.currentIndex = 0;
            state.vocabulary.flipped = false;
            loadFlashcard();
        });
    });

    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadListeningScenario(parseInt(btn.dataset.scenario));
        });
    });

    document.querySelectorAll('.reading-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.reading-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadReadingPassage(parseInt(btn.dataset.passage));
        });
    });
}

function startGrammarQuiz() {
    const category = state.grammar.category;
    const questions = GRAMMAR_DATA[category];

    state.grammar.currentQ = 0;
    state.grammar.answers = [];
    state.grammar.quizActive = true;
    state.grammar.seconds = 0;

    document.getElementById('grammar-quiz').classList.remove('hidden');
    document.getElementById('grammar-result').classList.add('hidden');
    document.getElementById('grammar-total-questions').textContent = questions.length;

    startTimer('grammar');
    showGrammarQuestion();
}

function showGrammarQuestion() {
    const category = state.grammar.category;
    const questions = GRAMMAR_DATA[category];
    const q = questions[state.grammar.currentQ];

    document.getElementById('grammar-question-num').textContent = state.grammar.currentQ + 1;
    document.getElementById('grammar-question').innerHTML = `<p class="question-text">${q.question}</p>`;

    const optionsHtml = q.options.map((opt, i) => `
        <button class="option-btn" onclick="selectGrammarOption(${i})" data-index="${i}">
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            <span class="option-text">${opt}</span>
        </button>
    `).join('');

    document.getElementById('grammar-options').innerHTML = optionsHtml;
    document.getElementById('grammar-next').disabled = true;
    document.getElementById('grammar-skip').disabled = false;
}

function selectGrammarOption(index) {
    if (!state.grammar.quizActive) return;

    const category = state.grammar.category;
    const questions = GRAMMAR_DATA[category];
    const q = questions[state.grammar.currentQ];

    document.querySelectorAll('#grammar-options .option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = true;
    });

    const selectedBtn = document.querySelector(`#grammar-options [data-index="${index}"]`);
    const correctBtn = document.querySelector(`#grammar-options [data-index="${q.answer}"]`);

    if (index === q.answer) {
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
        correctBtn.classList.add('correct');
    }

    // Show explanation
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.innerHTML = `<p>💡 ${q.explanation}</p>`;
    document.getElementById('grammar-options').appendChild(explanation);

    state.grammar.answers.push({ question: state.grammar.currentQ, selected: index, correct: q.answer });
    document.getElementById('grammar-next').disabled = false;
    document.getElementById('grammar-skip').disabled = true;
}

function nextQuestion(type) {
    if (type === 'grammar') {
        const category = state.grammar.category;
        const questions = GRAMMAR_DATA[category];

        state.grammar.currentQ++;
        if (state.grammar.currentQ >= questions.length) {
            finishGrammarQuiz();
        } else {
            showGrammarQuestion();
        }
    }
}

function skipQuestion(type) {
    if (type === 'grammar') {
        const category = state.grammar.category;
        const questions = GRAMMAR_DATA[category];

        state.grammar.answers.push({ question: state.grammar.currentQ, selected: -1, correct: questions[state.grammar.currentQ].answer });
        state.grammar.currentQ++;

        if (state.grammar.currentQ >= questions.length) {
            finishGrammarQuiz();
        } else {
            showGrammarQuestion();
        }
    }
}

function finishGrammarQuiz() {
    stopTimer('grammar');
    state.grammar.quizActive = false;

    const correct = state.grammar.answers.filter(a => a.selected === a.correct).length;
    const total = state.grammar.answers.length;
    const score = Math.round((correct / total) * 100);

    document.getElementById('grammar-quiz').classList.add('hidden');
    document.getElementById('grammar-result').classList.remove('hidden');
    document.getElementById('grammar-score-display').textContent = score + '%';

    let title = 'Quiz Complete!';
    let message = '';
    if (score >= 80) { title = 'Excellent! 🎉'; message = 'You have a strong grasp of this topic!'; }
    else if (score >= 60) { title = 'Good Job! 👍'; message = 'Keep practicing to improve further.'; }
    else if (score >= 40) { title = 'Keep Going! 💪'; message = 'Review the explanations and try again.'; }
    else { title = 'Needs Practice 📚'; message = 'Focus on studying the rules before retrying.'; }

    document.getElementById('grammar-result-title').textContent = title;
    document.getElementById('grammar-result-message').textContent = message;

    const breakdown = document.getElementById('grammar-breakdown');
    breakdown.innerHTML = `
        <div class="breakdown-stats">
            <div class="breakdown-item"><span class="correct-count">${correct}</span> Correct</div>
            <div class="breakdown-item"><span class="incorrect-count">${total - correct}</span> Incorrect</div>
            <div class="breakdown-item"><span class="time-count">${formatTime(state.grammar.seconds)}</span> Time</div>
        </div>
    `;

    saveScore('grammar', score, { category: state.grammar.category, correct, total, time: state.grammar.seconds });
}

function restartQuiz(type) {
    if (type === 'grammar') startGrammarQuiz();
}

// ============================================================
// TIMER
// ============================================================

function startTimer(type) {
    if (state[type] && state[type].timer) clearInterval(state[type].timer);
    state[type].seconds = 0;
    state[type].timer = setInterval(() => {
        state[type].seconds++;
        const el = document.getElementById(`${type}-timer`);
        if (el) el.textContent = '⏱️ ' + formatTime(state[type].seconds);
    }, 1000);
}

function stopTimer(type) {
    if (state[type] && state[type].timer) {
        clearInterval(state[type].timer);
        state[type].timer = null;
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// ============================================================
// VOCABULARY FLASHCARDS
// ============================================================

function loadFlashcard() {
    const category = state.vocabulary.category;
    const cards = VOCABULARY_DATA[category];
    const index = state.vocabulary.currentIndex;

    if (!cards || cards.length === 0) return;

    document.getElementById('card-total').textContent = cards.length;
    document.getElementById('card-current').textContent = index + 1;

    const card = cards[index];
    document.getElementById('card-word').textContent = card.word;
    document.getElementById('card-phonetic').textContent = card.phonetic;
    document.getElementById('card-definition').textContent = card.definition;
    document.getElementById('card-example').innerHTML = `<em>"${card.example}"</em>`;
    document.getElementById('card-synonym').textContent = '🔗 ' + card.synonyms.join(', ');

    // Reset flip state
    state.vocabulary.flipped = false;
    document.getElementById('flashcard').classList.remove('flipped');

    updateVocabStats();
}

function flipCard() {
    state.vocabulary.flipped = !state.vocabulary.flipped;
    document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
    const cards = VOCABULARY_DATA[state.vocabulary.category];
    state.vocabulary.currentIndex = (state.vocabulary.currentIndex + 1) % cards.length;
    loadFlashcard();
}

function prevCard() {
    const cards = VOCABULARY_DATA[state.vocabulary.category];
    state.vocabulary.currentIndex = (state.vocabulary.currentIndex - 1 + cards.length) % cards.length;
    loadFlashcard();
}

function rateCard(rating) {
    const category = state.vocabulary.category;
    const cards = VOCABULARY_DATA[category];
    const word = cards[state.vocabulary.currentIndex].word;
    const wordKey = `${category}:${word}`;

    if (rating === 'easy') {
        if (!state.vocabulary.learned.includes(wordKey)) {
            state.vocabulary.learned.push(wordKey);
        }
        state.vocabulary.reviewing = state.vocabulary.reviewing.filter(w => w !== wordKey);
    } else {
        if (!state.vocabulary.reviewing.includes(wordKey)) {
            state.vocabulary.reviewing.push(wordKey);
        }
        state.vocabulary.learned = state.vocabulary.learned.filter(w => w !== wordKey);
    }

    saveVocabProgress();
    saveScore('vocabulary', state.vocabulary.learned.length);
    updateVocabStats();
    nextCard();
}

function updateVocabStats() {
    const category = state.vocabulary.category;
    const cards = VOCABULARY_DATA[category];
    const total = cards.length;

    const learnedInCat = state.vocabulary.learned.filter(w => w.startsWith(category + ':')).length;
    const reviewingInCat = state.vocabulary.reviewing.filter(w => w.startsWith(category + ':')).length;

    document.getElementById('vocab-learned').textContent = learnedInCat;
    document.getElementById('vocab-reviewing').textContent = reviewingInCat;
    document.getElementById('vocab-remaining').textContent = total - learnedInCat - reviewingInCat;
}

// ============================================================
// LISTENING PRACTICE
// ============================================================

function loadListeningScenario(index) {
    // Cancel any active playback timeout
    if (state.listening.playbackTimeout) {
        clearTimeout(state.listening.playbackTimeout);
        state.listening.playbackTimeout = null;
    }
    state.listening.playbackGeneration = (state.listening.playbackGeneration || 0) + 1;
    state.listening.currentScenario = index;
    state.listening.conversationIndex = 0;
    state.listening.playing = false;
    state.listening.answers = {};

    const scenario = LISTENING_DATA[index];
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('conversation-box').classList.remove('hidden');
    document.getElementById('listening-questions').classList.add('hidden');
    document.getElementById('listening-result').classList.add('hidden');
    document.getElementById('conversation-display').innerHTML = '';
    document.getElementById('transcript-box').classList.add('hidden');
    document.getElementById('play-btn').textContent = '▶️ Play Conversation';
    document.getElementById('play-btn').disabled = false;
}

function playConversation() {
    const scenario = LISTENING_DATA[state.listening.currentScenario];
    if (state.listening.playing) return;

    state.listening.playing = true;
    state.listening.conversationIndex = 0;
    state.listening.playbackGeneration = (state.listening.playbackGeneration || 0) + 1;
    const currentGeneration = state.listening.playbackGeneration;
    document.getElementById('conversation-display').innerHTML = '';
    document.getElementById('play-btn').textContent = '⏸️ Playing...';
    document.getElementById('play-btn').disabled = true;

    const speed = state.listening.speed === 'slow' ? 2500 : 1500;

    function showNextLine() {
        if (currentGeneration !== state.listening.playbackGeneration) return;

        if (state.listening.conversationIndex >= scenario.conversation.length) {
            state.listening.playing = false;
            document.getElementById('play-btn').textContent = '🔄 Replay';
            document.getElementById('play-btn').disabled = false;
            document.getElementById('listening-questions').classList.remove('hidden');
            renderListeningQuestions();
            return;
        }

        const line = scenario.conversation[state.listening.conversationIndex];
        const display = document.getElementById('conversation-display');
        const lineEl = document.createElement('div');
        lineEl.className = `conversation-line ${line.speaker.toLowerCase().replace(/\s/g, '-')}`;
        lineEl.innerHTML = `<strong>${line.speaker}:</strong> ${line.text}`;
        lineEl.style.opacity = '0';
        display.appendChild(lineEl);

        setTimeout(() => { lineEl.style.opacity = '1'; }, 50);
        display.scrollTop = display.scrollHeight;

        state.listening.conversationIndex++;
        state.listening.playbackTimeout = setTimeout(showNextLine, speed);
    }

    showNextLine();
}

function showTranscript() {
    const box = document.getElementById('transcript-box');
    box.classList.toggle('hidden');

    if (!box.classList.contains('hidden')) {
        const scenario = LISTENING_DATA[state.listening.currentScenario];
        document.getElementById('transcript-content').innerHTML = scenario.conversation.map(line =>
            `<p><strong>${line.speaker}:</strong> ${line.text}</p>`
        ).join('');
    }
}

function renderListeningQuestions() {
    const scenario = LISTENING_DATA[state.listening.currentScenario];
    const container = document.getElementById('listening-quiz-container');

    container.innerHTML = scenario.questions.map((q, qi) => `
        <div class="listening-question-item">
            <p class="lq-text">${qi + 1}. ${q.question}</p>
            <div class="lq-options">
                ${q.options.map((opt, oi) => `
                    <label class="lq-option">
                        <input type="radio" name="lq-${qi}" value="${oi}" onchange="state.listening.answers[${qi}]=${oi}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function submitListeningAnswers() {
    const scenario = LISTENING_DATA[state.listening.currentScenario];
    let correct = 0;

    scenario.questions.forEach((q, i) => {
        if (state.listening.answers[i] === q.answer) correct++;
    });

    const score = Math.round((correct / scenario.questions.length) * 100);

    document.getElementById('listening-questions').classList.add('hidden');
    document.getElementById('conversation-box').classList.add('hidden');
    document.getElementById('listening-result').classList.remove('hidden');
    document.getElementById('listening-score-display').textContent = score + '%';

    const feedback = document.getElementById('listening-feedback');
    feedback.innerHTML = `
        <p>You got <strong>${correct}</strong> out of <strong>${scenario.questions.length}</strong> correct.</p>
        <div class="feedback-details">
            ${scenario.questions.map((q, i) => {
                const isCorrect = state.listening.answers[i] === q.answer;
                const userAnswer = state.listening.answers[i] !== undefined ? q.options[state.listening.answers[i]] : 'Not answered';
                return `<div class="feedback-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <span>${isCorrect ? '✓' : '✗'}</span>
                    <span>${q.question}</span>
                    <span class="answer-text">${isCorrect ? '' : `Your answer: ${userAnswer} | Correct: ${q.options[q.answer]}`}</span>
                </div>`;
            }).join('')}
        </div>
    `;

    saveScore('listening', score, { scenario: scenario.title });
}

function resetListening() {
    state.listening.currentScenario = null;
    state.listening.answers = {};
    document.getElementById('conversation-box').classList.add('hidden');
    document.getElementById('listening-questions').classList.add('hidden');
    document.getElementById('listening-result').classList.add('hidden');
    document.getElementById('scenario-title').textContent = 'Select a scenario to begin';
    document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
}

// Speed control
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('speed-btn')) {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.listening.speed = e.target.dataset.speed;
    }
});

// ============================================================
// READING PRACTICE
// ============================================================

function loadReadingPassage(index) {
    state.reading.currentPassage = index;
    state.reading.answers = {};
    state.reading.startTime = Date.now();

    const passage = READING_DATA[index];

    document.getElementById('reading-container').classList.remove('hidden');
    document.getElementById('reading-result').classList.add('hidden');
    document.getElementById('passage-title').textContent = passage.title;
    document.getElementById('passage-content').innerHTML = passage.passage;

    // Start reading timer
    if (state.reading.timerInterval) clearInterval(state.reading.timerInterval);
    state.reading.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.reading.startTime) / 1000);
        document.getElementById('reading-time').textContent = '⏱️ ' + formatTime(elapsed);
    }, 1000);

    renderReadingQuestions(passage);
}

function renderReadingQuestions(passage) {
    const container = document.getElementById('reading-questions');
    container.innerHTML = passage.questions.map((q, qi) => `
        <div class="reading-question-item">
            <p class="rq-text">${qi + 1}. ${q.question}</p>
            <div class="rq-options">
                ${q.options.map((opt, oi) => `
                    <label class="rq-option">
                        <input type="radio" name="rq-${qi}" value="${oi}" onchange="state.reading.answers[${qi}]=${oi}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function submitReadingAnswers() {
    if (state.reading.timerInterval) clearInterval(state.reading.timerInterval);

    const passage = READING_DATA[state.reading.currentPassage];
    let correct = 0;

    passage.questions.forEach((q, i) => {
        if (state.reading.answers[i] === q.answer) correct++;
    });

    const score = Math.round((correct / passage.questions.length) * 100);
    const timeSpent = Math.floor((Date.now() - state.reading.startTime) / 1000);

    document.getElementById('reading-container').classList.add('hidden');
    document.getElementById('reading-result').classList.remove('hidden');
    document.getElementById('reading-score-display').textContent = score + '%';

    const feedback = document.getElementById('reading-feedback');
    feedback.innerHTML = `
        <p>You got <strong>${correct}</strong> out of <strong>${passage.questions.length}</strong> correct in <strong>${formatTime(timeSpent)}</strong>.</p>
        <div class="feedback-details">
            ${passage.questions.map((q, i) => {
                const isCorrect = state.reading.answers[i] === q.answer;
                const userAnswer = state.reading.answers[i] !== undefined ? q.options[state.reading.answers[i]] : 'Not answered';
                return `<div class="feedback-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <span>${isCorrect ? '✓' : '✗'}</span>
                    <span>${q.question}</span>
                    <span class="answer-text">${isCorrect ? '' : `Your answer: ${userAnswer} | Correct: ${q.options[q.answer]}`}</span>
                </div>`;
            }).join('')}
        </div>
    `;

    saveScore('reading', score, { passage: passage.title, time: timeSpent });
}

function resetReading() {
    state.reading.currentPassage = null;
    state.reading.answers = {};
    document.getElementById('reading-container').classList.add('hidden');
    document.getElementById('reading-result').classList.add('hidden');
    document.querySelectorAll('.reading-btn').forEach(b => b.classList.remove('active'));
}

// ============================================================
// SCORES PAGE
// ============================================================

function updateScoresPage() {
    const scores = getScores();

    // Grammar
    const grammarScores = scores.grammar || [];
    const grammarAvg = grammarScores.length > 0 ? Math.round(grammarScores.reduce((a, b) => a + b.score, 0) / grammarScores.length) : 0;
    document.getElementById('grammar-score-bar').style.width = grammarAvg + '%';
    document.getElementById('grammar-percent').textContent = grammarAvg + '%';
    document.getElementById('grammar-count').textContent = grammarScores.length + ' quizzes';

    // Vocabulary
    const vocabLearned = state.vocabulary.learned.length;
    const totalVocab = Object.values(VOCABULARY_DATA).reduce((a, b) => a + b.length, 0);
    const vocabPercent = Math.round((vocabLearned / totalVocab) * 100);
    document.getElementById('vocab-score-bar').style.width = vocabPercent + '%';
    document.getElementById('vocab-percent').textContent = vocabPercent + '%';
    document.getElementById('vocab-count').textContent = vocabLearned + ' words';

    // Listening
    const listeningScores = scores.listening || [];
    const listeningAvg = listeningScores.length > 0 ? Math.round(listeningScores.reduce((a, b) => a + b.score, 0) / listeningScores.length) : 0;
    document.getElementById('listening-score-bar').style.width = listeningAvg + '%';
    document.getElementById('listening-percent').textContent = listeningAvg + '%';
    document.getElementById('listening-count').textContent = listeningScores.length + ' practices';

    // Reading
    const readingScores = scores.reading || [];
    const readingAvg = readingScores.length > 0 ? Math.round(readingScores.reduce((a, b) => a + b.score, 0) / readingScores.length) : 0;
    document.getElementById('reading-score-bar').style.width = readingAvg + '%';
    document.getElementById('reading-percent').textContent = readingAvg + '%';
    document.getElementById('reading-count').textContent = readingScores.length + ' passages';

    // Estimated band
    const overall = (grammarAvg + vocabPercent + listeningAvg + readingAvg) / 4;
    let band = '—';
    if (overall > 0) {
        if (overall >= 90) band = '7.0+';
        else if (overall >= 80) band = '6.5';
        else if (overall >= 70) band = '6.0';
        else if (overall >= 60) band = '5.5';
        else if (overall >= 50) band = '5.0';
        else if (overall >= 40) band = '4.5';
        else band = '4.0';
    }
    document.getElementById('estimated-band').textContent = band;

    // Weekly history
    updateHistoryTable(scores);
}

function updateHistoryTable(scores) {
    const tbody = document.getElementById('history-tbody');
    const allEntries = [...(scores.grammar || []), ...(scores.listening || []), ...(scores.reading || [])];

    if (allEntries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No history yet. Start practicing!</td></tr>';
        return;
    }

    // Group by week
    const weeks = {};
    allEntries.forEach(entry => {
        const date = new Date(entry.date);
        const weekStart = new Date(date);
        const day = weekStart.getDay();
        const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
        weekStart.setDate(diff);
        const weekKey = weekStart.toISOString().split('T')[0];

        if (!weeks[weekKey]) weeks[weekKey] = { grammar: [], listening: [], reading: [] };
    });

    // Re-sort entries into weeks
    (scores.grammar || []).forEach(e => {
        const weekKey = getWeekKey(e.date);
        if (!weeks[weekKey]) weeks[weekKey] = { grammar: [], listening: [], reading: [] };
        weeks[weekKey].grammar.push(e.score);
    });
    (scores.listening || []).forEach(e => {
        const weekKey = getWeekKey(e.date);
        if (!weeks[weekKey]) weeks[weekKey] = { grammar: [], listening: [], reading: [] };
        weeks[weekKey].listening.push(e.score);
    });
    (scores.reading || []).forEach(e => {
        const weekKey = getWeekKey(e.date);
        if (!weeks[weekKey]) weeks[weekKey] = { grammar: [], listening: [], reading: [] };
        weeks[weekKey].reading.push(e.score);
    });

    const sortedWeeks = Object.keys(weeks).sort().reverse();

    tbody.innerHTML = sortedWeeks.slice(0, 8).map(week => {
        const w = weeks[week];
        const gAvg = w.grammar.length > 0 ? Math.round(w.grammar.reduce((a, b) => a + b, 0) / w.grammar.length) : '—';
        const vAvg = '—';
        const lAvg = w.listening.length > 0 ? Math.round(w.listening.reduce((a, b) => a + b, 0) / w.listening.length) : '—';
        const rAvg = w.reading.length > 0 ? Math.round(w.reading.reduce((a, b) => a + b, 0) / w.reading.length) : '—';

        const allAvgs = [gAvg, lAvg, rAvg].filter(v => v !== '—');
        const overall = allAvgs.length > 0 ? Math.round(allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length) + '%' : '—';

        return `<tr>
            <td>${formatWeek(week)}</td>
            <td>${gAvg !== '—' ? gAvg + '%' : '—'}</td>
            <td>${vAvg}</td>
            <td>${lAvg !== '—' ? lAvg + '%' : '—'}</td>
            <td>${rAvg !== '—' ? rAvg + '%' : '—'}</td>
            <td><strong>${overall}</strong></td>
        </tr>`;
    }).join('');
}

function getWeekKey(dateStr) {
    const date = new Date(dateStr);
    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
    weekStart.setDate(diff);
    return weekStart.toISOString().split('T')[0];
}

function formatWeek(weekKey) {
    const date = new Date(weekKey);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function exportScores() {
    const scores = getScores();
    const data = JSON.stringify(scores, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ielts-scores-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

function resetAllData() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
        localStorage.removeItem('ielts_scores');
        localStorage.removeItem('ielts_progress');
        localStorage.removeItem('ielts_streak');
        state.vocabulary.learned = [];
        state.vocabulary.reviewing = [];
        updateScoresPage();
        updateDashboard();
        alert('All data has been reset.');
    }
}
