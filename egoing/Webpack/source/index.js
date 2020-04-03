import hello_word from './hello.js';
import world_word from './world.js';
import _ from 'loadsh';
import css from './style.css';
document.querySelector('#root').innerHTML = _.join([hello_word,world_word], ' ');