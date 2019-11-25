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
    // const obj = {
    //     [social].telegram: telegram,
    // }
    const langList = languages.map((lang) => <li key={lang}>{lang}</li>);
    const socialList = social.map((social) => (
        <a href={social.link} style={{ backgroundImage: social }}></a>
    ));
    return (
        <div className={classes.UserProfile}>
            <div>Город: {city}</div>
            <div>
                Знание языков: <ul>{langList}</ul>
            </div>
            <div>
                Ссылки: <ul></ul>
            </div>
        </div>
    );
};

export default userProfile;
