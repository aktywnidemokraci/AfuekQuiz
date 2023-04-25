import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { setRoom } from '../actions/game';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export class CreateGamePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: "",
            category: "0",
            difficulty: "any",
            questionCount: "5",
            error: "",
            background: ""
        }
    }

    onRoomChange = (e) => {
        const room = e.target.value;
        this.setState({ room });
    };

    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({ category })
    }

    onDifficultyChange = (e) => {
        const difficulty = e.target.value;
        this.setState({ difficulty });
    }

    onCountChange = (e) => {
        const questionCount = e.target.value;
        this.setState({ questionCount });
    }
    submitForm = (e) => {
        e.preventDefault();
        const config = {
            room: this.state.room,
            category: this.state.category,
            difficulty: this.state.difficulty,
            questionCount: this.state.questionCount
        };
        //console.log("submitting")
        socket.emit("createRoom", config, (res) => {
            //console.log("res!", res);
            if (res.code === "success") {
                this.setState({ error: "" })
                this.props.setRoom(this.state.room);
                this.props.history.push("/lobby");
            } else {
                this.setState({ error: res.msg })
            }
        });

    };

    render() {
        return (
            <div className="content-container">
                {
                    this.props.type === "" && <Redirect to="/" />
                }
                <div className="box-layout__box">
                    <Fade>
                        <form className="form" onSubmit={this.submitForm}>
                            <h1 className={"box-layout__title"}>Nowa Gra</h1>
                            {this.state.error && <p className="form__error">{this.state.error}</p>}
                            <input
                                type="text"
                                placeholder="Nazwa Pokoju"
                                autoFocus
                                value={this.state.room}
                                onChange={this.onRoomChange}
                                className="text-input"
                            />
                            <select className="select" value={this.state.category} onChange={this.onCategoryChange}>
                                <option key={"0"} value={"0"}>Dowolna Kategoria</option>
                                {
                                    this.props.categories.map((category) => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })
                                }
                            </select>
                            <select className="select" value={this.state.difficulty} onChange={this.onDifficultyChange}>
                                <option key={"any"} value={"any"}>Dowolna Trudność</option>
                                <option key="easy" value="easy">Łatwa</option>
                                <option key="medium" value="medium">Średnia</option>
                                <option key="hard" value="hard">Trudna</option>
                            </select>
                            <select className="select" value={this.state.questionCount} onChange={this.onCountChange}>
                                <option key="5" value="5">5 Pytań</option>
                                <option key="10" value="10">10 Pytań</option>
                                <option key="15" value="15">15 Pytań</option>
                                <option key="20" value="20">20 Pytań</option>
                            </select>
                            <button className="button">Utwórz</button>

                        </form>
                    </Fade>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    categories: state.game.categories,
    type: state.type
});

const mapDispatchToProps = (dispatch) => ({
    setRoom: (room) => dispatch(setRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGamePage);
