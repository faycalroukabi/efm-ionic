import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    currentIndex: number;
    results = [];
    avatars = [
        {
            name: 'Donald Trump',
            age: 73,
            image: '../../../assets/trump.jpg',
            visible: true
        },
        {
            name: 'Barack Obama',
            age: 58,
            image: '../../../assets/obama.jpg',
            visible: true
        },
        {
            name: 'Elon Musk',
            age: 48,
            image: '../../../assets/musk.jpg',
            visible: true
        },
        {
            name: 'Jeff Bezos',
            age: 56,
            image: '../../../assets/bezos.jpg',
            visible: true
        },
        {
            name: 'Beyonce',
            age: 38,
            image: '../../../assets/beyonce.jpg',
            visible: true
        },
        {
            name: 'Eminem',
            age: 47,
            image: '../../../assets/eminem.png',
            visible: true
        }
    ];

    constructor() {
        this.currentIndex = this.avatars.length - 1;
        console.log(this.currentIndex);
    }

    swiped(event: any, index: number) {
        console.log(this.avatars[index].name + ' swiped ' + event);
        this.avatars[index].visible = false;
        this.results.push(this.avatars[index].name + ' swiped ' + event);
        this.currentIndex--;
    }


    swipeleft() {
        this.avatars[this.currentIndex].visible = false;
        this.results.push(this.avatars[this.currentIndex].name + ' swiped false');
        this.currentIndex--;
    }

    swiperight() {
        this.avatars[this.currentIndex].visible = false;
        this.results.push(this.avatars[this.currentIndex].name + ' swiped true');
        this.currentIndex--;
    }

}
