### Custom testing path
0. Create an account with email as someone@mail
   Fail to do it.
0.5 rectify the error by adding a .com
1. Create a quiz
2. Update the quiz name and thumbnail
3. Add a quiz question
	- 1st question: single choice (no embedded)
	- 2nd question single choice (embedded image)
    - 3rd question multiple choice (embedded YouTube url) (make 6 answers)
	- 4th question multiple choice (no embedded) (3 answers) (correct answer = 1 and 4). Windows.alert should pop up
4. Edit 1st question and make it multiple choice and add an image to it
5. Edit 2nd Question, change time limit to 120. Windows.alert should pop up. make an assertion to capture error.
6. Delete the 2rd question
7. Edit 1st question and try and remove all answers so that there is only 1 answer — Windows.alert should pop up. make an assertion to capture error.
8. Edit 1st question change point to 11000 Windows.alert should pop up. make an assertion to capture error.
9. Delete 1st question.
10. Only 1 question left shown on the screen.

The rationale behind this test is to show that ediiting and modifying a question is done successfully while dynamic renders.
It also shows that a user can modify any field without changing all fields. If a user only wants to change a question image they can do so and it will not affect any other question data. This has been done through multiple layers of validation of the data.

Also, there is multiple error checking when editing a question. For example trying to paste a non youtube URL to the URL embed will result in an error.
Trying to add multiple answers to a single choice question, adding single answer to multiple choice etc.

This test shows that editing a question in any sort of combination of inputs will not cause issues.
