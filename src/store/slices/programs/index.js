import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "../../../common/uuid";

const initialState = { fatalError: false, currentPrograms: {} };

const programsSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {
        addProgram(state, action) {
            const program = action.payload;
            const instanceId = uuid();
            const currentProgramsArray = Object.keys(state.currentPrograms);
            state.currentPrograms[instanceId] = {
                ...program,
                focusLevel: currentProgramsArray.length + 1,
                isMinimized: false,
            };
        },
        deleteProgram(state, action) {
            const programInstance = action.payload;
            delete state.currentPrograms[programInstance];
        },
        focusProgram(state, action) {
            const programInstance = action.payload;
            const currentProgramsArray = Object.keys(state.currentPrograms);
            const program = state.currentPrograms[programInstance];

            if (program.focusLevel === currentProgramsArray.length) return;

            const originalFocusLevel = program.focusLevel;
            currentProgramsArray.forEach((instanceId) => {
                const currentProgram = state.currentPrograms[instanceId];
                if (currentProgram.focusLevel > originalFocusLevel) {
                    state.currentPrograms[instanceId].focusLevel--;
                }
            });
            program.focusLevel = currentProgramsArray.length;
        },
        defocusProgram(state, action) {
            const programInstance = action.payload;
            const currentProgramsArray = Object.keys(state.currentPrograms);
            const program = state.currentPrograms[programInstance];

            if (program.focusLevel === 1) return;

            const originalFocusLevel = program.focusLevel;
            currentProgramsArray.forEach((instanceId) => {
                const currentProgram = state.currentPrograms[instanceId];
                if (currentProgram.focusLevel < originalFocusLevel) {
                    state.currentPrograms[instanceId].focusLevel++;
                }
            });
            program.focusLevel = 1;
        },
        toggleMinimizeProgram(state, action) {
            const programInstance = action.payload;
            const program = state.currentPrograms[programInstance];

            program.isMinimized = !program.isMinimized;
        },
        setFatalError(state, action) {
            const newFatalErrorState = action.payload;

            state.fatalError = newFatalErrorState;
        },
    },
});

export const {
    addProgram,
    deleteProgram,
    focusProgram,
    defocusProgram,
    toggleMinimizeProgram,
    setFatalError,
} = programsSlice.actions;

export default programsSlice.reducer;
