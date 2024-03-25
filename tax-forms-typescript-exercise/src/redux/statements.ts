import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Statement } from "../lib/applicationTypes";


export type StatementSlice = {
    statements: Statement[];
}

const initialState: StatementSlice = {
    statements: [],
};

const statementSlice = createSlice({
  name: "statements",
  initialState,
  reducers: {
    initStatements: (state, action: PayloadAction<Statement[]>) => {
      state.statements = action.payload;
    }
  },
});

export const {
  initStatements,
} = statementSlice.actions;

// Selectors
export const selectStatements = ({ statements }: RootState) => statements.statements;
export const selectStatementById = createSelector(
  [
    selectStatements,
    (state, id: string | null) => id,
  ],
  (statements, id) => statements.find((s) => s.id === id) || null,
);

export default statementSlice;
