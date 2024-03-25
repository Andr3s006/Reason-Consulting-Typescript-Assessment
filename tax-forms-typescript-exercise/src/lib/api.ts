import { v4 as uuidv4 } from "uuid";

import listingsData from "../data/listings.json";
import statementData from "../data/statements.json";
import { Listing, Statement, Submission } from "./applicationTypes";

/*\
|* !!IMPORTANT!!
|*
|* The following code mocks out a ficticious API for the purpose of keeping
|* the code screening limited to frontend TypeScript. Please feel free to
|* treat this file and the corresponding data files as a blackbox. There is
|* nothing here you are expected to add, and you are free to assume that all
|* of these functions behave as expected.
\*/

type APIResponse<T> = {
  data: T[];
}

export const loadListings = () => {
  return Promise.resolve(
    listingsData as APIResponse<Listing>,
  );
};

// requestExtenion takes a Submission object and "submits" it to our
// fictitious API. The API will record this Submission and populate its `id`
// and `createdAt` fields with values from the "server".
export const requestExtension = (submission: Submission) => {
  return new Promise<Submission>((resolve, reject) => {
    setTimeout(() => resolve({
      ...submission,
      id: uuidv4(),
      createdAt: new Date().toString(),
    }), 500);
  });
};

// Mock statements API.
let statementsApiState = statementData;

export const loadStatements = () => {
  return Promise.resolve(
    statementsApiState as APIResponse<Statement>,
  );
};

export const updateStatement = (updatedStatement: unknown) => {
  if (typeof updatedStatement !== "object" || !updatedStatement) {
    return Promise.reject("Invalid statement received");
  }

  const statementAsRecord = updatedStatement as Record<string, any>;
  const newState = statementsApiState.data.reduce((acc, statement) => {
    if (statement.id !== statementAsRecord.id) {
      return [
        ...acc,
        statement,
      ];
    }
    return [
      ...acc,
        {
          ...statement,
          name: statementAsRecord.name,
          contactInformation: statementAsRecord.contactInformation,
        },
    ];
  }, [] as any[]);

  statementsApiState = { data: newState };
  return Promise.resolve(updatedStatement);
};

export const createStatement = (newStatement: Statement) => {
  if (typeof newStatement !== "object" || !newStatement) {
    return Promise.reject("Invalid statement received");
  }

  const withId = {
    ...newStatement,
    id: uuidv4(),
  };

  const newState = [
    ...statementsApiState?.data,
    withId,
  ];

  statementsApiState = { data: newState as any[] };
  return Promise.resolve(withId);
};
