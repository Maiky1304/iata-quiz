import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../store";

export interface Question {
    question: string;
    answer: string;
}

interface QuizState {
    state: "not_started" | "started" | "answer_confirm" | "finished";

    lastAnswer: string | null;
    score: number;

    currentQuestion: number;
    questions: Question[];
    wrongQuestions: number[];
}

const initialState: QuizState = {
    state: "not_started",
    lastAnswer: null,
    score: 0,
    currentQuestion: 0,
    questions: [],
    wrongQuestions: [],
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<typeof initialState.state>) => {
            state.state = action.payload;
        },
        incrementScore: (state) => {
            state.score++;
        },
        nextQuestion: (state) => {
            if (state.currentQuestion < state.questions.length - 1) {
                state.currentQuestion++;
            }
        },
        setLastAnswer: (state, action: PayloadAction<string | null>) => {
            state.lastAnswer = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addWrongQuestion: (state, action: PayloadAction<number>) => {
            state.wrongQuestions = [...state.wrongQuestions, action.payload];
        },
    },
});

const { actions, reducer } = quizSlice;
export const {
    setState,
    incrementScore,
    setLastAnswer,
    nextQuestion,
    setQuestions,
    addWrongQuestion,
} = actions;
export const selectQuiz = (state: RootState) => state.quiz;

export default reducer;
