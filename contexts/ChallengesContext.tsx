import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../public/challenges.json";

interface Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    nextLevelExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    completeChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesComleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const nextLevelExperience = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function startNewChallenge() {
        const index = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[index];

        setActiveChallenge(challenge);

        new Audio("/notification.mp3").play();

        if (Notification.permission === "granted") {
            new Notification("Novo desafio 🎉", {
                body: `Valendo ${challenge.amount} xp`,
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        let finalExperience = currentExperience + activeChallenge.amount;

        if (finalExperience >= nextLevelExperience) {
            levelUp();
            setCurrentExperience(finalExperience - nextLevelExperience);
        } else {
            setCurrentExperience(finalExperience);
        }
        setActiveChallenge(null);
        setChallengesComleted(challengesCompleted + 1);
    }

    function levelUp() {
        setLevel(level + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                nextLevelExperience,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                completeChallenge,
                resetChallenge,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
