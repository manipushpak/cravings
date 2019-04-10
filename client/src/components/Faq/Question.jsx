import React from 'react';

import classNames from 'classnames';
import styles from '../../styles/ExtraPages.css';

let cx = classNames.bind(styles);

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false
        };
        
        this.toggleActive = this.toggleActive.bind(this);
    }
    
    toggleActive() { this.setState({active: !this.state.active}); }

    render() {
        var outercontainer = cx({
            qa: true,
            active: this.state.active
        });

        return(
            <li className={ this.state.active ? classNames(styles.qa, styles.active) : styles.qa } onClick={ this.toggleActive }>
                <div className={ styles.question }>{ this.props.question }</div> 
                <div className={ styles.answer }>{ this.props.answer }</div>
            </li>
        );
   }
}

export default Question;