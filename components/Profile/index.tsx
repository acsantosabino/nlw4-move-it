import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import styles from "./Profile.module.css";

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img
                src="https://github.com/acsantosabino.png"
                alt="Arthur Santos"
            />
            <div>
                <strong>Arthur Santos</strong>
                <p>
                    <img src="/icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}
