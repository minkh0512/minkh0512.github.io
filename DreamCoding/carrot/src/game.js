'use strict';

import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameButton = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        this.gameButton.addEventListener('click', () => {
            this.started ? this.stop() : this.start();
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBg();
    }
    
    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.playAlert();
        sound.stopBg();
        this.onGameStop && this.onGameStop('cancel');
    }
    
    finish(win) {
        this.started = false;
        this.hideGameButton();
        if(win) {
            sound.playWin();
        } else {
            sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBg();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
        
    }

    onItemClick = item => {
        if(!this.started){
            return;
        }
        if(item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.finish(true);
            }
        } else if(item === 'bug') {
            this.finish(false);
        }
    }

    showStopButton() {
        const icon = this.gameButton.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameButton.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.gameButton.style.visibility = 'hidden';
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if(remainingTimeSec <=0) {
                clearInterval(this.timer);
                this.finish(this.carrotCount === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes} : ${seconds}`;
    }
    
    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
}