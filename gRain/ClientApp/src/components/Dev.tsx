import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import EncounterContainer from './containers/encounterContainer';

const initialState = { 
	isOpen: true,
};
type State = Readonly<typeof initialState>;

type Props = {
	onClick(e: MouseEvent<HTMLElement>): void;
	children?: React.ReactNode;
};

class Dev extends Component<object, State> {
	readonly state: State = initialState;

	render () {
	  const { isOpen } = this.state;
	  return (
	    <>
				<Clicker onClick={this.handleToggle}>Toggle</Clicker>
				<Collapse isOpen={isOpen}>
					<EncounterContainer />
				</Collapse>
	    </>
	  );
	}
	private handleToggle = () => this.setState(toggleOpen);
}

const toggleOpen = (prevstate: State) => ({ isOpen: !prevstate.isOpen})
/*const incClickCount = ( prevState: State ) => ({ clickCount: prevState.clickCount +1 });
const decClickCount = ( prevState: State ) => ({ clickCount: prevState.clickCount -1 });*/

export default connect()(Dev);

const Clicker: React.FC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
);
