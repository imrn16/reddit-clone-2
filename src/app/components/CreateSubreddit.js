import React, { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useReddit } from "../contexts/RedditContext";
import { MdOutlineCancel, GiCancel } from "react-icons/md";
import { supabase } from "../../../lib/supabaseClient";

function CreateSubreddit() {

	const [title, setTitle] = useState(null);
	const [image, setImage] = useState(null);
	const [details, setDetails] = useState(null);
	const [banner, setBanner] = useState(null);

	const { showCreateSubredditModal, setShowCreateSubredditModal, checkUserAuthenticated } = useReddit();

	const handleSubmit = async () => {
		const user = await checkUserAuthenticated();
		if (!user) {
		  return alert('Please Sign In First'); // Stop execution if the user is not authenticated
		}

		const { data, error } = await supabase
			.from("subreddits")
			.insert([{ name: title, description: details, image: image, banner: banner }])
			.select();
			if (error) {
				console.error('Error inserting data:', error);
				return;
			  }

		console.log('subreddit added')
		console.log(data);
		setShowCreateSubredditModal(false);
		window.location.reload()
	};

	if (showCreateSubredditModal === false) {
		return null;
	} else return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black opacity-65"
				onClick={() => setShowCreateSubredditModal(false)}></div>
			<div className="bg-neutral-800 p-6 rounded-3xl drop-shadow-6xl z-10 w-11/12 max-w-lg border border-2 border-neutral-700">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl">Create a Subreddit</h2>
					<div className="flex justify-center align-center p-2 rounded-full hover:bg-neutral-900">
						<button
							className=""
							onClick={() => setShowCreateSubredditModal(false)}>
							<MdOutlineCancel size={"24"} />
						</button>
					</div>
				</div>
				<hr className="my-4 border-t-2 border-neutral-600"></hr>
				<div className="flex flex-row mb-4">
					<div className="flex flex-row items-center w-full">Name Your Subreddit</div>
					{/* <div className="w-full h-full flex flex-row items-center justify-end"> */}
					<input
						className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
						type="url"
						placeholder="Name"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					{/* </div> */}
				</div>
				<hr className="my-4 border-t-1 border-neutral-700"></hr>
				<div className="mb-4">
					<label className="">Add a Banner Image</label>
					<input
						className="bg-neutral-700 text-white w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
						type="text"
						placeholder="Enter a URL"
						value={banner}
						onChange={(e) => setBanner(e.target.value)}
					/>
				</div>
				<hr className="my-4 border-t-1 border-neutral-700"></hr>
				<div className="mb-4">
					<label className="">Add a Subreddit Image</label>
					<input
						className="bg-neutral-700 w-full mt-1 p-2 rounded-xl placeholder:text-neutral-500"
						type="url"
						placeholder="Enter a URL"
						value={image}
						onChange={(e) => {
							setImage(e.target.value);
						}}
					/>
				</div>
				<hr className="my-4 border-t-1 border-neutral-700"></hr>
				<div className="mb-4">
					<label className="">Description</label>
					<ReactTextareaAutosize
						className="bg-neutral-700 w-full mt-1 p-2 rounded-xl resize-none placeholder:text-neutral-500"
						placeholder="Enter Content"
						onChange={(e) => setDetails(e.target.value)}
						minRows={5}
						value={details}
					/>
				</div>
				<hr className="flex flex-row items-center align-center justify-center my-4 border-t-1 border-neutral-700"></hr>
				<button
					className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl px-10"
					onClick={() => handleSubmit()}>
					Submit
				</button>
			</div>
		</div>
	);
}

export default CreateSubreddit;
