import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const trainings = [
	{ id: Math.random().toString(36).slice(2, 7), name: "Treinamento 1", schedule: {date: null} },
	{ id: Math.random().toString(36).slice(2, 7), name: "Treinamento 2", schedule: {date: null} },
	{ id: Math.random().toString(36).slice(2, 7), name: "Treinamento 3", schedule: {date: null} }
];

app.get("/", function (req, res) {
	res.json(trainings);
});
app.post("/", function (req, res) {
	trainings.push(req.body);
	res.end();
});
app.put("/:id", function (req, res) {
	let training = trainings.find((training: any) => training.id === req.params.id);

	console.log(training);
	if (training) training.schedule.date = req.body;

	res.end();
});

app.listen(5000);