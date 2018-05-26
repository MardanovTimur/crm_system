import React, {Component} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []

        }
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Здравсвтвуйте, чем мы можем вам помочь?',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'support',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}