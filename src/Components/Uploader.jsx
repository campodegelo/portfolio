import React from "react";
import axios from "axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    upload() {
        let formData = new FormData();
        // formData.append("file", e.target.files[0]);
        formData.append("file", this.state.file);

        axios.post("/upload", formData).then(({ data }) => {
            console.log("data from upload : ", data);
            this.props.setImageUrl(data[0].url);
        });
    }
    render() {
        return (
            <div id="overlay-uploader">
                <div id="upload-container">
                    <h1>Change Profile Picture</h1>
                    <h1 id="close" onClick={() => this.props.closeModal()}>
                        {" "}
                        X{" "}
                    </h1>
                    <input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.upload()}>upload</button>
                </div>
            </div>
        );
    }
}
