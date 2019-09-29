import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Dimensions,
    BackHandler,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import {logout} from '../actions/login';
import {employees} from '../../constants'; 

class Employees extends Component {
    constructor(props){
        super(props);
        this.confirmLogout = this.confirmLogout.bind(this);
        this.logout = this.logout.bind(this);
        this.employeeDetails = this.employeeDetails.bind(this);
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this.confirmLogout)
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.confirmLogout);
    }

    
    logout(){        
        this.props.dispatch(logout());
        this.props.navigation.goBack();
    }

    confirmLogout(){
        Alert.alert('Logout','Do you want to logout/exit from this application?',
        [{text:'Logout',onPress: this.logout},{text:'Exit',onPress: () => BackHandler.exitApp() }],{cancelable:true});
        return true;
    }

    static navigationOptions = {
        title: "Employees List",
        headerLeft : null
    }

    employeeDetails({item}){
        return (
            <View style={styles.cardView}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.age} | </Text>
                    <Text style={styles.contentText}>{item.gender} | </Text>
                    <Text style={styles.contentText}>{item.phoneNo} | </Text>
                    <Text style={styles.contentText}>{item.email}</Text>
                </View>
            </View>
        )
    }

    render(){
        return (
            <FlatList 
                data={employees.user}
                keyExtractor={item => item.name}
                renderItem={this.employeeDetails}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(null,mapDispatchToProps)(Employees);


const styles = StyleSheet.create({
    cardView:{
        width: Dimensions.get('window').width-10,
        height: Dimensions.get('window').height / 4,
        backgroundColor: 'cyan',
        margin: 5
    },
    contentView:{
        flex:1,
        flexDirection: "row",
        padding:10,
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    employeeName:{
        fontSize:20,
        fontWeight:"bold",
        opacity:0.7,
        paddingLeft:10
    },
    contentText:{
        fontSize: 17,
        opacity:0.7,
    }
})