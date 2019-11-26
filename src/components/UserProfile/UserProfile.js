import React from 'react';
import classes from './UserProfile.module.css';
import telegram from '../../assets/telegram.svg';
import twitch from '../../assets/twitch.svg';
import twitter from '../../assets/twitter.svg';
import vk from '../../assets/vk.svg';
import web from '../../assets/web.svg';
import youtube from '../../assets/youtube.svg';

const userProfile = (props) => {
    console.log('props user', props);
    const { city, languages, social } = props;

    const imgsObj = {
        telegram,
        twitch,
        twitter,
        vk,
        web,
        youtube
    };

    const langList = languages.map((lang) => <li key={lang}>{lang}</li>);

    const socialList = social.map((social) => (
        <li key={social.label}>
            <a
                href={social.link}
                className={classes.socialLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={imgsObj[social.label]} alt={social.label} />
            </a>
        </li>
    ));

    return (
        <div className={classes.UserProfile}>
            <div>Город: {city}</div>
            <div>
                Знание языков: <ul>{langList}</ul>
            </div>
            <div>
                Ссылки: <ul>{socialList}</ul>
            </div>
        </div>
    );
};

export default userProfile;
