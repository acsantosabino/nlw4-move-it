import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import styles from "./ExperienceBar.module.css";

export function ExperienceBar() {
    const { currentExperience, nextLevelExperience } = useContext(
        ChallengesContext
    );

    const percentToNextLevel = Math.round(
        (100 * currentExperience) / nextLevelExperience
    );
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}>
                    <span
                        className={styles.currentExperience}
                        style={{ left: `${percentToNextLevel}%` }}
                    >
                        {currentExperience} xp
                    </span>
                </div>
            </div>
            <span>{nextLevelExperience} xp</span>
        </header>
    );
}
