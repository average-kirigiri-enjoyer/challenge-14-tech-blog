//getting references to elements necessary for script functionality
//==============================================================
const modal = $(".modal");
const modalMessage = $(".modalMessage");
const closeModalButton = $(".close");
const loginButton = $(".login-button");
const signupButton = $(".signup-button");
const loginUsername = $(".login.username");
const loginPassword = $(".login.password");
const signupUsername = $(".signup.username");
const signupPassword = $(".signup.password");
//==============================================================

//function to display an error modal with a message
//=========================================================
const errorModal = (error) =>
{
	let errorDetails; //variable to hold error details

	//if the provided error is as follows, set the error details appropriately
	if (error === "SequelizeUniqueConstraintError")
	{
		errorDetails = "Your chosen username is already in use.";
	}
	else //otherwise, set the error details to the provided error message
	{
		errorDetails = error;
	}

	//display the modal to the page, and adjust the error message to the above error details
	modal.attr("style", "display: block");
	modalMessage.text(errorDetails);
};
// =========================================================

//functions to handle login / signup functionality
//=========================================================
const login = async () =>
{
	//retrieves username & password from the appropriate inputs
	const username = loginUsername.val().trim();
	const password = loginPassword.val().trim();

	//if the user didn't provide both a username & a password, display the error modal with a message informing them as such, and eject from the function
	if (!username || !password)
	{
		errorModal("Enter a username and a password");
		return;
	}

	try
	{
		//sends username & password data to server via a POST request to attempt to log in
		const response = await fetch("/api/users/login",
		{
			method: "POST",
			body: JSON.stringify({username, password}),
			headers: {"Content-Type": "application/json"},
		});

		//if the login request was accepted, return the user to the home page
		if (response.ok)
		{
			window.location.pathname = "/";
		}
		else //if there was an error logging in, display an error modal containing the error message
		{
			const error = await response.json();
			errorModal(error.name);
		}
	}
	catch (err) //if an error occurs, display an error modal containing the error message
	{
		errorModal(err);
	}
};

const signup = async () =>
{
	//retrieves username & password from the appropriate inputs
	const username = signupUsername.val().trim();
	const password = signupPassword.val().trim();

	//if the user didn't provide both a username & a password, display the error modal with a message informing them as such, and eject from the function
	if (!username || !password)
	{
		errorModal("Enter a username and a password");
		return;
	}

	try
	{
		//sends username & password data to server via a POST request to attempt to sign up
		const response = await fetch("/api/users/signup",
		{
			method: "POST",
			body: JSON.stringify({username, password}),
			headers: {"Content-Type": "application/json"},
		});

		//if the sign up request was successful, return the user to the home page
		if (response.ok)
		{
			window.location.pathname = "/";
		}
		else //if there was an error signing up, display an error modal containing the error message
		{
			const error = await response.json();
			errorModal(error.name);
		}
	}
	catch (err) //if an error occurs, display an error modal containing the error message
	{
		errorModal(err);
	}
};
//=========================================================

//adding event listeners
//=========================================================
loginButton.on("click", login);
signupButton.on("click", signup);

//upon clicking the close modal button, hide the error modal
closeModalButton.on("click", () => {modal.attr("style", "display: none")});

//if the user clicks outside the modal content, hide the error modal
$(window).on("click", (event) =>
{
	if (event.target === modal[0])
	{
		modal.attr("style", "display: none");
	}
});
//=========================================================