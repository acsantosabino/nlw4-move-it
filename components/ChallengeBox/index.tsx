import styles from "./ChallengeBox.module.css";
import challenges from "../../public/challenges.json";
import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import { CountdownContext } from "../../contexts/CountdownContext";

export function ChallengeBox() {
    const { activeChallenge, completeChallenge, resetChallenge } = useContext(
        ChallengesContext
    );
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeContainer}>
            {!activeChallenge ? (
                <div className={styles.challengeNotActive}>
                    <strong>
                        Inicie um ciclo para receber desafios a serem
                        completados
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Leve Up" />
                        Complete-os e ganhe experiência e avance de leve.
                    </p>
                </div>
            ) : (
                <div className={styles.challengeActive}>
                    <header>{`Ganhe ${activeChallenge.amount} xp`}</header>

                    <main>
                        <img
                            src={`/icons/${activeChallenge.type}.svg`}
                            alt={activeChallenge.type}
                        />
                        <strong>Novo desavio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFaileButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            )}
        </div>
    );
}
