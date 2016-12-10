import React from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Card, CardBlock, CardTitle } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { STATE_SIGNING_IN, STATE_SIGNED_IN, signInSubmitted } from './reducer';

/**
 * A component that prevents users from accessing its children when the
 * user is not signed in. In this case, a sign in dialog will be displayed instead.
 */
class SignInBarrier extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      token: '',
    };
  }

  renderLoginScreenContents() {
    return (
      <CardBlock>
        <CardTitle>Sign In</CardTitle>
        <Form>
          <FormGroup>
            <Label for="loginFormEmail" hidden>Email</Label>
            <Input 
              type="email" 
              name="email" 
              id="loginFormEmail" 
              placeholder="Email" 
              value={ this.state.email }
              onChange={(event) => { this.setState({ email: event.target.value }); }} />
          </FormGroup>
          <FormGroup>
            <Label for="loginFormToken" hidden>Access Token</Label>
            <Input 
              type="password" 
              name="token" 
              id="loginFormToken" 
              placeholder="Access Token"
              value={ this.state.token }
              onChange={(event) => { this.setState({ token: event.target.value }); }} />
          </FormGroup>
          <Button 
            onClick={(event) => {
              event.preventDefault();
              this.props.onSubmit(this.state.email, this.state.token);
            }}
            disabled={this.state.email === '' || this.state.token === ''}
            color="primary"
            block
            >
              Sign In
          </Button>
        </Form>
      </CardBlock>
    );
  }

  render() {
    if (this.props.signInState === STATE_SIGNED_IN) {
      return this.props.children;
    } else if (this.props.signInState === STATE_SIGNING_IN) {
      return (
        <SignInCard>
          <CardBlock>
            <CardTitle>Signing You In...</CardTitle>
          </CardBlock>
        </SignInCard>
      );
    } else {
      return (
        <SignInCard>
          {this.renderLoginScreenContents()}
        </SignInCard>
      );
    }
  }
}

function SignInCard({ children }) {
  return (
    <Container>
      <Card>
        {children}
      </Card>
    </Container>
  );
}

const mapStateToProps = ({ user: { signInState }}) => ({ signInState });
const mapDispatchToProps = (dispatch) => bindActionCreators({ 
  onSubmit: signInSubmitted
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInBarrier);
