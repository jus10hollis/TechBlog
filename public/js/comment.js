const commentFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector("#comment").value.trim();

  if (body) {
    const response = await fetch("/api/comment/", {
      method: "POST",
      body: JSON.stringify({
        body,
        review_id: event.target.getAttribute("data-review"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};



document
  .querySelector("#aComment")
  .addEventListener("click", commentFormHandler);

