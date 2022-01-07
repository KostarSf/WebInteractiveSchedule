import WeekBar from '../WeekBar';
import styles from './styles.module.css';

function ScheduleViewer() {
    return (
        <div className={styles.scheduleViewer}>
            <div className={styles.dayContainer}>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, ea consequuntur quis ipsum aperiam cumque eos. Animi suscipit facere eos velit neque earum! Consequuntur molestiae tenetur, a nulla doloribus quod.
                    Ducimus nihil facilis veritatis ea laudantium aliquam, est commodi quibusdam impedit at magnam minus iste dignissimos unde sunt temporibus fuga sint architecto rem suscipit dolorem necessitatibus velit. Beatae, accusamus deleniti?
                    Exercitationem, incidunt quae. Amet est ipsam voluptatibus non neque veritatis ut doloremque obcaecati! Fugiat placeat tempora quas dolorum minus amet labore beatae eveniet neque ab atque possimus maiores, perspiciatis odio.
                </div>
            </div>
            <div className={styles.weekbarContainer}>
                <WeekBar />
            </div>
        </div>
    )
}

export default ScheduleViewer;
