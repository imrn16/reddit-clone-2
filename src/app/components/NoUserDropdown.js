
import React from "react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useReddit } from "../contexts/RedditContext";
import EditUser from "./EditUser";
import { logout } from "../logout/actions";

export default function NoUserDropdown() {
	

	// const { user, error, isLoading } = useUser();
	const { showUserEditModal, setShowUserEditModal, isNoUserDropdownOpen, setIsNoUserDropdownOpen, setShowSignInModal, setShowSignUpModal } = useReddit();

	const toggleDropdown = () => {
		setIsOpen(!isNoUserDropdownOpen);
		console.log('USER: ', user)
	};

	const handleEditClick = async () => {
		setIsOpen(!isNoUserDropdownOpen);
		setShowUserEditModal(true);
	};

	return (
		<div className="relative inline-block text-left mt-8">
			{/* <button
				onClick={toggleDropdown}
				className="flex items-center justify-center rounded-full text-xs ml-3 mr-1 p-0.5">
				<img
					className="h-8 rounded-full"
					src={user.picture}
					alt="User profile"
				/>
			</button> */}
			{isNoUserDropdownOpen && (
				<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-neutral-800 ring-1 ring-black ring-opacity-10 z-50">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu">
						<button
							onClick={() => setShowSignInModal(true)}
							className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 rounded-xl mx-1 mt-1 mb-1"
							role="menuitem">
							Sign In
						</button>
						<hr className="border-t-1 w-full px-2 border-neutral-700"></hr>
						<button
							onClick={() => { setShowSignUpModal(true)
                                console.log('open')}
                            }
							className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 rounded-xl mx-1 mt-1"
							role="menuitem">
							Sign Up
						</button>
						{/* <button
							className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 rounded-xl mx-1 mt-1"
							onClick={console.log(user)}>
							log it
						</button> */}
					</div>
				</div>
			)}
		</div>
	);
}

// <Dropdown>
// 	<DropdownTrigger>
// 		<button
// 			onClick={() => (window.location.href = "/api/auth/logout")}
// 			className="flex items-center justify-center bg-red-800 rounded-full text-xs ml-3 mr-1 p-0.5">
// 			<img
// 				className="h-8 rounded-full"
// 				src={user.picture}
// 				alt="User profile"
// 			/>
// 		</button>
// 	</DropdownTrigger>
// 	<DropdownMenu
// 		aria-label="Example with disabled actions"
// 		disabledKeys={["edit", "delete"]}>
// 		<DropdownItem key="new">New file</DropdownItem>
// 		<DropdownItem key="copy">Copy link</DropdownItem>
// 		<DropdownItem key="edit">Edit file</DropdownItem>
// 		<DropdownItem
// 			key="delete"
// 			className="text-danger"
// 			color="danger">
// 			Delete file
// 		</DropdownItem>
// 	</DropdownMenu>
// </Dropdown>
