import chayceBeckham from '../assets/chayce-beckham.jpg';
import coleSwindell from '../assets/cole-swindell.jpg';
import chrisStapleton from '../assets/chris-stapleton.jpg';
import dustinLynch from '../assets/dustin-lynch.jpg';
import chaseRice from '../assets/chase-rice.jpg';
import dylanScott from '../assets/dylan-scott.jpg';
import lionelRichie from '../assets/lionel-richie.jpg';

const questions = [
    {
        question: 'Which artist is Chris Stapleton?',
        correctChoice: 3,
        choices: [
            { id: 1, alt: 'Chayce Beckham', imgUrl: chayceBeckham },
            { id: 2, alt: 'Cole Swindell', imgUrl: coleSwindell },
            { id: 3, alt: 'Chris Stapleton', imgUrl: chrisStapleton },
            { id: 4, alt: 'Dustin Lynch', imgUrl: dustinLynch }
        ]
    },
    {
        question: 'What day does Luke Bryan play?',
        correctChoice: 2,
        choices: [
            { id: 1, title: 'Thursday' },
            { id: 2, title: 'Friday' },
            { id: 3, title: 'Saturday' },
            { id: 4, title: 'Everyday' }
        ]
    },
    {
        question: 'What time do the pool parties start?',
        correctChoice: 4,
        choices: [
            { id: 1, title: '9:00am' },
            { id: 2, title: '12:00pm' },
            { id: 3, title: '10:00pm' },
            { id: 4, title: '1:00pm' }
        ]
    },
    {
        question: 'Which resort are you staying at?',
        correctChoice: 1,
        choices: [
            { id: 1, title: 'Sunrise' },
            { id: 2, title: 'Nizuc' },
            { id: 3, title: 'The Grand' },
            { id: 4, title: 'Golf Course' }
        ]
    },
    {
        question: 'Who is performing with Luke Bryan on Sunday?',
        correctChoice: 4,
        choices: [
            { id: 1, alt: 'Chase Rice', imgUrl: chaseRice },
            { id: 2, alt: 'Dylan Scott', imgUrl: dylanScott },
            { id: 3, alt: 'Chayce Beckham', imgUrl: chayceBeckham },
            { id: 4, alt: 'Lionel Richie', imgUrl: lionelRichie }
        ]
    }
];

export default questions;
