// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvYRzyCrazIHj2-KHZ8UXuXfP2tVPIIZk",
    authDomain: "practicegeneral-ab18c.firebaseapp.com",
    projectId: "practicegeneral-ab18c",
    storageBucket: "practicegeneral-ab18c.appspot.com",
    messagingSenderId: "799394328558",
    appId: "1:799394328558:web:e72baf1faee2bcf14a68ff",
    measurementId: "G-1DMFZKG7WM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Function to render posts from Firestore
async function renderPosts() {
    const postList = document.getElementById("postList");
    const currentCategory = window.location.pathname.split('/').pop().split('.')[0]; 

    try {
        // Fetch posts from Firestore
        const postsSnapshot = await db.collection('posts').where("category", "==", currentCategory).get();
        const posts = postsSnapshot.docs.map(doc => doc.data());

        postList.innerHTML = ""; // Clear existing posts

        if (posts.length > 0) {
            posts.forEach((post, index) => {
                const postDiv = document.createElement("div");
                postDiv.className = "post";

                // Create Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "✖"; 

                // Delete post from Firestore
                deleteButton.addEventListener("click", async () => {
                    if (confirm("Are you sure you want to delete this post?")) {
                        const postId = post.id;
                        await db.collection("posts").doc(postId).delete();
                        renderPosts(); // Re-render posts after deletion
                    }
                });

                // Post Title and Content
                const postHeader = document.createElement("div");
                postHeader.className = "post-header";

                const profilePic = document.createElement("div");
                profilePic.className = "profile-pic";

                const userDetails = document.createElement("div");
                userDetails.className = "post-summary";
                const formattedTitle = post.title.replace(/\n/g, "<br>");
                userDetails.innerHTML = formattedTitle;

                const arrow = document.createElement("div");
                arrow.className = "arrow";
                arrow.textContent = "▼"; 

                arrow.addEventListener("click", () => {
                    const content = postDiv.querySelector(".post-content");
                    const msgButton = postDiv.querySelector(".message-button");
                    const isExpanded = content.style.display === "block";

                    content.style.display = isExpanded ? "none" : "block";
                    msgButton.style.display = isExpanded ? "none" : "block";

                    arrow.textContent = isExpanded ? "▼" : "▲";
                });

                postHeader.appendChild(profilePic);
                postHeader.appendChild(userDetails);
                postHeader.appendChild(arrow);

                const postContent = document.createElement("div");
                postContent.className = "post-content";
                postContent.style.display = "none";
                postContent.innerHTML = `<p>${post.content.replace(/\n/g, '<br>')}</p>`;

                const msgButton = document.createElement("button");
                msgButton.className = "message-button";
                msgButton.textContent = "Message";
                msgButton.style.display = "none";
                msgButton.addEventListener("click", () => {
                    alert("Messaging functionality not implemented yet!");
                });

                postDiv.appendChild(deleteButton);
                postDiv.appendChild(postHeader);
                postDiv.appendChild(postContent);
                postDiv.appendChild(msgButton);

                postList.appendChild(postDiv);
            });
        } else {
            postList.innerHTML = "<p style='color: white; text-align: center; font-size: 20px;'>No posts available.</p>";
        }
    } catch (error) {
        console.error("Error fetching posts: ", error);
    }
}

// Call renderPosts when the page loads
window.onload = renderPosts;

// Add a post to Firestore
document.getElementById("add-post-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    if (title && content) {
        const currentCategory = localStorage.getItem("currentCategory");

        if (!currentCategory) {
            alert("Category not specified. Unable to save the post.");
            return;
        }

        try {
            // Add the new post to Firestore under the "posts" collection
            await db.collection('posts').add({
                title: title,
                content: content,
                category: currentCategory,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Redirect to the category page after posting
            window.location.href = `/html/Categories/${currentCategory}.html`;
        } catch (error) {
            console.error("Error adding post: ", error);
            alert("Error saving post. Please try again.");
        }
    } else {
        alert("Please fill in both fields!");
    }
});
