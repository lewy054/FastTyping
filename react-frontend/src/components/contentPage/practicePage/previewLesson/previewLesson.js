import React from 'react';
import lessons from '../../../../content/lessons.json';
import HandsWithKeyboard from '../../handsWithKeyboard/handsWithKeyboard';
import './previewLesson.css';


let lessonText = '';
let loadedLessonText = '';
let lessonLen;


export default class PreviewLesson extends React.Component {
    constructor() {
        super();
        this.state = {
            j: 0,
        }
    }

    renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < loadedLessonText.length; i++) {
            buttons.push(<div id={i} className="button" style={{ backgroundColor: this.state.backgroundcolor }} data-char={loadedLessonText.charAt(i)} key={i}>{loadedLessonText.charAt(i)}</div>)
        }
        return buttons;
    }

    getLetter() {
        return lessonText[0];
    }

    toggleAnimation = () => {
        if (this.state.j < lessonLen) {
            let div = document.getElementById(this.state.j);
            div.classList.toggle('click');
        }
    }

    toggleAnimationBad = () => {
        if (this.state.j < lessonLen) {
            let div = document.getElementById(this.state.j);
            div.classList.toggle('clickedWrong');
        }
    }

    componentDidMount() {
        this.toggleAnimation();
        document.onkeydown = (e) => {
            if (lessonText.length !== 0) {
                let div = document.getElementById(this.state.j);
                if(e.key === 'Shift'){
                    return;
                }
                console.log(e.key);
                if (e.key === lessonText[0]) {
                    lessonText = lessonText.substring(1);
                    console.log("dobre")
                    div = document.getElementById(this.state.j);

                    if (div.classList.contains('clickedWrong')) {
                        this.toggleAnimationBad();
                    }
                    if (div.classList.contains('click')) {
                        this.toggleAnimation();
                    }

                    div.style.backgroundColor = '#00ad3d';
                    this.setState({
                        j: this.state.j + 1
                    })
                }
                else {
                    console.log("zle");
                    if (!div.classList.contains('clickedWrong')) {
                        this.toggleAnimationBad();
                    }
                }
                this.toggleAnimation();
            }
            if (lessonText.length === 0) {
                console.log('koniec');
            }
        };
    }

    render() {
        loadedLessonText = lessons[this.props.lessonId]["text"];
        lessonLen = loadedLessonText.length;
        lessonText = loadedLessonText.slice(this.state.j);

        return (
            <div>
                <div className="buttons">
                    <div className="buttons__row">
                        {this.renderButtons()}
                    </div>
                </div>
                <p className="whichFinger">Naciskaj ten przycisk jakiś se palcem</p>
                <HandsWithKeyboard letter={this.getLetter()} />
            </div>
        )
    }
}