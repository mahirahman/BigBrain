404 page not found for pages that have not been created or can be accessed by the user

Register page has email regex validation as well as password matching
Register page has password length to minimum of 8 characters
You must fill out all the input fields in register page otherwise it will give errors

If a quiz has no image, a default image is applied with a unique colour filter.
This makes it easy to distinguise a particular quiz.
When a quiz is creates it will say 'Created just now', after a minute it will say how many minutes it has been
and within 24 hours of quiz creation is will update and say how many hours and minutes it has been since the quiz has been created.
After 24 hours it will just show the date it was created.

Lots of validation for adding/editing a question
Validation of every input field. Names must be certain lengths, youtube url must be a youtube url etc.
Time limit is minimum of 10 seconds to keep it logical for a quiz time
User cannot remove more than 2 answer inputs for single choice
User cannot remove more than 3 answer inputs for multiple choice
Max answer inputs is 6
User can type correct answers within the bounds of the answer input id
Deleting a middle question will dynamically update the question number.
eg) Q1, Q2, Q3
If Q2 is deleted, Q3 will automatically become Q2. Works with long question quizzes.

When playing a quiz game, if another user attempts to enter the lobby, quiz game or results page without registering themselves prior
to joining a lobby they will be redirected to a 404 page.

All admin pages are password/authentication protected.
If a user tries to enter a admin url it will redirect to either 404 or login page.

Entire app is dynamically rendered when content is changed. (Lots of states)