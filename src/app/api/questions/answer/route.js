// import dbConnect from "@/configs/db";
// import QuestionModel from "@/models/Question";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const { questionId, answerText, answerSender } = body;

//     if (!questionId || !answerText || !answerSender) {
//       return new Response(JSON.stringify({ message: "Invalid Input" }), {
//         status: 400,
//       });
//     }

//     const question = await QuestionModel.findById(questionId);
//     if (!question) {
//       return new Response(JSON.stringify({ message: "Question not found" }), {
//         status: 404,
//       });
//     }

//     const answer = {
//       questionAnswerText: answerText,
//       questionAnswerSender: answerSender,
//     };

//     question.questionAnswers.push(answer);
//     const updateQuestion = await question.save();

//     return new Response(
//       JSON.stringify({
//         message: "Answer Created Successfully.",
//         data: updateQuestion,
//       }),
//       { status: 201 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ message: err.message }, { status: 500 })
//     );
//   }
// }
