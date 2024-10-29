import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const GroundingTechniquesScreen = () => {
    const [step, setStep] = useState(1);
    const [input, setInput] = useState(['', '', '', '', '']);
    const [responses, setResponses] = useState({});
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isIconPressed, setIsIconPressed] = useState(false);
    const [isSoundLoaded, setIsSoundLoaded] = useState(false);
    const [isSoundLoading, setIsSoundLoading] = useState(false);

    const sound = React.useRef(new Audio.Sound()); 
    const soundFile = require('../assets/rain.mp3'); 

    const prompts = [
        { label: "5 Things You Can See", key: 'see', count: 5 },
        { label: "4 Things You Can Touch", key: 'touch', count: 4 },
        { label: "3 Things You Can Hear", key: 'hear', count: 3 },
        { label: "2 Things You Can Smell", key: 'smell', count: 2 },
        { label: "1 Thing You Can Taste", key: 'taste', count: 1 },
    ];

    useEffect(() => {
        const loadSound = async () => {
            if (isSoundLoading || isSoundLoaded) return;
    
            setIsSoundLoading(true);
    
            try {
                await sound.current.unloadAsync(); 
                await sound.current.loadAsync(soundFile); 
                setIsSoundLoaded(true);
            } catch (error) {
                console.error("Error loading sound:", error);
                setIsSoundLoaded(false);
            } finally {
                setIsSoundLoading(false);
            }
        };
    
        loadSound();
    
        return () => {
            sound.current.unloadAsync();
        };
    }, []);

    const handleNext = () => {
        const allInputsFilled = input.every(item => item.trim() !== '');
        
        if (!allInputsFilled) {
            alert('Please fill all fields before proceeding!');
            return;
        }
    
        setResponses(prev => ({
            ...prev,
            [prompts[step - 1].key]: input.filter(item => item),
        }));
        setInput(new Array(prompts[step]?.count || 1).fill(''));
        setStep(step + 1);
    };
    
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            setInput(responses[prompts[step - 2].key] || new Array(prompts[step - 2].count).fill(''));
        }
    };

    const handleInputChange = (text, index) => {
        const newInput = [...input];
        newInput[index] = text;
        setInput(newInput);
    };

    const handleRestart = () => {
        setStep(1);
        setInput(['', '', '', '', '']);
        setResponses({});
    };

    const handleIconPress = async () => {
        if (isSoundLoading) {
            console.log("Sound is currently loading. Please wait.");
            return; 
        }
    
        if (!isSoundLoaded) {
            console.log("Sound is not loaded yet. Cannot play/pause.");
            return; 
        }
    
        setIsIconPressed(prev => !prev);
    
        try {
            if (isIconPressed) {
                await sound.current.pauseAsync();
            } else {
                await sound.current.playAsync();
            }
        } catch (error) {
            console.error("Error playing/pausing sound:", error);
        }
    };
    
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
                        <Icon
                            name={isIconPressed ? "volume-up" : "volume-off"}
                            size={30}
                            color="#ab9e7f"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>5-4-3-2-1 Grounding Technique</Text>

                {isSoundLoading ? (
                    <ActivityIndicator size="large" color="#ab9e7f" />
                ) : (
                    <>
                        {step <= prompts.length ? (
                            <View style={styles.promptContainer}>
                                <Text style={styles.promptText}>{prompts[step - 1].label}</Text>
                                {Array.from({ length: prompts[step - 1].count }).map((_, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.input}
                                        placeholder={`Enter ${prompts[step - 1].label.toLowerCase()} (${index + 1})`}
                                        value={input[index]}
                                        onChangeText={(text) => handleInputChange(text, index)}
                                    />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.completionTextContainer}>
                                <Text style={styles.completionText}>You've completed the grounding exercise!</Text>
                                {Object.entries(responses).map(([key, value]) => (
                                    <Text key={key} style={styles.responseText}>
                                        {prompts.find(p => p.key === key).label}: {value.join(', ')}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </>
                )}

                <View style={styles.buttonContainer}>
                    {step > 1 && (
                        <TouchableOpacity style={styles.button} onPress={handleBack}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    )}
                    {step <= prompts.length && (
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    )}
                    {step > prompts.length && (
                        <TouchableOpacity style={styles.button} onPress={handleRestart}>
                            <Text style={styles.buttonText}>Restart</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        padding: 40,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ab9e7f',
        marginBottom: 30, 
        marginTop: 5, 
        textAlign: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    promptContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    promptText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ab9e7f',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: 300, 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#afcfd6',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        minWidth: '40%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    completionText: {
        fontSize: 20,
        color: '#555',
        textAlign: 'center',
        marginVertical: 20,
    },
    completionTextContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    responseText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    iconContainer: {
        marginLeft: 300,
    },
});

export default GroundingTechniquesScreen;
