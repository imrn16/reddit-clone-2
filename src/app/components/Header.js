"use client";

import React, { use, useState } from "react";
import "../globals.css";
import { useReddit } from "../contexts/RedditContext";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import EditUser from "./EditUser";
import { TiUserOutline } from "react-icons/ti";
import { TiUser } from "react-icons/ti";
import NoUserDropdown from "./NoUserDropdown";
import CreateDropdown from "./CreateDropdown";

// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

function Header() {
	const {
		createPost,
		fetchSubreddits,
		subreddits,
		setShowCreatePostsModal,
		showCreatePostsModal,
		setShowCreateSubredditModal,
		showCreateSubredditModal,
		showUserEditModal,
		setShowUserEditModal,
		user,
		setUser,
		setShowSignInModal,
		showSignInModal,
		checkUserAuthenticated,
		isUserDropdownOpen,
		setIsUserDropdownOpen,
		isNoUserDropdownOpen,
		setIsNoUserDropdownOpen,
		isCreateDropdownOpen,
		setIsCreateDropdownOpen,
		authorUser,
		setAuthorUser
	} = useReddit();

	
	const [title, setTitle] = useState(null);
	const [prevID, setPrevID] = useState(null);
	const [content, setContent] = useState(null);
	const [upvotes, setUpvotes] = useState(1);
	const [downvotes, setDownvotes] = useState(0);
	const [postID, setPostID] = useState(null);

	const [signedInButton, setSignedInButton] = useState(false);
	const [plusButton, setPlusButton] = useState(false);

	const handleClickCreatePost = async () => {
		await fetchSubreddits();
		setShowCreatePostsModal(true);
		console.log(subreddits);
		console.log("create posts button pressed");
		console.log(`showCreate is set to ${showCreatePostsModal}`);
	};

	const handleClickCreateSubreddit = async () => {
		setShowCreateSubredditModal(true);
	};

	useEffect(() => {}, [showCreatePostsModal, showCreateSubredditModal, user, showUserEditModal]);

	useEffect(() => {
		userButton();
	}, []);

	const toggleDropdown = () => {
		setIsUserDropdownOpen(!isUserDropdownOpen);
		console.log("AUTHOR: ", authorUser);
		console.log('signinbutton: ', signedInButton)
	};

	const toggleNoDropdown = () => {
		setIsNoUserDropdownOpen(!isNoUserDropdownOpen);
		console.log("USER: ", user);
	};

	const toggleCreateDropdown = () => {
		setIsCreateDropdownOpen(!isCreateDropdownOpen);
		console.log("USER: ", authorUser);
	};

	const userButton = async () => {
		const user = await checkUserAuthenticated();
		console.log("Header: ", user);
		setAuthorUser(user);
		setPlusButton(true);
		setSignedInButton(true);
		if (!user) {
			setSignedInButton(false);
			console.log('signedinbutton: ',signedInButton)
			setPlusButton(false);
		}

		
		// setSignInButton(user?.email[0].toUpperCase());
	};

	return (
		<div className="flex p-2 px-8 bg-[rgb(17,19,19)] max-h-10">
			<div className="flex flex-1 ">
				<div className="flex items-center justify-center text-orange-600 text-xl font-semibold ">reddit</div>
				{/* <select className="bg-transparent border border-2 border-b-neutral-600 rounded-xl ml-6 text-xs h-4">
					<option>Test</option>
				</select> */}
			</div>
			<div className="flex flex-1 ">
				<div className="flex items-center justify-center w-full  ">
					<input
						className="flex  items-center justify-center text-xs bg-neutral-900 p-2 rounded-2xl focus:outline-none w-full text-center placeholder-neutral-500"
						type="text"
						disabled="true"
						placeholder="Home"></input>
						
				</div>
			</div>
			<div className="flex flex-1">
				<div className="flex ml-auto rounded-3xl p-0.5 justify-center items-center">
					{/* <button
						className="flex items-center justify-center bg-neutral-800 rounded-full p-1 px-3 text-xs"
						onClick={() => handleClickCreatePost()}>
						Create Post
					</button> */}
					{plusButton && (
						<>
						<div className="flex items-center justify-center hover:font-normal rounded-lg text-2xl font-thin ml-3  h-6 w-6 ">
							<button
								className="flex justify-center items-center"
								onClick={() => toggleCreateDropdown()}>
								+
							</button>
							</div>
							<CreateDropdown />{" "}
						</>
					)}
					{/* {user ? (
						<UserDropdown />
					) : (
						<button
							onClick={
								() => setShowSignInModal(true)
								// () => {
								// (window.location.href = "/login")}
							}
							className="flex items-center justify-center bg-neutral-800 rounded-full p-1 px-3 text-xs ml-3 mr-1">
							{signInButton}
						</button>
					)} */}

					{!signedInButton ? (
						<>
						<div className="flex items-center justify-center bg-neutral-800 rounded-full h-8 w-8">
						<button
							onClick={
								() => toggleNoDropdown()
								// () => {
								// (window.location.href = "/login")}
							}
							className="flex">
							<TiUserOutline size={"18"}  />
						</button>
						</div>
						<NoUserDropdown/>
						
						</>
					) : (
						<>
						<div className="flex items-center justify-center bg-neutral-800 rounded-full p-1 px-3 text-xs ml-3 mr-1 h-8 w-8 hover:bg-neutral-700 border-2 border-orange-800">
							<button
								className="flex"
								onClick={
									() => toggleDropdown()
									// () => {
									// (window.location.href = "/login")}
								}
								>
								{/* {signInButton} */}
								<TiUser size={"18"} className=" ring-orange-900" />
							</button>
							</div>
							<UserDropdown user={authorUser} />
							
						</>
					)}

					{/* <a href="/api/auth/login">Login</a>
					<div>
						{" "}
						<div>
							<h1>Welcome, {user?.name}</h1>
							<img
								src={user?.picture}
								alt={user?.name}
							/>
							<p>Email: {user?.email}</p>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Header;
