import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const [reply, setReply] = useState('');

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://192.168.1.109/chat', {
                data: { input: input },
            });
            setReply(response.data.reply);
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <View>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type your message"
            />
            <Button title="Send" onPress={sendMessage} />
            <Text>{reply}</Text>
        </View>
    );
};

export default ChatComponent;
