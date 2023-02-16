export interface CREATOR_SIGNUP {
    firstname: String
    lastname: String,
    email: String,
    password: String,
}
export interface CREATOR_SIGNUP_RESPONSE {
    status: String
    data: String,
    statusCode: Number,
    accountid: String
}
export interface CREATOR_LOGIN {
    email: String,
    password: String,
}