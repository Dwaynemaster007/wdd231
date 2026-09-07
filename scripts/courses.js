const courses = [
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to web design and development concepts.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Creating dynamic web pages using JavaScript and DOM manipulation.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Building responsive web applications using modern tools.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 110,
        title: 'Programming Building Blocks',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Fundamentals of programming and logical problem solving.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Writing reusable, modular code using functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Object-oriented programming principles and execution.',
        technology: ['C#'],
        completed: false
    }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsSpan = document.querySelector('#total-credits');
const btnAll = document.querySelector('#btn-all');
const btnWdd = document.querySelector('#btn-wdd');
const btnCse = document.querySelector('#btn-cse');

function renderCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.classList.add(course.completed ? 'completed' : 'not-completed');

        // Checkmark for completed courses
        const statusIcon = course.completed ? ' ✓' : '';
        card.innerHTML = `<p>${course.subject} ${course.number}${statusIcon}</p>`;

        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// Button event listeners
btnAll.addEventListener('click', () => {
    setActiveButton(btnAll);
    renderCourses(courses);
});

btnWdd.addEventListener('click', () => {
    setActiveButton(btnWdd);
    renderCourses(courses.filter(course => course.subject === 'WDD'));
});

btnCse.addEventListener('click', () => {
    setActiveButton(btnCse);
    renderCourses(courses.filter(course => course.subject === 'CSE'));
});

function setActiveButton(activeBtn) {
    [btnAll, btnWdd, btnCse].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Initial render
renderCourses(courses);