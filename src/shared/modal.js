import React  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount =() =>{
        this.props.refToggle.current = this.toggle()
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} >
                        {this.props.header}
                    </ModalHeader>
                    <ModalBody>
                        {this.props.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.footer}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;