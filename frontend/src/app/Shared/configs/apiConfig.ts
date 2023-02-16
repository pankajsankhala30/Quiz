import { environment } from '../../../environments/environment';

const basePath = environment.apiDomain
const creator = `${basePath}/creator`;
const quiz = `${basePath}/quiz`;

// const user = `${basePath}/creator`;

export const secure_api_routes = {
    // auth module
    CREATOR_SIGN_UP: `${creator}/signup`,
    CREATOR_LOGIN: `${creator}/login`,
    GET_ALL_QUIZES: `${quiz}/all`,
    ADD_QUIZ: `${quiz}/create`,
    DELETE_QUIZ: `${quiz}/delete/bulk`,
    GET_QUIZ_BY_ID: `${quiz}`,
    GET_QUESTIONS_BY_ID: `${quiz}/question`,
    SUBMIT_QUIZ: `${quiz}/answer`,
    GET_RESULT: `${quiz}/result`
}