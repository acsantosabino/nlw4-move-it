import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import { CountdownContext } from "../../contexts/CountdownContext";
import styles from "./Countdown.module.css";

export function Countdown() {
    const {
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
    } = useContext(CountdownContext);

    const [minutesLeft, minutesRight] = String(minutes)
        .padStart(2, "0")
        .split("");
    const [secondsLeft, secondsRight] = String(seconds)
        .padStart(2, "0")
        .split("");

    return (
        <>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
            {isActive ? (
                <button
                    className={[
                        styles.countdownButton,
                        styles.countdownButtonActive,
                    ].join(" ")}
                    type="button"
                    onClick={resetCountdown}
                >
                    Abandonar ciclo <i />
                </button>
            ) : (
                <button
                    className={styles.countdownButton}
                    type="button"
                    onClick={startCountdown}
                    disabled={hasFinished}
                >
                    {hasFinished ? (
                        <>
                            Ciclo encerrado <i />
                        </>
                    ) : (
                        "Iniciar Contagem"
                    )}
                </button>
            )}
        </>
    );
}
