// -----------------------------------DATA
// A CourseInfo object, which looks like this:
// {
//   "id": number,
//   "name": string,
// }

// An AssignmentGroup object, which looks like this:
// {
//   "id": number,
//   "name": string,
//   // the ID of the course the assignment group belongs to
//   "course_id": number,
//   // the percentage weight of the entire assignment group
//   "group_weight": number,
//   "assignments": [AssignmentInfo],
// }

// Each AssignmentInfo object within the assignments array looks like this:
// {
//   "id": number,
//   "name": string,
//   // the due date for the assignment
//   "due_at": Date string,
//   // the maximum points possible for the assignment
//   "points_possible": number,
// }

// An array of LearnerSubmission objects, which each look like this:
// {
//     "learner_id": number,
//     "assignment_id": number,
//     "submission": {
//       "submitted_at": Date string,
//       "score": number
//     }
// }

// -------------------
// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores
// }
// -----------------------------------
// ---------------------TO DO-------------------
/*If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
Use try/catch and other logic to handle these types of errors gracefully.
If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.
You may use as many helper functions as you see fit.*/
// -----------------------------------------

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];


  


  function getLearnerData(course, ag, submissions) {
    // DATA FOR 1st-125 id Student
  const studentId125 = LearnerSubmissions[0].learner_id;

  const avg = (LearnerSubmissions[0].submission.score + LearnerSubmissions[1].submission.score) / (AssignmentGroup.assignments[0].points_possible + AssignmentGroup.assignments[1].points_possible); 

  const one = (LearnerSubmissions[0].submission.score) / (AssignmentGroup.assignments[0].points_possible);

  const two = (LearnerSubmissions[1].submission.score) / (AssignmentGroup.assignments[1].points_possible);
  
  console.log("id-" + studentId125, "avg-" + avg, "1-" + one, "2-" + two)

   //  DATA FOR 2nd-132 id Student
  const studentId132= LearnerSubmissions[3].learner_id;

  const latePenalty = AssignmentGroup.assignments[1].points_possible * 0.1;
  const adjustedScore = LearnerSubmissions[4].submission.score - latePenalty;
  const second = ((adjustedScore / AssignmentGroup.assignments[1].points_possible).toFixed(2));

  const first= (LearnerSubmissions[3].submission.score) / (AssignmentGroup.assignments[0].points_possible);

  const avgTwo= (LearnerSubmissions[3].submission.score+ adjustedScore) / (AssignmentGroup.assignments[0].points_possible + AssignmentGroup.assignments[1].points_possible);

  console.log("id-" + studentId132, "avg-" + avgTwo, "1-" + first, "2-" + second)



  // try/catch for the whole block of code.
    try {
  // If an AssignmentGroup does not belong to its course
        if (ag.course_id !== course.id) {
            throw new Error("Assignment Group does not belong to this course");
        }
  // Similar data validation should occur elsewhere within the program.
        if (typeof course.name !== "string" && typeof ag.id !== "number"){
            throw new Error("Wrong Data")
        } 

  // Due Dates
  const currentDate = new Date();
  const dueAssignments = [];
  for (let i = 0; i < ag.assignments.length; i++) {
      const assignment = ag.assignments[i];
      const dueDate = new Date(assignment.due_at);
      if (dueDate <= currentDate) {
          dueAssignments.push(assignment);
      } else {
          break;
      }
  }

  // Total Points Possible for Due Assignments
//   let totalPointsPossible = 0;
//   dueAssignments.forEach(assignment => {
//       totalPointsPossible += assignment.points_possible;
//   });
  let totalPointsPossible = 0;
  for (let i = 0; i < dueAssignments.length; i++) {
    const assignment = dueAssignments[i];
    totalPointsPossible += assignment.points_possible;
}
if (totalPointsPossible > 100) {
    // console.log(">100")
} else if (totalPointsPossible < 50) {
    // console.log("<50")
}
// console.log(totalPointsPossible)


  //   Due Assignments
  const dueAssignment = [];
  for (let i = 0; i < ag.assignments.length; i++) {
      const assignment = ag.assignments[i];
      const dueDate = new Date(assignment.due_at);
      if (dueDate <= currentDate) {
          dueAssignment.push(assignment);
      }
  }

const learnerData = {};

submissions.forEach(submission => {
    const assignment = dueAssignments.find(b => b.id === submission.assignment_id);
    if (!assignment) return;

    const latePenalty = new Date(submission.submission.submitted_at) > new Date(assignment.due_at) ?
        assignment.points_possible * 0.1 : 0;

    if (!learnerData[submission.learner_id]) {
        learnerData[submission.learner_id] = {
            id: submission.learner_id,
            totalScore: 0,
            totalPointsPossible: 0,
            assignmentScores: {}
        };
    }

    const learner = learnerData[submission.learner_id];
    learner.totalScore += submission.submission.score - latePenalty;
    learner.totalPointsPossible += assignment.points_possible;
    learner.assignmentScores[submission.assignment_id] = (submission.submission.score - latePenalty) / assignment.points_possible;
});

// Average
const result = Object.values(learnerData).map(learner => ({
    id: learner.id,
    avg: (learner.totalScore / learner.totalPointsPossible) || 0,
    ...learner.assignmentScores
}));
        return result;
    } catch (error) {
        throw error;
    }
}

try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result);
} catch (error) {
    console.error("Error", error.message);
}



//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }