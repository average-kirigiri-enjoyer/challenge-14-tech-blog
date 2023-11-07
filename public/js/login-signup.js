//getting references to elements necessary for script functionality
//==============================================================
const modal = $(".modal");
const modalMessage = $(".modalMessage");
const closeModalButton = $(".closeModal");
const loginButton = $(".login-button");
const signupButton = $(".signup-button");
const loginUsername = $(".login-container").children(".username");
const loginPassword = $(".login-container").children(".password");
const signupUsername = $(".signup-container").children(".username");
const signupPassword = $(".signup-container").children(".password");
//==============================================================

//function to display an error modal with a message
//=========================================================
const errorModal = (error) =>
{
	let errorDetails;

	//adds additional error details for specific error messages
	if (error === "SequelizeUniqueConstraintError")
	{
		errorDetails = "Your chosen username is already in use.";
	}
	else
	{
		errorDetails = error;
	}

	modal.attr("style", "display: block");
	modalMessage.text(`Error: ${errorDetails}`);
};
// =========================================================

//functions to handle login / signup functionality
//=========================================================
const login = async () =>
{
	const username = loginUsername.val().trim();
	const password = loginPassword.val().trim();

	if (!username || !password)
	{
		errorModal("Enter a username & a password");
		return;
	}

	try
	{
		await fetch("/api/users/login",
		{
			method: "POST",
			body: JSON.stringify({username, password}),
			headers: {"Content-Type": "application/json"},
		});

		document.location.href = "/";
	}
	catch (err)
	{
		errorModal(JSON.parse(err));
	}
};

const signup = async () =>
{
	const username = signupUsername.val().trim();
	const password = signupPassword.val().trim();;

	if (!username || !password)
	{
		errorModal("Enter a username & a password");
		return;
	}

	try
	{
		await fetch("/api/users/signup",
		{
			method: "POST",
			body: JSON.stringify({username, password}),
			headers: {"Content-Type": "application/json"},
		});

		document.location.href = "/";
	}
	catch (err)
	{
		errorModal(JSON.parse(err));
	}
};
// =========================================================

//adding event listeners
//=========================================================
loginButton.on("click", login);
signupButton.on("click", signup);
closeModalButton.on("click", () => {modal.attr("style", "display: none")});
$(window).on("click", (event) =>
{
	if (event.target === modal)
	{
		modal.attr("style", "display: none");
	}
});
//=========================================================