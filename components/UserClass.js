import React from "react"

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            userInfo: {
                name: "Dummy",
                location: "default",
                avatar_url: "http://dummy-photo.com"
            }
        }
    }
    async componentDidMount () {
        const data = await fetch("https://api.github.com/users/akshaymarch7");
        const json = await data.json();
        console.log(json);
        this.setState({
            userInfo: json
        })
    }

    render() {
        const {name, location, avatar_url} = this.state.userInfo;
        const {count} = this.state;
        return (
            <div className="user-card">
                <h1>{name}</h1>
                <h2>{location}</h2>
                <img src={avatar_url}/>
            </div>
        )
    }
}

export default UserClass;