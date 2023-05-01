const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    let timeout = null
    const validTimeFormat = (hours, min, sec) => 
        `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`

    return (seconds) => {
        if (timeout) clearInterval(timeout)
        let timerEnd = Date.now() + seconds * 1000

        timeout = setInterval(() => {
            let time = timerEnd - Date.now()

            if (time <= 0) {
                clearInterval(timeout)
                timerEl.textContent = 'hh:mm:ss'
                return
            }

            let sec = Math.floor((time / 1000) % 60);
            let min = Math.floor((time / 1000 / 60) % 60);
            let hours = Math.floor((time / 1000 / 60 / 60) % 24);

            timerEl.textContent = validTimeFormat(hours, min, sec)
             
        }, 100)
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    const valueArr = e.target.value.split('')
    e.target.value = valueArr.reduce((acc, curr) => isNaN(parseInt(curr)) ? acc : acc + curr, '')
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});
