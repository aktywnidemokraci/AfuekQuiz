import React from 'react';
import { connect } from 'react-redux';
import { setHost, setPlayer } from '../actions/clientType';
import Fade from 'react-reveal/Fade';

export class DashboardPage extends React.Component {

    startAsHost = () => {
        this.props.setHost();
        this.props.history.push("/create");
    };

    startAsPlayer = () => {
        this.props.setPlayer();
        this.props.history.push("/join");
    };


    render() {
        return (
            <div className="box-layout">
                <Fade>
                    <div className="box-layout__box">
                        <h1 className="box-layout__title">Afuek Quiz</h1>
                        <h3 className="box-layout__subtitle">Wieloosobowy quiz wiedzy Audytu Finansowego. <br></br> Sprawdź swoją wiedzę grając z przyjaciółmi z Twojego roku</h3>
                        <div className="box-layout__button-container">
                            <div className="box-layout__button">
                                <button className="button" onClick={this.startAsHost}>Utwórz Grę</button>
                            </div>

                            <div className="box-layout__button">
                                <button className="button" onClick={this.startAsPlayer}>Dołącz do Gry</button>
                            </div>

                        </div>

                    </div>
                </Fade>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHost: () => dispatch(setHost()),
        setPlayer: () => dispatch(setPlayer())
    }
}

export default connect(undefined, mapDispatchToProps)(DashboardPage);
