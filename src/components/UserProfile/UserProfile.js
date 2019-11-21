import React from 'react';

const userProfile = (props) => (
    <table>
        <tbody>
            <tr>
                <td>Name:</td>
                <td>{props.name}</td>
            </tr>
            <tr>
                <td>Username:</td>
                <td>{props.username}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>{props.email}</td>
            </tr>
        </tbody>
    </table>
);

export default userProfile;
