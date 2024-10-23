import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';

const BreathingGuideScreen = () => {
    const [phase, setPhase] = useState(''); 
    const [timer, setTimer] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false); 
    const timeoutRef = useRef(null); 
    const isBreathing = useRef(false); 
    const circleScale = useRef(new Animated.Value(1)).current; 

    const startBreathingExercise = () => {
        if (isBreathing.current || buttonDisabled) return; 

        isBreathing.current = true; 
        setPhase('Inhale');
        setTimer(4);
        
        Animated.timing(circleScale, {
            toValue: 2, 
            duration: 4000, 
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        timeoutRef.current = setTimeout(() => {
            setPhase('Hold');
            setTimer(7);
        }, 4000);

        timeoutRef.current = setTimeout(() => {
            setPhase('Exhale');
            setTimer(8); 
            emptyCircle(); 
        }, 11000);

        setButtonDisabled(true); 
    };

    const emptyCircle = () => {
        Animated.timing(circleScale, {
            toValue: 1, 
            duration: 4000, 
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            resetBreathing();
        });
    };

    const resetBreathing = () => {
        clearTimeout(timeoutRef.current); 
        isBreathing.current = false; 
        setPhase('');
        setTimer(0); 
        circleScale.setValue(1); 
        setButtonDisabled(false);
    };

    const handlePressOut = () => {
        if (isBreathing.current) {
            resetBreathing(); 
        }
        setButtonDisabled(true);
        setTimeout(() => {
            setButtonDisabled(false);
        }, 4000);
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval); 
        } else if (timer === 0 && phase !== '') {
            resetBreathing(); 
        }
    }, [timer, phase]);

    return (
        <View style={styles.container}>
            {phase ? (
                <>
                    <Text style={styles.phaseText}>{phase}</Text>
                    <Text style={styles.timerText}>{timer}</Text>
                </>
            ) : (
                <Text style={styles.phaseText}>Ready to Start!</Text>
            )}

            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ scale: circleScale }], 
                    },
                ]}
            />
            <TouchableOpacity
                style={[styles.button, buttonDisabled && styles.buttonDisabled]} 
                onPressIn={startBreathingExercise} 
                onPressOut={handlePressOut} 
                disabled={buttonDisabled} 
            >
                <Text style={styles.buttonText}>Hold Here</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    button: {
        backgroundColor: '#afcfd6',
        padding: 19,
        width: 170,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#b0c4c4', 
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    circle: {
        width: 460, 
        height: 460,
        borderRadius: 260, 
        backgroundColor: 'rgba(175, 207, 214, 0.5)', 
        borderColor: '#afcfd6',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    phaseText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    timerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
});

export default BreathingGuideScreen;
