import Box from "./box.component";
import { Question } from "../redux/slices/quizSlice";
import { Input, Text } from "@nextui-org/react";
import { FormEvent, useState } from "react";

type Props = {
    question: Question;
    onSubmit: (answer: string) => void;
};

const Question = (props: Props) => {
    const [answer, setAnswer] = useState<string>("");

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        props.onSubmit(answer);
        setAnswer("");
    };

    return (
        <Box
            as="form"
            onSubmit={onSubmit}
            css={{
                d: "flex",
                flexDirection: "column",
                gap: "$md",
            }}
        >
            <Text as="label" size="$lg">
                Wat is de plaats van de airport code{" "}
                <Text as="span" css={{ fontWeight: "bold" }}>
                    {props.question.question}
                </Text>
                ?
            </Text>
            <Input
                bordered
                css={{ bg: "$white" }}
                type="text"
                placeholder="Typ hier je antwoord"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
        </Box>
    );
};

export default Question;
