import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import youtube from "./apis/youtube";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
const KEY = process.env.REACT_APP_KEY.replace(/['",;]+/g, "");

class App extends Component {
	state = { videos: [], selectedVideo: null };

	componentDidMount() {
		this.onTermSubmit("gta v");
	}
	onTermSubmit = async (term) => {
		const response = await youtube.get("/search", {
			params: {
				q: term,
				part: "snippet",
				maxResults: 5,
				key: KEY,
				type: "video",
			},
		});

		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0],
		});
	};
	onVideoSelect = (video) => {
		this.setState({
			selectedVideo: video,
		});
	};

	render() {
		return (
			<div className="ui container">
				<div className="ui grid">
					<div className="ui row">
						<div className="nine wide column">
							<SearchBar onFormSubmit={this.onTermSubmit} />
							<VideoDetail video={this.state.selectedVideo} />
						</div>
						<div className="seven wide column">
							<VideoList
								videos={this.state.videos}
								onVideoSelect={this.onVideoSelect}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default App;
