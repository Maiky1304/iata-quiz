import { useEffect } from "react";
import {
    addWrongQuestion,
    incrementScore,
    nextQuestion,
    selectQuiz,
    setLastAnswer,
    setQuestions,
    setState,
} from "./redux/slices/quizSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { pickUniqueQuestions } from "./data/airports.data";
import {
    Badge,
    Button,
    Card,
    Container,
    Divider,
    Input,
    Text,
} from "@nextui-org/react";
import Question from "./components/question.component";
import Box from "./components/box.component";

function QuizApp() {
    const dispatch = useAppDispatch();
    const quiz = useAppSelector(selectQuiz);

    useEffect(() => {
        if (quiz.state === "not_started") {
            const questions = pickUniqueQuestions();
            dispatch(setQuestions(questions));
        }
    }, [quiz.state]);

    const startQuiz = () => {
        if (quiz.state === "started") return;

        dispatch(setState("started"));
    };

    const handleQuizAnswer = (answer: string) => {
        if (quiz.state !== "started") return;

        const currentQuestion = quiz.questions[quiz.currentQuestion];

        if (currentQuestion.answer.toLowerCase() === answer.toLowerCase()) {
            dispatch(incrementScore());
            dispatch(setLastAnswer(null));
        } else {
            dispatch(addWrongQuestion(quiz.currentQuestion));
            dispatch(setLastAnswer(answer));
        }

        dispatch(setState("answer_confirm"));
    };

    const isLastQuestion = quiz.currentQuestion + 1 >= quiz.questions.length;

    return (
        <Container css={{ minHeight: "100vh", dflex: "center" }}>
            <Card
                variant="bordered"
                css={{
                    maxWidth: "600px",
                    bg: "$accents1",
                    px: "$md",
                    py: "$md",
                }}
            >
                {quiz.state === "not_started" && (
                    <>
                        <Card.Header
                            css={{
                                d: "flex",
                                ai: "center",
                                jc: "space-between",
                            }}
                        >
                            <Text size="$2xl" css={{ fontWeight: "$semibold" }}>
                                IATA codes
                            </Text>
                        </Card.Header>
                        <Divider />
                        <Card.Body>
                            <Button onPress={() => startQuiz()}>Starten</Button>
                        </Card.Body>
                    </>
                )}
                {quiz.state === "started" && (
                    <>
                        <Card.Header
                            css={{
                                d: "flex",
                                ai: "center",
                                jc: "space-between",
                            }}
                        >
                            <Text size="$2xl" css={{ fontWeight: "$semibold" }}>
                                IATA codes
                            </Text>
                            <Badge size="lg" color="error">
                                {quiz.currentQuestion + 1} /{" "}
                                {quiz.questions.length}
                            </Badge>
                        </Card.Header>
                        <Divider />
                        <Card.Body>
                            <Question
                                question={quiz.questions[quiz.currentQuestion]}
                                onSubmit={handleQuizAnswer}
                            />
                        </Card.Body>
                    </>
                )}
                {quiz.state === "answer_confirm" && (
                    <>
                        <Card.Header
                            css={{
                                d: "flex",
                                ai: "center",
                                jc: "space-between",
                            }}
                        >
                            <Text size="$2xl" css={{ fontWeight: "$semibold" }}>
                                IATA codes
                            </Text>
                        </Card.Header>
                        <Divider />
                        <Card.Body>
                            {quiz.lastAnswer ? (
                                <>
                                    <Text>
                                        Je antwoord{" "}
                                        <Text
                                            as="span"
                                            css={{ fontWeight: "$semibold" }}
                                            color="error"
                                        >
                                            {quiz.lastAnswer}
                                        </Text>{" "}
                                        was fout.
                                    </Text>
                                    <Text>
                                        Het juiste antwoord was{" "}
                                        <Text
                                            as="span"
                                            css={{ fontWeight: "$semibold" }}
                                            color="success"
                                        >
                                            {
                                                quiz.questions[
                                                    quiz.currentQuestion
                                                ].answer
                                            }
                                        </Text>
                                        .
                                    </Text>
                                </>
                            ) : (
                                <Text>
                                    Je antwoord was{" "}
                                    <Text
                                        as="span"
                                        css={{ fontWeight: "$semibold" }}
                                        color="success"
                                    >
                                        goed
                                    </Text>
                                    .
                                </Text>
                            )}
                        </Card.Body>
                        <Divider />
                        <Card.Footer css={{ d: "flex", jc: "flex-end" }}>
                            <Button
                                onPress={() => {
                                    if (isLastQuestion) {
                                        dispatch(setState("finished"));
                                    } else {
                                        dispatch(nextQuestion());
                                        dispatch(setState("started"));
                                    }
                                }}
                            >
                                {isLastQuestion
                                    ? "Einde quiz"
                                    : "Volgende vraag"}
                            </Button>
                        </Card.Footer>
                    </>
                )}
                {quiz.state === "finished" && (
                    <>
                        <Card.Header
                            css={{
                                d: "flex",
                                ai: "center",
                                jc: "space-between",
                            }}
                        >
                            <Text size="$2xl" css={{ fontWeight: "$semibold" }}>
                                IATA codes
                            </Text>
                            <Badge size="lg" color="error">
                                {quiz.currentQuestion + 1} /{" "}
                                {quiz.questions.length}
                            </Badge>
                        </Card.Header>
                        <Divider />
                        <Card.Body>
                            <Text>
                                Je hebt{" "}
                                <Badge color="success">{quiz.score}</Badge>{" "}
                                vragen goed beantwoord en{" "}
                                <Badge color="error">
                                    {quiz.questions.length - quiz.score}
                                </Badge>{" "}
                                vragen fout beantwoord.
                            </Text>
                            <Divider css={{ my: "$md" }} />
                            <Box
                                as="ul"
                                css={{
                                    d: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                }}
                            >
                                {quiz.questions.map((question, index) => (
                                    <Box
                                        as="li"
                                        key={index}
                                        css={{
                                            d: "flex",
                                            ai: "center",
                                            jc: "center",
                                            gap: "$sm",
                                        }}
                                    >
                                        <Text>{question.question}</Text>
                                        {quiz.wrongQuestions.includes(index) ? (
                                            <Badge color="error" variant="flat">
                                                Fout
                                            </Badge>
                                        ) : (
                                            <Badge
                                                color="success"
                                                variant="flat"
                                            >
                                                Goed
                                            </Badge>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Card.Body>
                        <Divider />
                        <Card.Footer css={{ d: "flex", jc: "flex-end" }}>
                            <Button onPress={() => window.location.reload()}>
                                Opnieuw starten?
                            </Button>
                        </Card.Footer>
                    </>
                )}
            </Card>
        </Container>
    );
}

export default QuizApp;
