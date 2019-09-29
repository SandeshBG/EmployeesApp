import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import validator from 'validator';
import { connect } from 'react-redux';
import {login} from '../actions/login';
import {LOGIN_ACTIONS} from '../actions/actions';

class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            validationMessage: ''
        }
        this._onSubmit = this._onSubmit.bind(this);
    }
    static navigationOptions = {
        header : null
    }
    
    componentDidMount(){
        if(this.props.loginState.type == LOGIN_ACTIONS.LOGIN_SUCCESS){
            this.props.navigation.navigate('Employees'); 
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.loginState.type != this.props.loginState.type 
            && this.props.loginState.type == LOGIN_ACTIONS.LOGIN_SUCCESS){
            this.props.navigation.navigate('Employees');
        }else if(prevProps.loginState.type != this.props.loginState.type 
            && this.props.loginState.type == LOGIN_ACTIONS.INITIAL_STATE){
            this.setState({username: '',password: ''});
        }
    }
    _onSubmit(){
        if(!validator.isEmail(this.state.username)){
            this.setState({validationMessage: 'Please enter valid username'});
        }else if(this.state.password == ''){
            this.setState({validationMessage: 'Password cannot be empty'});
        }else{
            this.setState({validationMessage:''});
            this.props.dispatch(login({username:this.state.username,password:this.state.password}));
        }
    }
    render(){
        let {loginState} = this.props;
        return(
            <View style={styles.loginView}>
                <TextInput 
                    placeholder="Username"
                    onChangeText={(text)=>this.setState({username:text})}
                    value={this.state.username}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    onChangeText={(text)=>this.setState({password:text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    style={styles.input}
                />
                { this.state.validationMessage != '' && 
                    <Text style={styles.alert}>{this.state.validationMessage}</Text>                    
                }
                {   loginState.type == LOGIN_ACTIONS.LOGIN_FAILED &&
                    <Text style={styles.alert}>{loginState.message}</Text>
                }
                <TouchableOpacity onPress={this._onSubmit} style={styles.signin}>
                    <Text style={styles.signintext}>
                        Signin
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginState: state.loginState
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    loginView: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    input:{
        width: Dimensions.get('window').width * 3 / 4,
        height: Dimensions.get('window').height * 0.1,
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "dimgrey",
        fontSize: 17 
    },
    signin:{
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height * 0.08,
        backgroundColor:"orange",
        borderRadius:10,
        justifyContent: "center",
    },
    signintext:{
        textAlign: "center",
        color: "#fff",
        fontSize: 17
    },
    alert:{
        color: 'red',
        fontSize:16
    }
})