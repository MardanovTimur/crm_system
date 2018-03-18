import {Button} from "react-native-material-design";
import {Actions} from "react-native-router-flux";
import {View} from "react-native";
import {buttonStyle} from "../styles/buttons";
import {Auth} from "./auth";

export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Auth/>
                <Button onPress={Actions.register} text={'Регистрация'} overrides={buttonStyle()}/>
            </View>
        )
    }

}